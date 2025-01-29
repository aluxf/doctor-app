"use client"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form,FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { Appointment } from "@/db/models"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Textarea } from "./ui/textarea"
import { useState } from "react"
import { Calendar } from "./ui/calendar"
import { auth, db } from "@/db/db"
import { addDoc, collection, getDocs, query, Timestamp, where } from "@firebase/firestore"
import { useRouter } from "next/navigation"

const fullTimeSlots = {
    "2025-01-09 14:00": true
}

const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "12:00",
    "12:30",
    "13:00",
    "13:30",
    "14:00",
]

//TODO: Update schema types
const formSchema = z.object({
    appointment_type: z.enum(["general", "prescription"], {
      message: "Please select a valid appointment type.",
    }),
    date: z.date({
      message: "Please select a date.",
    }),
    time: z.string({
      message: "Please select a time.",
    }),
    description: z.string({
        message: "Please provide a description.",
    }),
  })

export function AppointmentForm() {

    const [date, setDate] = useState<Date | undefined>(new Date())
    const router = useRouter()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        // Split the string into hours and minutes
      let [hours, minutes] = values.time.split(":").map(Number);

      // Set the time on the date object
      values.date.setHours(hours, minutes, 0, 0); // Hours, minutes, seconds, milliseconds
      const startDateTime = values.date;
      const endDateTime = new Date(startDateTime);
      endDateTime.setMinutes(startDateTime.getMinutes() + 30);

      console.log(startDateTime, endDateTime);
        try {
          if (!auth.currentUser) {
            throw new Error("User is not logged in.")
          }
          const user = auth.currentUser;

          // TODO: Move to cloud function

          // Fetch all appointments with the same startDate
          const appointmentsQuery = query(
            collection(db, 'appointments'),
            where('startDateTime', '==', Timestamp.fromDate(startDateTime)),
          );

          const appointmentsSnapshot = await getDocs(appointmentsQuery);
          const appointments = appointmentsSnapshot.docs.map(doc => doc.data() as Appointment);

          // Fetch all doctors
          const doctorsQuery = query(collection(db, 'users'), where('role', '==', 'doctor'));
          const doctorsSnapshot = await getDocs(doctorsQuery);
          const doctors = doctorsSnapshot.docs.map(doc => doc.id);

          // Filter out doctors who already have an appointment at the same time
          const availableDoctors = doctors.filter(doctorId =>
            !appointments.some(appointment => appointment.doctorId === doctorId)
          );

          if (availableDoctors.length === 0) {
            throw new Error("No available doctors at this time.");
          }
    
          // Randomize a doctor from the available doctors
          const randomDoctorId = availableDoctors[Math.floor(Math.random() * availableDoctors.length)];

          const appointment: Appointment = {
            type: values.appointment_type,
            startDateTime: Timestamp.fromDate(startDateTime),
            endDateTime: Timestamp.fromDate(endDateTime),
            description: values.description,
            patientId: user.uid,
            doctorId: randomDoctorId,
            status: "requested"
          }

          await addDoc(collection(db, 'appointments'), appointment);
          console.log("Appointment added to Firestore:", appointment);

          router.push('/user/home')
        } catch (error) {
          console.error("Error adding appointment:", error);
        }
    }

    /**
     * type
     * description
     * message
     * choose date/time - based on availability
     */
    
    return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col space-y-4 w-[90%]">
          <FormField
            control={form.control}
            name="appointment_type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Appointment Type</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                      <SelectContent>
                          <SelectGroup>
                          { /* Dynamic data based on appointment types*/ }
                            <SelectItem value="prescription">Renew Prescription</SelectItem>
                            <SelectItem value="general">General Consultation</SelectItem>
                          </SelectGroup>
                      </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <div className="flex flex-row gap-5">
                    <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={(d) => {
                          field.onChange(d)
                          setDate(d)
                        }}
                        className="rounded-md border w-64"
                    />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Time Slot</FormLabel>
              <FormControl>
                <div className="flex flex-row gap-5">
                    {
                        <Select key={date?.toString()} value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger disabled={date == undefined} className="w-[180px]">
                            <SelectValue placeholder="Select a time" {...field} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                            {
                                timeSlots.map((time, index) => {
                                    const isDisabled = `${date?.toISOString().split("T")[0]} ${time}`in fullTimeSlots
                                    return (
                                        <SelectItem key={index} disabled={isDisabled} value={time}>{time}</SelectItem>
                                    )
                                })
                            }
                            </SelectGroup>
                        </SelectContent>
                        </Select>
                    }
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>

    )
  }

"use client"
import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form,FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input"
import { Button } from "./ui/button"

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
    username: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    appointment_type: z.string().min(2, {
      message: "Username must be at least 2 characters.",
    }),
    date: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    time: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    description: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    additional_information: z.string().min(2, {
        message: "Username must be at least 2 characters.",
      }),
  })

export function AppointmentForm() {

    const [date, setDate] = useState<Date | undefined>(new Date())

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          username: "",
        },
      })

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
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
                  <Select>
                      <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select a type" {...field} />
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
                        selected={date}
                        onSelect={setDate}
                        className="rounded-md border w-64"
                        {...field}
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
                        <Select key={date?.toString()}>
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
        <FormField
          control={form.control}
          name="additional_information"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional information</FormLabel>
              <FormControl>
                <Textarea placeholder=""  {...field}/>
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

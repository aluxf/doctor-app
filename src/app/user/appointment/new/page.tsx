"use client"
import { AppointmentForm } from "@/components/appointment-form"
import { AppointmentCard } from "@/components/home/appointment-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import withAuth from "@/components/with-auth"
import { GalleryVerticalEnd } from "lucide-react"


const appointments = [
    {
        title: "Drug Perscription",
        doctor: "Dr. Alex Fooladi",
        date: "2025-01-24",
    },
    {
        title: "Dental Checkup",
        doctor: "Dr. John Doe",
        date: "2025-01-25",
    },
    {
        title: "Eye Checkup",
        doctor: "Dr. Jane Doe",
        date: "2025-01-26",
    },
    {
        title: "Dental Checkup",
        doctor: "Dr. John Doe",
        date: "2025-01-25",
    },
    {
        title: "Eye Checkup",
        doctor: "Dr. Jane Doe",
        date: "2025-01-26",
    },
    {
        title: "Dental Checkup",
        doctor: "Dr. John Doe",
        date: "2025-01-25",
    },
    {
        title: "Eye Checkup",
        doctor: "Dr. Jane Doe",
        date: "2025-01-26",
    },
]

function NewAppointmentPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 justify-center overflow-hidden">
      <div className="flex flex-col w-screen gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Ceddy Inc.
          </a>
        </div>
        <div className="flex items-center justify-center my-10">
            <p className="text-2xl font-medium"> New Appointment</p>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-4 ">
          <AppointmentForm/>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="/placeholder.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}

export default withAuth(NewAppointmentPage, 'patient')

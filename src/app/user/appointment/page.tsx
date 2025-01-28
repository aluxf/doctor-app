"use client"
import { AppointmentForm } from "@/components/appointment-form"
import { AppointmentCard } from "@/components/home/appointment-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import withAuth from "@/components/with-auth"
import { GalleryVerticalEnd } from "lucide-react"

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
    </div>
  )
}

export default withAuth(NewAppointmentPage, 'patient')

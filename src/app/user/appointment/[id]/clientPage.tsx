"use client"
import { AppointmentChat } from "@/components/chat"
import withAuth from "@/components/with-auth"
import { GalleryVerticalEnd } from "lucide-react"

function AppointmentPage() {
  return (
    <div className="grid   min-h-svh lg:grid-cols-2 justify-center overflow-hidden">
      <div className="flex max-h-screen flex-col w-screen gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Ceddy Inc.
          </a>
        </div>
        <div className="flex flex-col items-center justify-center mt-10">
          <p className="text-2xl font-medium"> Appointment: 12324</p>
          <p className="text-stone-400"> 2025-01-26</p>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 ">
          <AppointmentChat />
        </div>
      </div>
    </div>
  )
}

export default withAuth(AppointmentPage, 'patient')

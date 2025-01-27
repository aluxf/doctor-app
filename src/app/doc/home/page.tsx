import { AppointmentCard } from "@/components/home/appointment-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GalleryVerticalEnd } from "lucide-react"


const appointments = [
    {
        title: "Drug Perscription",
        patient: "Alex Fooladi",
        date: "2025-01-24",
    },
    {
        title: "Dental Checkup",
        patient: "John Doe",
        date: "2025-01-25",
    },
    {
        title: "Eye Checkup",
        patient: "Jane Doe",
        date: "2025-01-26",
    },
    {
        title: "Dental Checkup",
        patient: "John Doe",
        date: "2025-01-25",
    },
    {
        title: "Eye Checkup",
        patient: "Jane Doe",
        date: "2025-01-26",
    },
    {
        title: "Dental Checkup",
        patient: "John Doe",
        date: "2025-01-25",
    },
    {
        title: "Eye Checkup",
        patient: "Jane Doe",
        date: "2025-01-26",
    },
]

export default function HomePage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2 justify-center overflow-hidden">
      <div className="flex flex-col gap-4 p-6 items-center md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Ceddy Inc.
          </a>
        </div>
        <div className="flex flex-col gap-3 items-center my-5">
        <p className="text-lg font-medium">Upcoming</p>
            <ScrollArea className="flex flex-col items-center justify-center gap-4 w-full h-[300px] border rounded-md p-2">
                <>
                    <div className="flex flex-col gap-4 items-center">
                        {appointments.map((appointment, index) => (
                            <AppointmentCard 
                            key={index} 
                            title={appointment.title} 
                            subtitle={appointment.patient}
                            date={appointment.date}
                            time="14:00" 
                            />   
                        ))}
                    </div>
                </>
            </ScrollArea>
        </div>
        <div className="flex flex-col gap-3 items-center">
            <p className="text-lg font-medium">Requests</p>

            <ScrollArea className="flex flex-col items-center justify-center gap-4 w-full h-[300px] border rounded-md p-2">
                <>
                    <div className="flex flex-col gap-4 items-center">
                        {appointments.map((appointment, index) => (
                            <AppointmentCard 
                            key={index} 
                            title={appointment.title} 
                            subtitle={appointment.patient}
                            date={appointment.date}
                            time="14:00" 
                            />   
                        ))}
                    </div>
                </>
            </ScrollArea>
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

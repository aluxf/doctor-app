"use client"
import withAuth from "@/components/with-auth"
import { AppointmentCard } from "@/components/home/appointment-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GalleryVerticalEnd } from "lucide-react"
import { useRouter } from "next/navigation"
import { signOut } from "@firebase/auth"
import { auth } from "@/db/db"


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

function HomePage() {

  const router = useRouter()

  const handleSignOut = async () => {
    try {
        await signOut(auth)
        router.push('/login')
    } catch (error) {
        console.error("Error signing out: ", error)
    }
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2 justify-center overflow-hidden">
      <div className="flex flex-col gap-4 p-6 md:p-10">
      <div className="flex justify-end text-xs">
                <Button className="text-xs" onClick={handleSignOut}>Sign Out</Button>
            </div>
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Ceddy Inc.
          </a>
        </div>
        <div className="flex items-center justify-center my-10">
            <p className="text-2xl font-medium"> Welcome Alex</p>
        </div>
        
        <div className="flex flex-col items-center justify-center gap-4">
            <Button onClick={() => router.push("/user/appointment")} className="w-full">New Appointment</Button>
            <ScrollArea className="w-full h-[550px]">
                <>
                    <div className="flex flex-col gap-4 items-center">
                        {appointments.map((appointment, index) => (
                            <AppointmentCard 
                            key={index} 
                            title={appointment.title} 
                            subtitle={appointment.doctor}
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

export default withAuth(HomePage, 'patient')
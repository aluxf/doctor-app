"use client"
import withAuth from "@/components/with-auth"
import { AppointmentCard } from "@/components/appointment-card"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { GalleryVerticalEnd } from "lucide-react"
import { useRouter } from "next/navigation"
import { signOut } from "@firebase/auth"
import { auth } from "@/db/db"

type AppointmentProp = {
  id: string
  type: string
  doctor: string
  date: string
  time: string
}

function HomePage({ appointments }: { appointments: AppointmentProp[] }) {

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
                    onClick={() => router.push(`/user/appointment/${appointment.id}`)}
                    key={index}
                    title={appointment.type.charAt(0).toUpperCase() + appointment.type.slice(1)}
                    subtitle={appointment.doctor}
                    date={appointment.date}
                    time={appointment.time}
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
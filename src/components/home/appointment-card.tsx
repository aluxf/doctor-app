import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface AppointmentCardProps {
    title: string
    doctor: string
    date: string
}

export function AppointmentCard({ title, doctor, date }: AppointmentCardProps) {
    return (
      <Card className="w-[350px] p-0">
        <CardHeader className="flex flex-row space-y-0 p-5">
          <div className="flex flex-col gap-2">
              <CardTitle>{title}</CardTitle>
              <CardDescription>{doctor}</CardDescription>
          </div>
          <div className="ml-auto">
              <CardDescription>{date}</CardDescription>
          </div>
        </CardHeader>
      </Card>
    )
  }

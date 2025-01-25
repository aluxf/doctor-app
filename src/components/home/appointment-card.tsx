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


export function AppointmentCard() {
  return (
    <Card className="w-[350px] p-0">
      <CardHeader className="flex flex-row space-y-0 p-5">
        <div className="flex flex-col gap-2">
            <CardTitle>Drug Perscription</CardTitle>
            <CardDescription>Dr. Alex Fooladi</CardDescription>
        </div>
        <div className="ml-auto">
            <CardDescription>2025-01-24</CardDescription>
        </div>
      </CardHeader>
    </Card>
  )
}

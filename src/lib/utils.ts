import { Appointment } from "@/db/models";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAppointmentDateTimeStrings(appointment: Appointment) {
  const dateTimeString = appointment.startDateTime.toDate().toISOString() // Convert Date to ISO date string
  const dateString = dateTimeString.split('T')[0];
  const startTimeString = dateTimeString.split('T')[1].split('.')[0]; // Remove milliseconds
  const endTimeString = appointment.endDateTime.toDate().toISOString().split('T')[1].split('.')[0]; // Remove milliseconds
  
  return {
    dateString,
    startTimeString,
    endTimeString
  }
}
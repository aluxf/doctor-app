import { Appointment } from "@/db/models"

export interface AugmentedAppointment extends Appointment {
  doctorName: string
  startTimeString: string
  dateString: string
  endTimeString: string
}
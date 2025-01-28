export interface User {
    id: string; // unique
    name: string;
    email: string; // unique
    ssn: string; // unique
    birthDate: string; // ISO date string
    role: 'patient' | 'doctor';
  }
  
  export interface Appointment {
    doctorId: string;
    appointmentRequestId: string;
  }

  export interface AppointmentRequest {
    patientId: string;
    type: 'general' | 'prescription';
    description: string;
    status: 'requested' | 'accepted' |'rejected' | 'archived'; // Default status for new requests
    startDateTime: Date; // ISO date string
    endDateTime: Date; // ISO date string
  }
  
  export interface Message {
    appointmentId: string;
    fromId: string;
    message: string;
    sentDate: string; // ISO date string
  }
export interface User {
    id: string; // unique
    name: string;
    email: string; // unique
    ssn: string; // unique
    birthDate: string; // ISO date string
    role: 'patient' | 'doctor';
  }
  
  export interface Appointment {
    id: string; // unique
    doctorId: string;
    appointmentRequestId: string;
  }

  export interface AppointmentRequest {
    id: string // unique
    patientId: string;
    type: 'general' | 'prescription';
    description: string;
    status: 'requested' | 'accepted' |'rejected' | 'archived'; // Default status for new requests
    startDateTime: string; // ISO date string
    endDateTime: string; // ISO date string
  }
  
  export interface Message {
    id: string; // unique
    appointmentId: string;
    fromId: string;
    message: string;
    sentDate: string; // ISO date string
  }
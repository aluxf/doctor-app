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
    patientId: string;
    doctorId: string;
    type: 'general' | 'followup' | 'prescription';
    description: string;
    status: 'requested' | 'accepted' | 'rejected' | 'archived';
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
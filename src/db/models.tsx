import { Timestamp } from 'firebase/firestore';

export interface User {
    id: string; // unique
    name: string;
    email: string; // unique
    ssn: string; // unique
    birthDate: string; // ISO date string
    role: 'patient' | 'doctor';
  }

  export interface Appointment {
    patientId: string;
    doctorId: string;
    type: 'general' | 'prescription';
    description: string;
    status: 'requested' | 'accepted' |'rejected' | 'archived'; // Default status for new requests
    startDateTime: Timestamp; // ISO date string
    endDateTime: Timestamp; // ISO date string
  }
  
  export interface Message {
    appointmentId: string;
    fromId: string;
    message: string;
    sentDate: string; // ISO date string
  }
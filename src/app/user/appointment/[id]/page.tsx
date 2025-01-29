// That's used by default, but anyway
"use server"
import React from 'react'
import ClientPage from './clientPage'
import { collection, getDocs, doc, getDoc, where, query } from '@firebase/firestore'
import { auth, db } from '@/db/db'
import { Appointment, Message } from '@/db/models'
import { AugmentedAppointment } from '@/lib/types'
import { useAuth } from '@/hooks/useAuth'

const getServerDataForClient = async (appointmentId: string) => {
    // Get appointment
    const appointmentRef = doc(db, 'appointments', appointmentId);
    const appointmentDoc = await getDoc(appointmentRef);
    
    if (!appointmentDoc.exists()) {
        return null;
    }

    const appointment = appointmentDoc.data() as Appointment;

    // TODO: Server side auth check
    if (appointment?.patientId !== auth.currentUser?.uid) {
      return null;
    }

    // Augment appointment
    const doctorRef = doc(db, 'users', appointment.doctorId);
    const doctorDoc = await getDoc(doctorRef);
    const doctorName = doctorDoc.exists() ? doctorDoc.data().name : 'Unknown Doctor';

    const startDateTime = appointment.startDateTime.toDate();
    const endDateTime = appointment.endDateTime.toDate();

    const augmentedAppointment: AugmentedAppointment = {
        ...appointment,
        doctorName,
        startTimeString: startDateTime.toTimeString().split(' ')[0],
        dateString: startDateTime.toISOString().split('T')[0],
        endTimeString: endDateTime.toISOString().split('T')[0],
    };

    // Get chat history
    const messagesQuery = query(
        collection(db, 'messages'),
        where('appointmentId', '==', appointmentId)
    );
    const messagesSnapshot = await getDocs(messagesQuery);
    const messages = messagesSnapshot.docs.map(doc => doc.data() as Message);

    return {augmentedAppointment, messages};
}

export default async function Page({ params}: { params: Promise<{ id: string }>}) {
  console.log('That also was executed on the server side')
  const appointmentId = (await params).id
  const serverData = await getServerDataForClient(appointmentId)

  return <ClientPage pageProps={serverData} />
}
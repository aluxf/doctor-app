// That's used by default, but anyway
"use server"
import React from 'react'
import ClientPage from './clientPage'
import { collection, getDocs, doc, getDoc } from '@firebase/firestore'
import { db } from '@/db/db'
import { getAppointmentDateTimeStrings } from '@/lib/utils'
import { Appointment } from '@/db/models'

const getServerDataForClient = async () => {
    console.log('That was executed on the server side')
    
    const appointmentsSnapshot = await getDocs(collection(db, 'appointments'));
    
    const appointmentsPromises = appointmentsSnapshot.docs.map(async (currentDoc) => {
      const data = currentDoc.data() as Appointment;

      const doctorRef = doc(db, 'users', data.doctorId); // Assuming 'users' collection contains doctor info
      const doctorDoc = await getDoc(doctorRef);
      const doctorName = doctorDoc.exists() ? doctorDoc.data().name : 'Unknown Doctor';

      // TODO: Extract to utils functions
      const { dateString, startTimeString, endTimeString } = getAppointmentDateTimeStrings(data)

      return {
        id: currentDoc.id,
        type: data.type,
        doctor: doctorName,
        date: dateString,
        startTime: startTimeString,
        endTime: endTimeString
      };
    });

    const appointments = await Promise.all(appointmentsPromises);

  return appointments
}

const Page = async () => {
  console.log('That also was executed on the server side')
  const serverData = await getServerDataForClient()

  return <ClientPage appointments={serverData} />
}

export default Page
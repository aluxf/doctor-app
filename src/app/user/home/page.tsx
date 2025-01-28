// That's used by default, but anyway
"use server"
import React from 'react'
import ClientPage from './clientPage'
import { collection, getDocs, doc, getDoc } from '@firebase/firestore'
import { db } from '@/db/db'

const getServerDataForClient = async () => {
    console.log('That was executed on the server side')
    
    const appointmentsSnapshot = await getDocs(collection(db, 'appointments'));
    
    const appointmentsPromises = appointmentsSnapshot.docs.map(async (currentDoc) => {
      const data = currentDoc.data();

      const doctorRef = doc(db, 'users', data.doctorId); // Assuming 'users' collection contains doctor info
      const doctorDoc = await getDoc(doctorRef);
      const doctorName = doctorDoc.exists() ? doctorDoc.data().name : 'Unknown Doctor';

      // TODO: Extract to utils functions
      const dateTimeString = data.startDateTime.toDate().toISOString() // Convert Firestore Timestamp to ISO date string
      const dateString = dateTimeString.split('T')[0];
      const timeString = dateTimeString.split('T')[1].split('.')[0]; // Remove milliseconds

      return {
        id: currentDoc.id,
        type: data.type,
        doctor: doctorName,
        date: dateString,
        time: timeString,
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
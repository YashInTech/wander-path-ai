import { db } from '@/service/firebaseConfig';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import InfoSection from '../components/infoSection';
import Hotel from '../components/hotel';
import Itinerary from '../components/itinerary';

function ViewTrip() {
  const { tripId } = useParams();

  const [trip, setTrip] = useState([]);

  useEffect(()=>{
    tripId&&GetTripData();
  }, [tripId])

  // Get trip data from firestore
  const GetTripData = async() => {
    const docRef = doc(db, "AiTrips", tripId);
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      console.log("Document:",docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("No such document");
      toast("No trip found!");
    }
  }

  return (
    <div className='p-10 md:px-14 lg:px-20 xl:px-24'>
        {/* Information Section */}
        <InfoSection trip={trip} />
        {/* Recommended Hotels */}
        <Hotel trip={trip} />
        {/* Itinerary Section */}
        <Itinerary trip={trip} />
    </div>
  )
}

export default ViewTrip;

import { db } from '@/service/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserTripCardItem from './components/userTripCardItem';

function MyTrips() {

  const navigate = useNavigate();

  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, [])

  /**
   * To get All User Trips
   * @returns 
   */
  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if(!user) {
        navigate('/');
        return;
    }

    const q = query(collection(db, 'AiTrips'), where('userEmail', '==', user?.email))
    const querySnapshot = await getDocs(q);
    setUserTrips([]);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setUserTrips(prevVal => [...prevVal, doc.data()])
    });
  }

  return (
    <div className='sm:px-10 md:px-14 lg:px-20 xl:px-24 px-5 m-10'>
      <h2 className='font-bold text-3xl'>My TRIPS 🧳</h2>

      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5 mt-10'>
        {userTrips?.length>0?userTrips.map((trip, index) => (
          <UserTripCardItem trip = {trip} key={index} />
        )) : [1, 2, 3, 4, 5, 6].map((item, index) => (
          <div key={index} 
          className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'>
          </div>
        ))}
      </div>
    </div>
  ) 
}

export default MyTrips
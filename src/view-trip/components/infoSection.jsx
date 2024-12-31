import React from 'react'
import { FaShareFromSquare } from "react-icons/fa6";
import { Button } from '../../components/ui/Button';

function InfoSection({trip}) {
  return (
    <div>
        <img src="/trip_placeholder.jpeg" className='h-[300px] w-full object-cover rounded-xl'/>

        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col gap-2'>
                <h2 className='font-bold text-2xl'>{}</h2>
                <div className='flex gap-5'>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base'>📅 Number of Days: {trip?.userPreference?.numberOfDays}</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base'>💲 {trip?.userPreference?.budget} Budget</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base'>🧳 {trip?.userPreference?.travelers}</h2>
                </div>
            </div>
            <Button className='md:h-[35px] md:w-[45px] rounded-full md:mt-2 mt-[10px] h-7 w-7'><FaShareFromSquare /></Button>
        </div>
    </div>
  )
}

export default InfoSection
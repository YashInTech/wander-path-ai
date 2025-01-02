import React from 'react'
import HotelCardItem from './hotelCardItem'

function Hotel({trip}) {
  return (
    <div>
        <h2 className='font-bold text-xl my-5'>Hotel Recommendation</h2>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
            {trip?.tripData?.travelPlan?.hotelOptions?.map((hotel, index) => (
                <HotelCardItem key={index} hotel={hotel} />
            ))}
        </div>
    </div>
  )
}

export default Hotel
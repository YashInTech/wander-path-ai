import React from 'react'
import { Link } from 'react-router-dom'

function HotelCardItem({hotel}) {
  return (
    <Link to = {'https://www.google.com/maps/search/?api=1&query='+ hotel?.hotelName + hotel?.address} target="_blank">
        <div className='hover:scale-105 transition-all cursor-pointer'>
            <img src='/hotel_placeholder.jpg' className='rounded-xl h-[180px] w-full object-cover' />
            <div className='my-2 flex  flex-col gap-2'>
                <h2 className='font-medium text-black'>{hotel.hotelName}</h2>
                <h2 className='text-xs text-gray-500'>📍 {hotel.address}</h2>
                <h2 className='text-sm text-black'>💰 {hotel?.price}</h2>
                <h2 className='text-sm text-black'>⭐ {hotel?.ratings} stars</h2>
            </div>
        </div>
    </Link>
  )
}

export default HotelCardItem
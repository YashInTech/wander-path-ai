import React from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({place}) {

  return (
    <Link to = {'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target="_blank">
        <div className='border rounded-xl p-3 mt-2 flex gap-5 hover:scale-105 hover:shadow-md transition-all cursor-pointer'>
            <img src='/itinerary_placeholder.jpeg' className="w-[150px] h-[120px] rounded-xl object-cover" />
            <div>
                <h2 className='font-bold text-lg text-black'>{place.placeName}</h2>
                <p className='text-gray-500 text-sm'>{place.details}</p>
                <p className='text-black'>Fair: {place.ticketPrice}</p>
            </div>
        </div>
    </Link>
  )
}

export default PlaceCardItem
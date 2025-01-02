import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/globalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

function PlaceCardItem({place}) {

  const [photoUrl, setPhotoUrl] = useState();
  
  useEffect(() => {
    place&&GetPlacePhoto();
  },[place])

  const GetPlacePhoto = async() => {
    const data = {
      textQuery: place.placeName
    }
    const result = await GetPlaceDetails(data).then(res => {
      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[1].name);
      setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <Link to = {'https://www.google.com/maps/search/?api=1&query='+place?.placeName} target="_blank">
      <div className='border rounded-xl p-3 mt-2 sm:flex gap-5 hover:scale-105 hover:shadow-md transition-all cursor-pointer'>
        <img src={photoUrl ? photoUrl : '/itinerary_placeholder.jpeg'} className="sm:w-[200px] sm:h-[170px] h-[120px] w-full rounded-xl object-cover" />
        
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
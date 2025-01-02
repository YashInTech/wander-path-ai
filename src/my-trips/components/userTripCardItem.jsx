import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/globalAPI';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function UserTripCardItem({trip}) {

  const [photoUrl, setPhotoUrl] = useState();
  
  useEffect(() => {
    trip&&GetPlacePhoto();
  }, [trip])

  const GetPlacePhoto = async() => {
    const data = {
      textQuery: trip?.userPreference?.location?.label
    }
    const result = await GetPlaceDetails(data).then(res => {

      const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', res.data.places[0].photos[3].name);
      setPhotoUrl(PhotoUrl);
    })
  }

  return (
    <Link to = {'/view-trip/' + trip?.id}>
      <div className='hover:scale-105 transition-all'>
        <img src={photoUrl ? photoUrl : '/trip_placeholder.jpeg'} 
        className='object-cover rounded-xl hover:shadow-xl h-[220px] w-full' />
        <div>
          <h2 className='font-bold sm:text-lg text-base text-black'>{trip?.userPreference?.location?.label}</h2>
          <h2 className='sm:text-sm text-xs text-gray-600'>✔ {trip?.userPreference?.numberOfDays} Days trip with {trip?.userPreference?.budget} Budget</h2>
        </div>
      </div>
    </Link>
  )
}

export default UserTripCardItem
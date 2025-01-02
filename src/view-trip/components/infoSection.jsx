import React, { useEffect, useState } from 'react'
import { FaShareFromSquare } from "react-icons/fa6";
import { Button } from '../../components/ui/Button';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/globalAPI';

function InfoSection({trip}) {

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
    <div>
        <img src={photoUrl ? photoUrl : '/trip_placeholder.jpeg'} className='sm:h-[300px] h-52 w-full object-cover rounded-xl'/>

        <div className='flex justify-between items-center'>
            <div className='my-5 flex flex-col sm:gap-2 gap-1'>
                <h2 className='font-bold text-2xl'>{}</h2>
                <div className='flex gap-5'>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base'>📅 Number of Days: {trip?.userPreference?.numberOfDays}</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base'>💲 {trip?.userPreference?.budget} Budget</h2>
                <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base'>🧳 {trip?.userPreference?.travelers}</h2>
                </div>
            </div>
            {/* <Button className='md:h-[35px] md:w-[45px] rounded-full md:mt-2 mt-[7px] h-7 w-7'><FaShareFromSquare /></Button> */}
        </div>
    </div>
  )
}

export default InfoSection
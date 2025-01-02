import React from 'react'
import PlaceCardItem from './placeCardItem'


function Itinerary({trip}) {
  return (
    <div>
        <h2 className='font-bold text-lg mt-3'>Your Itinerary</h2>

        <div>
            {trip?.tripData?.travelPlan?.itinerary?.map((item, index) => (
                <div key={index}>
                    <h2 className='font-medium sm:text-lg text-base mt-2'>Day {item?.day}: {item?.theme}</h2>
                    {item?.placesToVisit?.map((place, index) => (
                        <div key={index}>
                            <h2 className='font-medium text-sm text-orange-600 mt-2'>🎯 {place?.timeToVisit}</h2>
                            <PlaceCardItem place={place}/>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    </div>
  )
}

export default Itinerary
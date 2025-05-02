import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/globalAPI';

function InfoSection({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('/trip_placeholder.jpeg');
  const [isLoading, setIsLoading] = useState(true);

  // Handle both array and object trips
  const tripData = Array.isArray(trip) ? trip[0] : trip;

  useEffect(() => {
    if (tripData) {
      // Try to get photo from API
      GetPlacePhoto();
    }
  }, [tripData]);

  const GetPlacePhoto = async () => {
    try {
      // First check if we have a direct URL in the data
      if (tripData?.tripData?.travelPlan?.location) {
        // Try Google Places API as fallback
        const data = {
          textQuery:
            tripData?.userPreference?.location?.label ||
            tripData?.tripData?.travelPlan?.location,
          languageCode: 'en',
        };

        const response = await GetPlaceDetails(data);

        if (response?.data?.places?.[0]?.photos?.[0]) {
          const PhotoUrl = PHOTO_REF_URL.replace(
            '{NAME}',
            response.data.places[0].photos[0].name
          );
          setPhotoUrl(PhotoUrl);
        } else {
          console.warn('No photos found in API response');
        }
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
      // Keep the default placeholder image
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      {isLoading ? (
        <div className='sm:h-[300px] h-52 w-full bg-gray-200 animate-pulse rounded-xl'></div>
      ) : (
        <img
          src={photoUrl}
          className='sm:h-[300px] h-52 w-full object-cover rounded-xl'
          alt={`${tripData?.tripData?.travelPlan?.location || 'Trip'} image`}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/trip_placeholder.jpeg';
          }}
        />
      )}

      <div className='flex justify-between items-center'>
        <div className='my-5 flex flex-col sm:gap-2 gap-1'>
          <h2 className='font-bold text-2xl'>
            {tripData?.tripData?.travelPlan?.location ||
              tripData?.userPreference?.location?.label}
          </h2>
          <div className='flex gap-5'>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base'>
              📅 Number of Days:{' '}
              {tripData?.userPreference?.numberOfDays ||
                tripData?.tripData?.travelPlan?.duration}
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base'>
              💲{' '}
              {tripData?.userPreference?.budget ||
                tripData?.tripData?.travelPlan?.budget}{' '}
              Budget
            </h2>
            <h2 className='p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-base'>
              🧳{' '}
              {tripData?.userPreference?.travelers ||
                `${tripData?.tripData?.travelPlan?.travelers} travelers`}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

// Define prop types to accept either array or object
InfoSection.propTypes = {
  trip: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape({
      tripData: PropTypes.shape({
        travelPlan: PropTypes.shape({
          location: PropTypes.string,
          duration: PropTypes.string,
          budget: PropTypes.string,
          travelers: PropTypes.number,
        }),
      }),
      userPreference: PropTypes.shape({
        location: PropTypes.shape({
          label: PropTypes.string,
        }),
        numberOfDays: PropTypes.string,
        budget: PropTypes.string,
        travelers: PropTypes.string,
      }),
    }),
  ]),
};

export default InfoSection;

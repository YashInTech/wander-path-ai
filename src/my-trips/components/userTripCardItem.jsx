import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/globalAPI';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function UserTripCardItem({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('/trip_placeholder.jpeg');
  const [isLoading, setIsLoading] = useState(true);

  const GetPlacePhoto = useCallback(async () => {
    if (!trip?.userPreference?.location?.label) return;

    try {
      setIsLoading(true);
      const data = {
        textQuery: trip.userPreference.location.label,
        maxResultCount: 1,
      };

      const result = await GetPlaceDetails(data);

      if (result?.data?.places?.[0]?.photos?.length > 0) {
        const photos = result.data.places[0].photos;
        // Use the first available photo, fallback to index 0 if not enough photos
        const photoIndex = Math.min(3, photos.length - 1);
        const PhotoUrl = PHOTO_REF_URL.replace(
          '{NAME}',
          photos[photoIndex].name
        );
        setPhotoUrl(PhotoUrl);
      }
    } catch (error) {
      console.error('Error fetching place photo:', error);
      // Keep default placeholder
    } finally {
      setIsLoading(false);
    }
  }, [trip?.userPreference?.location?.label]);

  useEffect(() => {
    GetPlacePhoto();
  }, [GetPlacePhoto]);

  if (!trip) {
    return (
      <div className='h-[220px] w-full bg-slate-200 animate-pulse rounded-xl'></div>
    );
  }

  return (
    <Link to={`/view-trip/${trip.id}`}>
      <div className='hover:scale-105 transition-all'>
        <div className='relative'>
          {isLoading && (
            <div className='absolute inset-0 bg-gray-200 animate-pulse rounded-xl flex items-center justify-center'>
              <div className='text-gray-400 text-sm'>Loading...</div>
            </div>
          )}
          <img
            src={photoUrl}
            className='object-cover rounded-xl hover:shadow-xl h-[220px] w-full'
            alt={trip?.userPreference?.location?.label || 'Trip destination'}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/trip_placeholder.jpeg';
              setIsLoading(false);
            }}
            onLoad={() => setIsLoading(false)}
          />
        </div>
        <div>
          <h2 className='font-bold sm:text-lg text-base text-black'>
            {trip?.userPreference?.location?.label}
          </h2>
          <h2 className='sm:text-sm text-xs text-gray-600'>
            ✔ {trip?.userPreference?.numberOfDays} Days trip with{' '}
            {trip?.userPreference?.budget} Budget
          </h2>
        </div>
      </div>
    </Link>
  );
}

UserTripCardItem.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.string.isRequired,
    userPreference: PropTypes.shape({
      location: PropTypes.shape({
        label: PropTypes.string.isRequired,
      }).isRequired,
      numberOfDays: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      budget: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default UserTripCardItem;

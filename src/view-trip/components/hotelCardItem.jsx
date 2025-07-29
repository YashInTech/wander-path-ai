import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/globalAPI';
import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function HotelCardItem({ hotel }) {
  const [photoUrl, setPhotoUrl] = useState(
    hotel?.imageURL || '/hotel_placeholder.jpg'
  );
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);

  const fetchFromPlacesAPI = useCallback(async () => {
    try {
      const data = {
        textQuery: `${hotel?.hotelName} ${hotel?.address || ''}`.trim(),
        maxResultCount: 1,
      };

      const result = await GetPlaceDetails(data);

      if (result?.data?.places?.[0]?.photos?.length > 0) {
        const photos = result.data.places[0].photos;
        // Try to get a good photo (prefer index 1 if available, otherwise 0)
        const photoIndex = photos.length > 1 ? 1 : 0;
        const PhotoUrl = PHOTO_REF_URL.replace(
          '{NAME}',
          photos[photoIndex].name
        );
        setPhotoUrl(PhotoUrl);
      } else {
        // Keep the placeholder if no photos found
        setPhotoUrl('/hotel_placeholder.jpg');
      }
    } catch (error) {
      console.error('Error fetching hotel details:', error);
      setPhotoUrl('/hotel_placeholder.jpg');
    } finally {
      setIsLoadingPhoto(false);
    }
  }, [hotel?.hotelName, hotel?.address]);

  const GetPlacePhoto = useCallback(async () => {
    if (!hotel?.hotelName) return;

    try {
      setIsLoadingPhoto(true);

      // First try to use the AI-provided image URL if it looks valid
      if (
        hotel?.imageURL &&
        hotel.imageURL !==
          'https://via.placeholder.com/400x300?text=Image+Not+Available' &&
        !hotel.imageURL.includes('example.com') &&
        hotel.imageURL.startsWith('http')
      ) {
        // Test if the AI-provided URL works
        const img = new Image();
        img.onload = () => {
          setPhotoUrl(hotel.imageURL);
          setIsLoadingPhoto(false);
        };
        img.onerror = () => {
          // If AI URL fails, try Google Places API
          fetchFromPlacesAPI();
        };
        img.src = hotel.imageURL;
      } else {
        // If no valid AI URL, go directly to Places API
        fetchFromPlacesAPI();
      }
    } catch (error) {
      console.error('Error loading hotel photo:', error);
      setIsLoadingPhoto(false);
    }
  }, [hotel?.imageURL, hotel?.hotelName, fetchFromPlacesAPI]);

  useEffect(() => {
    GetPlacePhoto();
  }, [GetPlacePhoto]);

  // Memoize Google Maps URL to prevent unnecessary recalculations
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    (hotel?.hotelName || '') + ' ' + (hotel?.address || '')
  )}`;

  if (!hotel) {
    return (
      <div className='hover:scale-105 transition-all cursor-pointer'>
        <div className='rounded-xl sm:h-[180px] h-32 w-full bg-gray-200 animate-pulse'></div>
        <div className='my-2 flex flex-col gap-2'>
          <div className='h-4 bg-gray-200 rounded animate-pulse'></div>
          <div className='h-3 bg-gray-200 rounded animate-pulse w-3/4'></div>
          <div className='h-3 bg-gray-200 rounded animate-pulse w-1/2'></div>
          <div className='h-3 bg-gray-200 rounded animate-pulse w-1/3'></div>
        </div>
      </div>
    );
  }

  return (
    <Link
      to={googleMapsUrl}
      target='_blank'
      rel='noopener noreferrer'
      aria-label={`View ${hotel.hotelName} on Google Maps`}
    >
      <div className='hover:scale-105 transition-all cursor-pointer'>
        <div className='relative'>
          {isLoadingPhoto && (
            <div className='absolute inset-0 bg-gray-200 animate-pulse rounded-xl flex items-center justify-center z-10'>
              <div className='text-gray-400 text-sm'>Loading...</div>
            </div>
          )}
          <img
            src={photoUrl}
            className='rounded-xl sm:h-[180px] h-32 w-full object-cover'
            alt={hotel?.hotelName ? `${hotel.hotelName} hotel` : 'Hotel image'}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/hotel_placeholder.jpg';
              setIsLoadingPhoto(false);
            }}
            onLoad={() => setIsLoadingPhoto(false)}
            loading='lazy'
          />
        </div>

        <div className='my-2 flex flex-col gap-2'>
          <h2
            className='font-medium text-black truncate'
            title={hotel.hotelName}
          >
            {hotel.hotelName}
          </h2>
          {hotel.address && (
            <h2
              className='text-xs text-gray-500 truncate'
              title={hotel.address}
            >
              📍 {hotel.address}
            </h2>
          )}
          {hotel.price && (
            <h2 className='text-sm text-black'>💰 {hotel.price}</h2>
          )}
          {hotel.ratings && (
            <h2 className='text-sm text-black'>
              ⭐ {hotel.ratings}{' '}
              {typeof hotel.ratings === 'number' ? 'stars' : ''}
            </h2>
          )}
        </div>
      </div>
    </Link>
  );
}

HotelCardItem.propTypes = {
  hotel: PropTypes.shape({
    hotelName: PropTypes.string.isRequired,
    address: PropTypes.string,
    price: PropTypes.string,
    imageURL: PropTypes.string,
    ratings: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    description: PropTypes.string,
    geoCoordinates: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }).isRequired,
};

export default HotelCardItem;

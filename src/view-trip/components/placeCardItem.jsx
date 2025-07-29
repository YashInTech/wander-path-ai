import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/globalAPI';
import { useEffect, useState, useCallback } from 'react';

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState(
    place?.imageURL || '/itinerary_placeholder.jpeg'
  );
  const [isLoadingPhoto, setIsLoadingPhoto] = useState(false);

  const fetchFromPlacesAPI = useCallback(async () => {
    try {
      const data = {
        textQuery: place?.placeName,
        maxResultCount: 1,
      };

      const result = await GetPlaceDetails(data);

      if (result?.data?.places?.[0]?.photos?.length > 0) {
        const photos = result.data.places[0].photos;
        const photoIndex = Math.min(0, photos.length - 1);
        const PhotoUrl = PHOTO_REF_URL.replace(
          '{NAME}',
          photos[photoIndex].name
        );
        setPhotoUrl(PhotoUrl);
      } else {
        setPhotoUrl('/itinerary_placeholder.jpeg');
      }
    } catch (error) {
      console.error('Error fetching place details:', error);
      setPhotoUrl('/itinerary_placeholder.jpeg');
    } finally {
      setIsLoadingPhoto(false);
    }
  }, [place?.placeName]);

  const GetPlacePhoto = useCallback(async () => {
    if (!place?.placeName) return;

    try {
      setIsLoadingPhoto(true);

      // First try to use the AI-provided image URL if it looks valid
      if (
        place?.imageURL &&
        place.imageURL !==
          'https://via.placeholder.com/400x300?text=Image+Not+Available' &&
        !place.imageURL.includes('example.com') &&
        place.imageURL.startsWith('http')
      ) {
        // Test if the AI-provided URL works
        const img = new Image();
        img.onload = () => {
          setPhotoUrl(place.imageURL);
          setIsLoadingPhoto(false);
        };
        img.onerror = () => {
          // If AI URL fails, try Google Places API
          fetchFromPlacesAPI();
        };
        img.src = place.imageURL;
      } else {
        // If no valid AI URL, go directly to Places API
        fetchFromPlacesAPI();
      }
    } catch (error) {
      console.error('Error loading place photo:', error);
      setIsLoadingPhoto(false);
    }
  }, [place?.imageURL, place?.placeName, fetchFromPlacesAPI]);

  useEffect(() => {
    GetPlacePhoto();
  }, [GetPlacePhoto]);

  // Function to create Google Maps URL with proper coordinates if available
  const getGoogleMapsUrl = useCallback(() => {
    if (place?.geoCoordinates?.latitude && place?.geoCoordinates?.longitude) {
      return `https://www.google.com/maps/search/?api=1&query=${place.geoCoordinates.latitude},${place.geoCoordinates.longitude}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      place?.placeName || ''
    )}`;
  }, [
    place?.geoCoordinates?.latitude,
    place?.geoCoordinates?.longitude,
    place?.placeName,
  ]);

  return (
    <Link to={getGoogleMapsUrl()} target='_blank' rel='noopener noreferrer'>
      <div className='border rounded-xl p-3 mt-2 sm:flex gap-5 hover:scale-105 hover:shadow-md transition-all cursor-pointer'>
        <div className='relative'>
          {isLoadingPhoto && (
            <div className='absolute inset-0 bg-gray-200 animate-pulse rounded-xl flex items-center justify-center'>
              <div className='text-gray-400 text-sm'>Loading...</div>
            </div>
          )}
          <img
            src={photoUrl}
            alt={place?.placeName || 'Place image'}
            className='sm:w-[200px] sm:h-[170px] h-[120px] w-full rounded-xl object-cover'
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = '/itinerary_placeholder.jpeg';
              setIsLoadingPhoto(false);
            }}
            onLoad={() => setIsLoadingPhoto(false)}
          />
        </div>

        <div>
          <h2 className='font-bold text-lg text-black'>{place?.placeName}</h2>
          <p className='text-gray-500 text-sm'>{place?.details}</p>
          {place?.ticketPrice && (
            <p className='text-black'>Ticket: {place.ticketPrice}</p>
          )}
          {place?.ratings && (
            <p className='text-black'>Rating: ⭐ {place.ratings}</p>
          )}
        </div>
      </div>
    </Link>
  );
}

PlaceCardItem.propTypes = {
  place: PropTypes.shape({
    placeName: PropTypes.string.isRequired,
    details: PropTypes.string,
    timeToVisit: PropTypes.string,
    ticketPrice: PropTypes.string,
    ratings: PropTypes.number,
    imageURL: PropTypes.string,
    geoCoordinates: PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
    }),
  }).isRequired,
};

export default PlaceCardItem;

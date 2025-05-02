import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function PlaceCardItem({ place }) {
  // Function to create Google Maps URL with proper coordinates if available
  const getGoogleMapsUrl = () => {
    if (place?.geoCoordinates?.latitude && place?.geoCoordinates?.longitude) {
      return `https://www.google.com/maps/search/?api=1&query=${place.geoCoordinates.latitude},${place.geoCoordinates.longitude}`;
    }
    return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      place?.placeName || ''
    )}`;
  };

  return (
    <Link to={getGoogleMapsUrl()} target='_blank' rel='noopener noreferrer'>
      <div className='border rounded-xl p-3 mt-2 sm:flex gap-5 hover:scale-105 hover:shadow-md transition-all cursor-pointer'>
        <img
          src={place?.imageURL || '/itinerary_placeholder.jpeg'}
          alt={place?.placeName || 'Place image'}
          className='sm:w-[200px] sm:h-[170px] h-[120px] w-full rounded-xl object-cover'
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = '/itinerary_placeholder.jpeg';
          }}
        />

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

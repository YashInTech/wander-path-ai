import PropTypes from 'prop-types';
import PlaceCardItem from './placeCardItem';

function Itinerary({ trip }) {
  // Handle both array and object trips
  const tripData = Array.isArray(trip) ? trip[0] : trip;

  // Group itinerary items by day
  const groupByDay = () => {
    if (!tripData?.tripData?.travelPlan?.itinerary) {
      console.log('No itinerary data found:', tripData);
      return [];
    }

    const groupedItems = {};
    tripData.tripData.travelPlan.itinerary.forEach((item) => {
      if (!groupedItems[item.day]) {
        groupedItems[item.day] = [];
      }
      groupedItems[item.day].push(item);
    });

    return Object.entries(groupedItems).map(([day, places]) => ({
      day: parseInt(day),
      places,
    }));
  };

  const itineraryByDay = groupByDay();

  if (itineraryByDay.length === 0) {
    return (
      <div>
        <h2 className='font-bold text-lg mt-3'>Your Itinerary</h2>
        <p className='text-gray-500 mt-2'>
          No itinerary information available.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2 className='font-bold text-lg mt-3'>Your Itinerary</h2>

      <div>
        {itineraryByDay.map((dayGroup, index) => (
          <div key={index}>
            <h2 className='font-medium sm:text-lg text-base mt-2'>
              Day {dayGroup.day}
            </h2>
            {dayGroup.places.map((place, placeIndex) => (
              <div key={placeIndex}>
                <h2 className='font-medium text-sm text-orange-600 mt-2'>
                  🎯 {place.timeToVisit || 'Anytime'}
                </h2>
                <PlaceCardItem place={place} />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Fix the prop types to accept either array or object
Itinerary.propTypes = {
  trip: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.shape({
      tripData: PropTypes.shape({
        travelPlan: PropTypes.shape({
          itinerary: PropTypes.arrayOf(
            PropTypes.shape({
              day: PropTypes.number.isRequired,
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
            })
          ),
        }),
      }),
    }),
  ]),
};

export default Itinerary;

import PropTypes from 'prop-types';
import HotelCardItem from './hotelCardItem';

function Hotel({ trip }) {
  const hotelOptions = trip?.tripData?.travelPlan?.hotelOptions;

  if (!hotelOptions || hotelOptions.length === 0) {
    return (
      <div>
        <h2 className='font-bold text-xl my-5'>Hotel Recommendation</h2>
        <p className='text-gray-500'>No hotel recommendations available.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className='font-bold text-xl my-5'>Hotel Recommendation</h2>
      <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
        {hotelOptions.map((hotel, index) => (
          <HotelCardItem key={`hotel-${index}`} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}

Hotel.propTypes = {
  trip: PropTypes.shape({
    tripData: PropTypes.shape({
      travelPlan: PropTypes.shape({
        hotelOptions: PropTypes.arrayOf(
          PropTypes.shape({
            hotelName: PropTypes.string,
            address: PropTypes.string,
            price: PropTypes.string,
            imageURL: PropTypes.string,
            ratings: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
          })
        ),
      }),
    }),
  }),
};

export default Hotel;

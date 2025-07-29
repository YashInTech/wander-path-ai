import { db } from '@/service/firebaseConfig';
import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'sonner';
import InfoSection from '../components/infoSection';
import Hotel from '../components/hotel';
import Itinerary from '../components/itinerary';

function ViewTrip() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Memoize GetTripData function to fix dependency array warning
  const GetTripData = useCallback(async () => {
    if (!tripId) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const docRef = doc(db, 'AiTrips', tripId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document:', docSnap.data());
        setTrip(docSnap.data());
      } else {
        console.log('No such document');
        setError('No trip found!');
        toast.error('No trip found!');
      }
    } catch (err) {
      console.error('Error fetching trip data:', err);
      setError('Failed to load trip data');
      toast.error('Failed to load trip data');
    } finally {
      setLoading(false);
    }
  }, [tripId]); // Add tripId as dependency for useCallback

  useEffect(() => {
    GetTripData();
  }, [GetTripData]); // Now we can safely use GetTripData in dependency array

  if (loading) {
    return (
      <div className='sm:px-10 md:px-14 lg:px-20 xl:px-24 px-5 sm:m-10 m-5'>
        <div className='animate-pulse'>
          <div className='h-64 bg-gray-300 rounded-xl mb-5'></div>
          <div className='h-8 bg-gray-300 rounded mb-4'></div>
          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-5'>
            {[1, 2, 3].map((i) => (
              <div
                key={`skeleton-${i}`}
                className='h-48 bg-gray-300 rounded-xl'
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='sm:px-10 md:px-14 lg:px-20 xl:px-24 px-5 sm:m-10 m-5'>
        <div className='text-center py-10'>
          <div className='mb-4'>
            <div className='text-6xl mb-4'>😞</div>
            <h2 className='text-2xl font-bold text-gray-600 mb-2'>{error}</h2>
            <p className='text-gray-500'>
              {error.includes('No trip found')
                ? 'The trip you are looking for does not exist or has been removed.'
                : 'There was an issue loading your trip data. Please try again.'}
            </p>
          </div>
          <button
            onClick={GetTripData}
            className='mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Try Again'}
          </button>
        </div>
      </div>
    );
  }

  // Add fallback if trip data is null
  if (!trip) {
    return (
      <div className='sm:px-10 md:px-14 lg:px-20 xl:px-24 px-5 sm:m-10 m-5'>
        <div className='text-center py-10'>
          <div className='text-6xl mb-4'>🔍</div>
          <h2 className='text-2xl font-bold text-gray-600'>
            No Trip Data Available
          </h2>
          <p className='text-gray-500 mt-2'>Unable to load trip information.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='sm:px-10 md:px-14 lg:px-20 xl:px-24 px-5 sm:m-10 m-5'>
      {/* Information Section */}
      <InfoSection trip={trip} />
      {/* Recommended Hotels */}
      <Hotel trip={trip} />
      {/* Itinerary Section */}
      <Itinerary trip={trip} />
    </div>
  );
}

export default ViewTrip;

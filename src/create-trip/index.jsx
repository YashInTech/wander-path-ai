import { SelectBudgetOptions, SelectTravelList } from '@/constants/options'
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

function CreateTrip() {

  const [place, setPlace] = useState();

  const [formData, setFormData] = useState({});

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const OnGenerateTrip = async () => {
    if (formData.location === undefined || formData.numberOfDays === undefined || formData.budget === undefined || formData.travelers === undefined) {
      toast('Please fill all the fields');
      return;
    }
    if (formData.numberOfDays <= 0) {
      toast('Please enter a valid number of days');
      return;
    }
    if (formData.numberOfDays > 30) {
      toast('Number of days should be less than or equal to 30');
      return;
    }
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 m-10'>
      <h2 className='font-bold text-3xl'>Tell Us Your Travel Preferences 🌴</h2>
      <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information,
        and our trip planner will generate a customized itinerarybased on your preferences. </p>

      <div className='m-10 flex flex-col gap-10'>
        <div>
          <h2 className='text-xl my-3 font-medium'>What is your Destination?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v) }
            }}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>How many days are you planning your travel?</h2>
          <Input placeholder='Enter the number of days' type='number'
          onChange={(e) => handleInputChange('numberOfDays', e.target.value)}
          />
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>What is your Budget?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectBudgetOptions.map((item, index) => (
              <div key={index} 
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg 
              ${formData.budget === item.title ? 'shadow-lg border-black' : ''}`}>
                <h2 className='text-3xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className='text-xl my-3 font-medium'>Who do you plan on travelling with on your next adventure?</h2>
          <div className='grid grid-cols-3 gap-5 mt-5'>
            {SelectTravelList.map((item, index) => (
              <div key={index} 
              onClick={() => handleInputChange('travelers', item.people)}
              className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg 
              ${formData.travelers === item.people ? 'shadow-lg border-black' : ''}`}>
                <h2 className='text-3xl'>{item.icon}</h2>
                <h2 className='font-bold text-lg'>{item.title}</h2>
                <h2 className='text-sm text-gray-500'>{item.desc}</h2>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Button onClick={OnGenerateTrip} className='mx-auto block my-10'>
        Generate Trip
      </Button>
    </div>
  )
}

export default CreateTrip
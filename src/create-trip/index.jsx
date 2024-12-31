import { AI_PROMPT, SelectBudgetOptions, SelectTravelList } from '@/constants/options'
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { chatSession } from '@/service/aiModel';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';

function CreateTrip() {

  const [place, setPlace] = useState();

  const [formData, setFormData] = useState({});

  const [openDialog, setOpenDialog] = useState(false);

  const[loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    })
  }

  useEffect(() => {
    console.log(formData);
  }, [formData])

  const login = useGoogleLogin({
    onSuccess: (codeRes) => GetUserProfile(codeRes),
    onError: (error) => console.log(error)
  })

  const OnGenerateTrip = async () => {

    const user = localStorage.getItem('user');

    if(!user) {
      setOpenDialog(true)
      return;
    }

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

    setLoading(true);

    const FINAL_PROMPT = AI_PROMPT
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.numberOfDays)
      .replace('{travelers}', formData?.travelers)
      .replace('{budget}', formData?.budget);

    const result = await chatSession.sendMessage(FINAL_PROMPT);

    console.log("--", result?.response?.text());

    setLoading(false);
    
    SaveTrip(result?.response?.text());
  }

  const SaveTrip = async (TripData) => {

    setLoading(true);

    const user = JSON.parse(localStorage.getItem('user'));
    const docId = Date.now().toString();

    await setDoc(doc(db, "AiTrips", docId), {
      userPreference: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId
    });

    setLoading(false);

    navigate(`/view-trip/${docId}`);
  }

  const GetUserProfile = (tokenInfo) => {
    axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
      headers:{
        Authorization: `Bearer ${tokenInfo?.access_token}`,
        Accept: 'application/json'
      }
    }).then((res)=> {
      console.log(res);
      localStorage.setItem('user', JSON.stringify(res.data));
      setOpenDialog(false);
      OnGenerateTrip();
    })
  }

  return (
    <div className='sm:px-10 md:px-14 lg:px-20 xl:px-24 px-5 m-10'>
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

      <div className='justify-end flex my-10'>
        <Button onClick={OnGenerateTrip} disabled={loading}>
        {
          loading ? <AiOutlineLoading3Quarters className='animate-spin' /> : "Generate Trip"
        }
        </Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-center items-center">
              <img src="/mainLogo.png" alt="Logo" />
            </DialogTitle>
            <DialogDescription className="flex flex-col justify-center items-center text-center mt-7">
              <span className="font-bold text-xl text-black">Login In or Sign Up</span>
              <span className="text-center">with Google Authentication Securely.</span>
              <Button onClick={login}
              className="w-full my-5 flex gap-4 items-center justify-center rounded-full">
                <FcGoogle style={{ transform: 'scale(1.3)' }} />Continue with Google
              </Button>
              <span className="text-xs text-center mt-2">
                By logging in or signing up, you agree to WanderPathAI's Terms & Conditions and Privacy Policy
              </span>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

    </div>
  )
}

export default CreateTrip
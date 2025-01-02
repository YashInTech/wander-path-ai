import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { DialogTrigger } from '@radix-ui/react-dialog';

function Header() {

  const user = JSON.parse(localStorage.getItem('user'));

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [])

  const login = useGoogleLogin({
    onSuccess: (codeRes) => GetUserProfile(codeRes),
    onError: (error) => console.log(error)
  })

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
      window.location.reload();
    })
  }

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    window.location.reload();
  };

  return (
    <div className='p-3 shadow-md flex justify-between items-center px-5'>
        <a href="/" className='cursor-auto'>
          <img src="/mainLogo.png" />
        </a>
        <div>
            {user ? (
            <div className='flex items-center gap-3'>
              <a href='/create-trip'>
                <Button variant='outline' 
                className='rounded-full text-black'>+ Create Trip</Button>
              </a>
              <a href='/my-trips'>
                <Button variant='outline' 
                className='rounded-full text-black'>My Trips</Button>
              </a>
              <Dialog> 
              <DialogTrigger asChild>
                <img src={user?.picture} className='h-10 w-10 rounded-full cursor-pointer' />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="text-center text-2xl">Hi, {user?.name}
                  </DialogTitle>
                  <span className='font-bold text-center text-xl'>Here are your Account Details</span>
                </DialogHeader>
                <div className='flex flex-row gap-20'>
                <DialogDescription className="mt-4 text-lg text-black">
                  <span className='font-bold'>
                    Email: </span> {user?.email} <br />
                  <span className='font-bold'>
                    User Id: </span> {user?.id}
                </DialogDescription>
                <DialogDescription>
                  <img src={user?.picture} className='h-24 w-24 rounded-full' />
                </DialogDescription>
                </div>
                <DialogFooter>
                  <Button onClick={handleLogout} className="w-full rounded-full">Log Out</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>              
          </div>
        ) : (
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button>Sign In</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="flex justify-center items-center">
                  <img src="/mainLogo.png" alt="Logo" />
                </DialogTitle>
                <DialogDescription className="flex flex-col justify-center items-center text-center mt-7">
                  <span className="font-bold text-xl text-black">Login In or Sign Up</span>
                  <span className="text-center">with Google Authentication Securely.</span>            
                </DialogDescription>
              </DialogHeader>
              <Button onClick={login} className="w-full my-5 flex gap-4 items-center justify-center rounded-full">
                <FcGoogle style={{ transform: 'scale(1.3)' }} />Continue with Google
              </Button>
              <DialogFooter className="text-xs text-center">
                By logging in or signing up, you agree to WanderPathAI's Terms & Conditions and Privacy Policy
              </DialogFooter>
            </DialogContent>
          </Dialog> )}
        </div>

        
    </div>
  )
}

export default Header
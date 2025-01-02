import React, { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';

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

  return (
    <div className='p-3 shadow-md flex justify-between items-center px-5'>
        <img src="/mainLogo.png" />
        <div>
            {user ? 
            <div className='flex items-center gap-3'>
              <a href='/my-trips'>
                <Button variant='outline' 
                className='rounded-full'>My Trips</Button>
              </a>
              <Popover>
                <PopoverTrigger><img src={user?.picture} className='h-9 w-9 rounded-full'/></PopoverTrigger>
                <PopoverContent>
                  <h2 className='cursor-pointer' onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                  }}>Log Out</h2>
                </PopoverContent>
              </Popover>              
            </div>
            : <Button onClick = {() => 
              setOpenDialog(true)
            }>Sign In</Button> }
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

export default Header
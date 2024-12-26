import React from 'react'
import { Button } from '../ui/button'

function Hero() {
  return (
    <div className='flex flex-col items-center mx-56 gap-9'>
        <h1 className='font-extrabold text-[45px] text-center mt-16'>
        <span className='text-[#080c52]'>Discover Your Next Adventure with AI: </span>
        <span className='text-[#00a5bd]'>Personalized Itineraries at Your Fingertips</span></h1>
        <p className='text-xl text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests tailored to your interests and budget.</p>

        <Button>Get Started</Button>
    
    </div>
  )
}

export default Hero
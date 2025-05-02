import React from 'react'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

function Hero() {
  return (
    <div className='flex flex-col items-center sm:mx-56 mx-11 gap-9'>
        <h1 className='font-extrabold sm:text-[70px] text-[30px] text-center mt-9'>
        <span className='text-[#080c52]'>Discover Your Next Adventure with AI: </span>
        <span className='text-[#00a5bd]'>Personalized Itineraries at Your Fingertips</span></h1>
        <p className='sm:text-2xl text-base text-gray-500 text-center'>Your personal trip planner and travel curator, creating custom itineraries tailored to your interests tailored to your interests and budget.</p>

        <Link to={'/create-trip'}>
            <Button className='sm:h-14 sm:w-40 sm:text-xl'>Get Started</Button>
        </Link>
    
    </div>
  )
}

export default Hero
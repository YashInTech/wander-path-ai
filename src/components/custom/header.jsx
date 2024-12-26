import React from 'react'
import { Button } from '../ui/button'

function Header() {
  return (
    <div className='p-3 shadow-md flex justify-between items-center px-5'>
        <img src="/mainLogo.png" />
        <div>
            <Button>Sign In</Button>
        </div>
    </div>
  )
}

export default Header
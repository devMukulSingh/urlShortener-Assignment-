import React from 'react'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import Navlinks from './Navlinks'

const Navbar = () => {

  return (
    <main className='text-white bg-[#fd79a8] h-20 p-5 flex justify-between gap-2 items-center'>
      <Navlinks/>
      
      <Button 
        variant="ghost"
        className='text-lg'
        >
        Logout
        <LogOut className='ml-2'/>
      </Button>
    </main>
  )
}

export default Navbar
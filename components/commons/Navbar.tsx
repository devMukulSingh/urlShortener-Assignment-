"use client"
import React from 'react'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import Navlinks from './Navlinks'
import toast from 'react-hot-toast'
import axios from 'axios';
import { useRouter } from 'next/navigation'

const Navbar = () => {

  const router = useRouter();
  const handleLogout = async() => {
    try{
      if(typeof window !== 'undefined'){
        localStorage.clear();
      }
      const res = await axios.get(`/api/logout`);
      if(res.status === 200){
        toast.success('Logout sucess');
        router.push('/signin');
      }
      else {
        toast.error('Something went wrong, Please try again');
      }
    }
    catch(e){
      toast.error('Something went wrong, Please try again');
      console.log(`error in handleLogout ${e}`); 
    }
  }

  return (
    <main className='text-white bg-[#fd79a8] h-20 p-5 flex justify-between gap-2 items-center'>

      <Navlinks/>
      
      <Button 
        variant="ghost"
        className='text-lg'
        onClick={ handleLogout }
        >
        Logout
        <LogOut className='ml-2'/>
      </Button>

    </main>
  )
}

export default Navbar
"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

const Navlinks = () => {
    const pathName = usePathname();
    const links = [
        { 
            href: '/',
            active : pathName === '/',
            title:'Home'
        },
        { 
            href: '/analytics',
            active : pathName === '/analytics',
            title:'Analytics',
        },
        // { 
        //     href: '/',
        //     visited : pathName === '/'
        // }
    ]
  return (
    <main className='flex gap-10'>
        {
            links.map( (link) => (
                <Link
                    href={link.href} 
                    className={`
                    ${link.active ? 'underline ' : ''}
                    text-xl
                     font-semibold
                     transition-all 
                     ease-in-out 
                     hover:scale-110 
                     hover:underline`
                    }
                     >
                    {link.title}
                </Link>
            ))
        }
    </main>
  )
}

export default Navlinks
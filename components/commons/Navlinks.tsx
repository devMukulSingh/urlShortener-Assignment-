"use client"
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation'
import React from 'react'

const Navlinks = () => {
    const { userId } = useParams();
    const pathName = usePathname();
    const links = [
        {
            href: `/${userId}`,
            active: pathName === `/${userId}`,
            title: 'Home'
        },
        {
            href: `/${userId}/analytics`,
            active: pathName === `/${userId}/analytics`,
            title: 'Analytics',
        },

    ]
    return (
        <main className='flex gap-10'>
            {
                links.map((link) => (
                    <Link
                        key={link.href}
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
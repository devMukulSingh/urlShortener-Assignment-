import { Loader } from 'lucide-react'
import React from 'react'

const loading = () => {
    return (
        <main className='flex justify-center mt-10 w-full z-10'>
            <Loader className='transition animate-spin' size={48} />
        </main>
    )
}

export default loading
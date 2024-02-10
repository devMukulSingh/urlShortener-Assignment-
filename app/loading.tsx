import { Loader } from 'lucide-react'
import React from 'react'

const Loading = () => {
    return (
        <main className='flex justify-center mt-20 w-full z-10'>
            <Loader className='transition animate-spin' size={48} />
        </main>
    )
}

export default Loading
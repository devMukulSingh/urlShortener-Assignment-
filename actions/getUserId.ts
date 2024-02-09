"use client"

export const getUserId = () => {
    // if( typeof window !== 'undefined'){
        const userId  = localStorage.getItem('userId');
        return userId;
    // }

}
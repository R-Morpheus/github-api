import React from 'react'
import {useAppSelector} from '../hooks/redux'

export function FavouritesPage() {
    const {favourites} = useAppSelector(state => state.github)

    if (favourites.length === 0) return <p className="text-center">No items.</p>

    return (
        <div className="flex justify-center pt-10 mx-auto h-screen w-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 ">
            <ul className="list-none mb-10">
                { favourites.map(f => (
                    <li key={f} className='mb-10'>
                        <a href={f} target="_blank" className='text-lg font-bold py-3 px-5 border rounded mb-10px mt-10 hover:shadow-md hover:bg-gray-100 transition-all bg-white'>{f}</a>
                    </li>
                )) }
            </ul>
        </div>
    )
}
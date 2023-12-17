import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    return (
        <header className='bg-blue-1000' shadow-md>
            <div className='flex justify-between items-center max-w-8xl mx-auto p-4'>
                <Link to='/'>
                    <h1 className='font-blod font-inter text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-white text-4xl'>BitCat</span>
                    </h1>
                </Link>
                <ul className='flex gap-4'>
                    <Link to='/'>
                        <li className='font-inter ml-3 hidden sm:inline text-slate-100 hover:underline'>
                            Home
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li className='font-inter  hidden sm:inline text-slate-100 hover:underline'>
                            About
                        </li>
                    </Link>
                    <Link to='/cats'>
                        <li className='font-inter  hidden sm:inline text-slate-100 hover:underline'>
                            Cats
                        </li>
                    </Link>
                    <Link to='/how-to-pet'>
                        <li className='font-inter  hidden sm:inline text-slate-100 hover:underline'>
                            How to Pet
                        </li>
                    </Link>
                    <Link to='/profile'>
                        {currentUser ? (
                            <span className='text-slate-100 hover:underline'>{currentUser.username}</span>
                        ) : (
                            <li className='text-slate-100 hover:underline'></li>
                        )}
                    </Link>
                        <Link to='/profile'>
                            {currentUser ? (
                                <img
                                    className='rounded-full h-7 w-7 object-cover'
                                    src={currentUser.avatar}
                                    alt='profile'
                                />
                            ) : (
                                <li className=' text-slate-100 hover:underline'> Sign in</li>
                            )}
                        </Link>
                </ul>
            </div>
        </header>
    )
}

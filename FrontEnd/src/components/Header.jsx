import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlPrarams = new URLSearchParams(window.location.search);
        urlPrarams.set('searchTerm', searchTerm);
        const searchQuery = urlPrarams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]
    );
    return (
        <header className='bg-blue-1000' shadow-md>
            <div className='flex justify-between items-center max-w-8xl mx-auto p-6'>
                <Link to='/'>
                    <h1 className='font-blod font-inter text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-white text-4xl'>BitCat</span>
                    </h1>
                </Link>
                <form onSubmit={handleSubmit} className='bg-slate-100 ml-3 p-2 rounded-xl flex items-center'>
                    <input
                        type='text'
                        placeholder='Search'
                        className='bg-transparent focus:outline-none w-24 sm:w-64 sm:w-120 px-2 py-1'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button>
                        <FaSearch className='text-slate-600' />
                    </button>
                </form>
                <ul className='flex gap-4 text-m'>
                    <Link to='/'>
                        <li className='font-inter ml-3 hidden sm:inline text-slate-100 hover:underline text-lg'>
                            Home
                        </li>
                    </Link>
                    <Link to='/about'>
                        <li className='font-inter  hidden sm:inline text-slate-100 hover:underline text-lg'>
                            About
                        </li>
                    </Link>
                    <Link to='/cats'>
                        <li className='font-inter  hidden sm:inline text-slate-100 hover:underline text-lg'>
                            Cats
                        </li>
                    </Link>
                    <Link to='/how-to-pet'>
                        <li className='font-inter  hidden sm:inline text-slate-100 hover:underline text-lg'>
                            HowToPet
                        </li>
                    </Link>
                    <div className="flex items-center">
                        <Link to='/profile' className="flex items-center">
                            {currentUser ? (
                                <span className='text-slate-100 hover:underline whitespace-nowrap mr-3 hidden sm:inline '>{currentUser.username}</span>
                            ) : (
                                <li className='text-slate-100 hover:underline'></li>
                            )}
                            {currentUser ? (
                                <img
                                    className='rounded-full h-7 w-7 mr-3 max-w-screen-lg object-cover sm:flex '
                                    src={currentUser.avatar}
                                    alt='profile'
                                />
                            ) : (
                                <li className='text-slate-100 hover:underline text-lg'>Sign in</li>
                            )}
                        </Link>
                    </div>

                </ul>
            </div>
        </header>
    )
}

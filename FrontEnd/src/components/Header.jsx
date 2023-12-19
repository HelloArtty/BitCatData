import React, { useEffect, useState } from 'react';
import { FaBars, FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState('');
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [location.search]);

    return (
        <header className="bg-blue-1000 shadow-md">
            <div className="flex justify-between items-center max-w-8xl mx-auto p-6">
                <Link to="/">
                    <h1 className="font-bold font-inter text-sm sm:text-xl flex flex-wrap">
                        <span className="text-white text-4xl">BitCat</span>
                    </h1>
                </Link>

                {/* Hamburger menu for mobile */}
                <div className="sm:hidden">
                    <FaBars
                        className="text-white text-2xl cursor-pointer"
                        onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}
                    />
                </div>
                <form onSubmit={handleSubmit} className="bg-slate-100 ml-3 p-2 rounded-xl flex items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent focus:outline-none w-24 sm:w-64 sm:w-120 px-2 py-1"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button>
                        <FaSearch className="text-slate-600" />
                    </button>
                </form>
                {/* Navigation for desktop */}
                <nav className="hidden sm:flex gap-4 text-m">
                    <Link to="/">
                        <span className="font-inter font-semibold text-slate-100 hover:underline text-lg">Home</span>
                    </Link>
                    <Link to="/about">
                        <span className="font-inter font-semibold text-slate-100 hover:underline text-lg">About</span>
                    </Link>
                    <Link to="/cats">
                        <span className="font-inter font-semibold text-slate-100 hover:underline text-lg">Cats</span>
                    </Link>
                    <Link to="/how-to-pet">
                        <span className="font-inter font-semibold text-slate-100 hover:underline text-lg">HowToPet</span>
                    </Link>
                </nav>

                {/* Mobile menu */}
                {isMobileMenuOpen && (
                    <div className="sm:hidden absolute top-16 right-0 bg-blue-1000 w-full p-4">
                        <Link to="/">
                            <span className="font-inter text-center text-white block mb-2">Home</span>
                        </Link>
                        <Link to="/about">
                            <span className="font-inter text-center text-white block mb-2">About</span>
                        </Link>
                        <Link to="/cats">
                            <span className="font-inter text-center text-white block mb-2">Cats</span>
                        </Link>
                        <Link to="/how-to-pet">
                            <span className="font-inter text-center text-white block mb-2">HowToPet</span>
                        </Link>
                        <Link to="/profile">
                            {currentUser ? (
                                <>
                                    <span className="font-inter text-center text-white block mb-2">
                                        {currentUser.username}
                                    </span>
                                </>
                            ) : (
                                <span className="text-slate-100 hover:underline blocktext-lg ">Sign in</span>
                            )}
                        </Link>
                    </div>
                )}

                {/* Search and user profile - hidden on mobile */}
                <div className="hidden sm:flex items-center">
                    <Link to="/profile" className="flex items-center ml-3">
                        {currentUser ? (
                            <>
                                <span className="text-slate-100 hover:underline whitespace-nowrap mr-3 hidden sm:inline">
                                    {currentUser.username}
                                </span>
                                <img
                                    className="rounded-full h-7 w-7 mr-3 max-w-screen-lg object-cover sm:flex"
                                    src={currentUser.avatar}
                                    alt="profile"
                                />
                            </>
                        ) : (
                            <span className="text-slate-100 hover:underline text-lg">Sign in</span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}

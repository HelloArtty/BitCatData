import React from 'react';
import { PiCatDuotone, PiGenderIntersexBold } from 'react-icons/pi';
import { Link } from 'react-router-dom';

export default function PostItem({ post }) {
    return (
        <div className='bg-white shadow-md hover:shadow-lg overflow-hidden rounded-lg w-full sm:w-[300px]'>
            <Link to={`/post/${post.post_id}`}>
                <div className='relative'>
                    <img
                        src={JSON.parse(post.imageUrls)[0]}
                        alt="post cover"
                        className=' h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
                    />
                </div>
                <div className='p-3 flex flex-col gap-2 w-full'>
                    <p className='text-lg font-semibold text-slate-1001 truncate'>{post.title}</p>
                    <div className='flex gap-1 items-center'>
                        <PiCatDuotone className='h-5 w-5' /> <p className='text-sm text-slate-1002 truncate'>: {post.catBreed}</p>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <p className='text-semibold'>Age:</p>
                        <p className='text-sm text-slate-1002 truncate'>{post.age}</p>
                    </div>
                    <div className='flex gap-1 items-center'>
                        <PiGenderIntersexBold className='h-5 w-5' />
                        <p className='text-sm text-slate-1002 truncate' >: {post.sex}</p>
                    </div>
                        <p className='text-sm text-slate-1002 line-clamp-4'>{post.description}</p>
                </div>
            </Link>
        </div>
    );
}

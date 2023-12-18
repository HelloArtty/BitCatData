import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer.jsx";
import PostItem from '../components/PostItem';
import '../css/Home.css';



export default function Home() {
    const [orderPosts, setOrderPosts] = useState([]);
    // console.log(orderPosts);
    // search?order=desc

    useEffect(() => {
        const fetchOrderPosts = async () => {
            try {
                const res = await fetch('/backend/post/get?order=desc&limit=3');
                const data = await res.json();
                setOrderPosts(data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchOrderPosts();
    }, []);
    return (
        <div>
            <div className='bg-slate-1000'>
                <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
                    <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>
                        BitCat
                        <br />
                        I want to sleep.
                    </h1>
                    <div className='text-gray-400 text-xs sm:text-sm'>
                        BitCat is a place where you can find all the information about cats.
                    </div>
                    <Link to="/cats"
                        className='text-xs sm:text-sm text-blue-800 font-bold hover:underline'>
                        See all cats
                    </Link>
                </div>
            </div>
            <div className="row-home">
                <div className="imgWrapper">
                    <img src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D" alt="" />
                </div>
                <div className="contentWrapper">
                    <div className="content-img">
                        <h2>
                            About Us
                        </h2>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quia debitis deserunt, eum nobis ullam nesciunt adipisci dicta, magnam expedita exercitationem blanditiis vitae, corporis accusantium nihil repellendus laborum nostrum mollitia quidem!
                            Veritatis voluptatibus iusto et, culpa ab odio inventore consequuntur placeat natus, ipsa obcaecati quae sapiente consequatur temporibus illum? Deserunt unde provident omnis aliquam ea. Deleniti expedita beatae ab quasi nobis.</p>
                        <a href="/About">Read More</a>
                    </div>
                </div>
            </div>
            <div className='max-w-6xl mx-auto p-2 flex flex-col gap-8 my-10'>
                {orderPosts && orderPosts.length > 0 && (
                    <div className=''>
                        <div className='my-3'>
                            <h2 className='text-3xl font-bold text-slate-600 mb-10'>Lastest Cats</h2>
                            {/* <Link className='text-sm text-blue-800 hover:underline' to={'/search?order=desc'}>Show more</Link> */}
                        </div>
                        <div className='flex flex-wrap gap-4'>
                            {orderPosts.map((post) => (
                                <PostItem post={post} key={post.post_id} />
                            ))}
                        </div>
                        <div className='flex justify-center m-8'>
                            <a
                                href='/cats' to={'/search?order=desc'}
                                className='bg-blue-1000 text-center text-white rounded p-3 text-lg  w-[150px]  font-semibold '>
                                View All
                            </a>
                        </div>
                    </div>
                )}
            </div>
            <div className='h-[600px] bg-slate-1000 flex flex-col justify-center'>
                <div className=' justify-center mt-16'>
                    <h1 className='text-center text-9xl font-bold'>
                        How To Pet
                    </h1>
                    <div className=' flex justify-center'>
                        <p className='text-xl m-5 w-1/2  text-center'>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                            Corporis nulla similique sit mollitia, nihil harum vel quis et exercitationem eligendi quas!
                            Incidunt ex illo consequatur quod voluptatem impedit eligendi culpa.
                        </p>
                    </div>
                    <div className=' flex justify-center mt-4'>
                        <a href="/how-to-pet">
                            <button
                                className='bg-blue-1000 text-white rounded p-3 w-[150px] text-lg font-semibold'>
                                Read More
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className='h-[100px]'>
            </div>
            <Footer />
        </div>
    )
}


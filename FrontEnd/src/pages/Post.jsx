import { useEffect, useState } from 'react';
import { FaShare } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';


export default function post() {
    const params = useParams();
    const [post, setPost] = useState(null);
    const [copied, setCopied] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        SwiperCore.use([Navigation]);
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/backend/post/get/${params.postId}`)
                const data = await res.json()
                if (data.success === false) {
                    setError(true);
                    setLoading(false);
                    return;
                }
                setPost(data);
                setLoading(false);
                setError(false);
            } catch (error) {
                setError(true);
                setLoading(false);
            }
        };
        fetchPost();
    }, [params.postId]);
    return (
        <main>
            {loading && <p className="text-center text-blue-1001 my-7 text-2xl" >Loading...</p>}
            {error && <p className="text-center text-red-1001 my-7 text-2xl" >Something Wrong!</p>}
            {post && !loading && !error &&
                <div>
                    <Swiper navigation spaceBetween={20}>
                        {JSON.parse(post.imageUrls).map((url) => (
                            <SwiperSlide key={url}>
                                <div
                                    className="h-[400px] w-[400px] bg-center bg-no-repeat bg-cover rounded-[10px] mx-auto my-5 relative"
                                    style={{
                                        background: `url(${url}) center no-repeat`,
                                        backgroundSize: 'cover',
                                    }}
                                >
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                        <FaShare
                            className='text-slate-500'
                            onClick={() => {
                                navigator.clipboard.writeText(window.location.href);
                                setCopied(true);
                                setTimeout(() => {
                                    setCopied(false);
                                }, 2000);
                            }}
                        />
                    </div>
                    {copied && (
                        <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
                            Link copied!
                        </p>
                    )}
                    <div className='flex flex-col max-w-xl mx-auto p-4 my-7 gap-4 border-2 bg-slate-1000 border-slate-500 border-ls'>
                        <p className='text-3xl font-semibold line-clamp-1'>
                            Name: {post.title}
                        </p>
                        <p className='flex items-center gap-2 text-slate-600  text-l'>
                            <span className='font-semibold text-black'>Cat Breed: </span>{post.catBreed}
                        </p>
                        <p className='flex items-center gap-2 text-slate-600  text-l'>
                            <span className='font-semibold text-black'>Age: </span>{post.age}
                        </p>
                        <p className='flex items-center gap-2 text-slate-600  text-l'>
                            <span className='font-semibold text-black'>Sex: </span>{post.sex}
                        </p>
                        <p className='text-slate-800'>
                            <span className='font-semibold text-black'>Description: </span>
                            {post.description}
                        </p>
                    </div>
                </div>
            }
        </main >
    )
}

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PostItem from '../components/PostItem';

export default function Search() {
    const navigate = useNavigate();
    const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        catBreed: '',
        sex: '',
        sort: 'postDate',
        order: 'desc',
    });
    // console.log(sidebardata)
    const [loading, setLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl = urlParams.get('searchTerm');
        const catBreedFromUrl = urlParams.get('catBreed');
        const sexFromUrl = urlParams.get('sex')
        const sortFromUrl = urlParams.get('sort')
        const orderFromUrl = urlParams.get('order')

        if (
            searchTermFromUrl ||
            catBreedFromUrl ||
            sexFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                catBreed: catBreedFromUrl || '',
                sex: sexFromUrl || '',
                sort: sortFromUrl || 'postDate',
                order: orderFromUrl || 'desc',
            });
        }

        const fetchPosts = async () => {
            setLoading(true)
            setShowMore(false);
            const searchQuery = urlParams.toString()
            const res = await fetch(`/backend/post/get?${searchQuery}`)
            const data = await res.json();
            if (data.length > 8) {
                setShowMore(true);
            } else {
                setShowMore(false);
            }
            setPosts(data);
            setLoading(false)
        };

        fetchPosts();
    }, [location.search])

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === 'searchTerm') {
            setSidebardata({
                ...sidebardata,
                searchTerm: value
            });
        }
        if (id === 'catBreed') {
            setSidebardata({
                ...sidebardata,
                catBreed: value
            });
        }
        if (id === 'sex') {
            setSidebardata({
                ...sidebardata,
                sex: value
            });
        }
        if (id === 'sort_order') {
            let [sort, order] = value.split('_');
            setSidebardata({
                ...sidebardata,
                sort: sort || 'postDate',
                order: order || 'desc'
            });
        }
        console.log(`${sidebardata.sort}_${sidebardata.order}`);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams()
        urlParams.append('searchTerm', sidebardata.searchTerm)
        urlParams.append('catBreed', sidebardata.catBreed)
        urlParams.append('sex', sidebardata.sex)
        urlParams.append('sort', sidebardata.sort)
        urlParams.append('order', sidebardata.order)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

    const onShowMoreClick = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await fetch(`/backend/post/get?${searchQuery}`);
        const data = await res.json();
        if (data.length < 9) {
            setShowMore(false);
        }
        setPosts([...posts, ...data]);
    };
    return (
        <div className='flex flex-col md:flex-row'>
            <div className='p-7  border-b-2 md:border-r-2 md:min-h-screen'>
                <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
                    <div className='flex items-center gap-2'>
                        <label
                            className='whitespace-nowrap font-semibold'>
                            Search Term:
                        </label>
                        <input
                            type='text'
                            id='searchTerm'
                            placeholder='Search...'
                            className='border-blue-1000 bg-slate-1000 border ml-2 rounded-lg p-3 '
                            onChange={handleChange}
                            value={sidebardata.searchTerm}
                        />
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label
                            className='whitespace-nowrap font-semibold m-3'>
                            Cat Breed:
                        </label>
                        <div className='flex gap-2'>
                            <select
                                className=" border-blue-1000 bg-slate-1000 border p-3 ml-2 rounded-lg"
                                id="catBreed"
                                onChange={handleChange}
                                value={sidebardata.catBreed}
                            >
                                <>
                                    <option value="">Select Cat Breed</option>
                                    <option value="American shorthair">American Shorthair</option>
                                    <option value="American curl">American Curl</option>
                                    <option value="Balinese">Balinese</option>
                                    <option value="Bengal">Bengal</option>
                                    <option value="British shorthair">British Shorthair</option>
                                    <option value="Chinchilla">Chinchilla</option>
                                    <option value="Exotic shorthair">Exotic Shorthair</option>
                                    <option value="Scottish fold">Scottish Fold</option>
                                    <option value="Korat">Korat</option>
                                    <option value="Khao manee">Khao Manee</option>
                                    <option value="Maine coon">Maine Coon</option>
                                    <option value="Munchkin">Munchkin</option>
                                    <option value="Norwegian forest">Norwegian Forest</option>
                                    <option value="Persian">Persian</option>
                                    <option value="Ragdoll">Ragdoll</option>
                                    <option value="Russian blue">Russian Blue</option>
                                    <option value="Siamese">Siamese</option>
                                    <option value="Snowshoe">Snowshoe</option>
                                    <option value="Sphynx">Sphynx</option>
                                </>
                            </select>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label
                            className='whitespace-nowrap font-semibold m-3'>
                            Sex:
                        </label>
                        <div className='flex gap-2'>
                            <select
                                className="border-blue-1000 bg-slate-1000 border p-3 ml-3 rounded-lg"
                                id="sex"
                                onChange={handleChange}
                                value={sidebardata.sex}
                            >
                                <>
                                    <option value="">Select Sex</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </>
                            </select>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-wrap items-center'>
                        <label
                            className='whitespace-nowrap font-semibold m-3'>
                            Sort:
                        </label>
                        <div className='flex gap-2'>
                            <select
                                className="border-blue-1000 bg-slate-1000 border p-3 ml-3 rounded-lg"
                                id="sort_order"
                                onChange={handleChange}
                                value={`${sidebardata.sort}_${sidebardata.order}`}
                            >
                                <option value='age_asc'>Age low to high</option>
                                <option value='age_desc'>Age high to low</option>
                                <option value='postDate_desc'>Lastest</option>
                                <option value='postDate_asc'>Oldest</option>
                            </select>
                        </div>
                    </div>
                    <button className='items-center w-24 bg-blue-1001 text-white border rounded-lg p-3 ml-2 uppercase hover:opacity-95 disabled:opacity-80'
                        id="sort_order" >Search
                    </button>
                </form>
            </div>
            <div className='flex-1'>
                <h1 className='text-3xl font-semibold border-b p-3 text-slate-700 mt-5'>Posts</h1>
                <div className='p-7 flex flex-wrap gap-4'>
                    {!loading && posts.length === 0 && (
                        <p className='text-xl font-semibold text-slate-700'>
                            No posts found!
                        </p>
                    )}
                    {loading && (
                        <p className='text-xl text-slate-700 text-center w-full'>
                            Loading...
                        </p>
                    )}
                    {!loading &&
                        posts &&
                        posts.map((post) => (
                            <PostItem key={post.post_id} post={post} />
                        ))}
                    {showMore && (
                        <button
                            onClick={onShowMoreClick}
                            className='text-green-700 hover:underline p-7 text-center w-full'
                        >
                            Show more
                        </button>
                    )}
                </div>
            </div>
        </div >
    )
}

import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable,
} from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { app } from '../firebase';
import {
    deleteUserFailure,
    deleteUserStart,
    deleteUserSuccess,
    signoutUserFailure,
    signoutUserStart,
    signoutUserSuccess,
    updateUserFailure,
    updateUserStart,
    updateUserSuccess
} from '../redux/user/userSlice';




export default function Profile() {
    const fileRef = useRef(null)
    const { currentUser, loading, error } = useSelector((state) => state.user);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, serFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const [showPostError, setShowPostError] = useState(false);
    const [userPost, setUserPost] = useState([]);
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [formDataContact, setFormDataContact] = useState({
        phone: '',
    });
    const [formDataLocation, setFormDataLocation] = useState({
        location: '',
    });
    const [ContactSuccess, setContactSuccess] = useState(false);
    const [LocationSuccess, setLocationSuccess] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        if (file) {
            handleFileUpload(file);
        }
    }, [file]);

    const handleFileUpload = (file) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on('state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred /
                    snapshot.totalBytes) * 100;
                setFilePerc(Math.round(progress));
            },
            (error) => {
                setFileUploadError(true);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setFormData({ ...formData, avatar: downloadURL });
                });
            },
        );


    };

    const handleChange = (e) => {
        if (e.target.id === 'contact') {
            setFormDataContact({ ...formDataContact, phone: e.target.value });
        } else if (e.target.id === 'location') {
            setFormDataLocation({ ...formDataLocation, location: e.target.value });   
        } else {
            setFormData({ ...formData, [e.target.id]: e.target.value });
        }

    };

    const handleSubmitContact = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`backend/contact/create-contact/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formDataContact,
                    user_id: currentUser.user_id,
                }
                ),
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setContactSuccess(true); //???
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmitLocation = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`backend/location/create-location/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formDataLocation,
                    user_id: currentUser.user_id,
                }
                ),
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setLocationSuccess(true); //???
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            dispatch(updateUserStart());
            const res = await fetch(`backend/user/update/${currentUser.user_id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(updateUserFailure(data.message));
                return;
            }
            dispatch(updateUserSuccess(data));
            setUpdateSuccess(true);
        } catch (error) {
            dispatch(updateUserFailure(error.message));
        }
    };

    const handleDeleteUser = async () => {
        try {
            dispatch(deleteUserStart());
            const res = await fetch(`backend/user/delete/${currentUser.user_id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                dispatch(deleteUserFailure(data.message));
                return;
            }
            dispatch(deleteUserSuccess(data));

        } catch (error) {
            dispatch(deleteUserFailure(error.message));
        }
    };

    const handlesignout = async () => {
        try {
            dispatch(signoutUserStart());
            const res = await fetch('backend/auth/signout');
            const data = await res.json();
            if (data.success === false) {
                dispatch(signoutUserFailure(data.message));
                return;
            }
            dispatch(signoutUserSuccess(data));
        } catch (error) {
            dispatch(signoutUserFailure(error.message));
        }
    };

    const handleShowPost = async () => {
        try {
            setShowPostError(false);
            const res = await fetch(`backend/user/post/${currentUser.user_id}`);
            const data = await res.json();

            if (data.success === false) {
                setShowPostError(true);
                return;
            }
            setUserPost(data);
        } catch (error) {
            setShowPostError(true);
        }
    };

    const handlePostDelete = async (post_id) => {
        try {
            const res = await fetch(`backend/post/delete/${post_id}`, {
                method: 'DELETE',
            });
            const data = await res.json();
            if (data.success === false) {
                console.log(data.message);
                return;
            }
            setUserPost((prev) =>
                prev.filter((post) => post.post_id !== post_id)
            );
        } catch (error) {
            console.log(error.message)
        }
    };

    return (
        <div className="p-3 max-w-lg mx-auto">
            <h1 className='text-5xl font-semibold text-center my-7'>
                Profile
            </h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <input
                    onChange={(e) => setFile(e.target.files[0])}
                    type='file'
                    ref={fileRef}
                    hidden accept='image/*'
                />
                <img
                    onClick={() => fileRef.current.click()}
                    src={formData.avatar || currentUser.avatar}
                    alt="profile"
                    className='rounded-full h-48 w-48 object-cover cursor-pointer self-center mt-2'
                />
                <p className='text-l self-center'>
                    {fileUploadError ? (
                        <span className='text-red-600'>Error Image Upload
                            (Image must be less than 2 MB)
                        </span>
                    ) : filePerc > 0 && filePerc < 100 ? (
                        <span className='text-slate-600'>
                            {`Uploading ${filePerc}%`}</span>
                    ) : filePerc === 100 ? (
                        <span className='text-green-600'>Image Successfully Uploaded!</span>
                    ) : ('')
                    }
                </p>
                <input
                    type="text"
                    placeholder='username'
                    defaultValue={currentUser.username}
                    id='username'
                    className='border border-blue-1000 p-3 rounded-lg bg-slate-1000'
                    onChange={handleChange}
                />
                <input
                    type="email"
                    placeholder='email'
                    defaultValue={currentUser.email}
                    id='email'
                    className='border border-blue-1000 p-3 rounded-lg bg-slate-1000'
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder='password'
                    id='password'
                    className='border border-blue-1000 p-3 rounded-lg bg-slate-1000'
                    onChange={handleChange}
                />
                <div className='flex flex-wrap justify-center'>
                    <button disabled={loading} className='bg-blue-1001 mt-1 w-60 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80 '>
                        {loading ? 'Loading...' : 'Update'}
                    </button>
                    <Link to="/create-post" className='bg-green-700 ml-1 mt-1 w-60 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'>
                        Create Post
                    </Link>
                </div>
            </form>
            <form onSubmit={handleSubmitContact} className='mt-4 flex'>
                <input
                    type="number"
                    placeholder='Phone'
                    id='contact'
                    className='border border-blue-1000 p-3 rounded-lg bg-slate-1000'
                    value={formDataContact.phone}
                    onChange={handleChange}
                />
                <button className='bg-green-700 w-1/2 ml-1 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'>
                    Add Contact
                </button>
            </form>
            <form onSubmit={handleSubmitLocation} className='mt-4 flex'>
                <input
                    type="text"
                    placeholder='Address'
                    id='location'
                    className='border border-blue-1000 p-3 rounded-lg bg-slate-1000'
                    value={formDataLocation.location}
                    onChange={handleChange}
                />
                <button className='bg-green-700 w-1/2 ml-1 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'>
                    Add Location
                </button>
            </form>
            <button onClick={handleShowPost}
                className='w-full text-semibold text-lg mt-4 bg-sky-600 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'>
                Show Post
            </button>
            <div className="flex justify-between mt-5">
                <span onClick={handleDeleteUser} className='text-white cursor-pointer p-2 bg-red-600 rounded-lg'>
                    Delete Account
                </span>
                <span onClick={handlesignout} className='text-white cursor-pointer p-2 bg-stone-600 rounded-lg w-32 text-center'>
                    LogOut
                </span>
            </div>
            <p className='text-red-700 mt-5'>{error ? error : ''}</p>
            <p className='text-green-700 mt-5'>{updateSuccess ? 'Profile Updated Successfully!' : ''}</p>
            <p className='text-red-700 mt-5'>{showPostError ? 'Error Showing Post!' : ''}</p>
            <p className='text-green-700 mt-5'>{ContactSuccess ? 'Contact Added Successfully!' : ''}</p>
            <p className='text-green-700 mt-5'>{LocationSuccess ? 'Location Added Successfully!' : ''}</p>


            {userPost &&
                userPost.length > 0 &&
                <div className='flex flex-col gap-4'>
                    <h1 className='text-center font-semibold mt-7 text-3xl'>Your Posts</h1>
                    {userPost.map((post) =>
                        <div
                            key={post.post_id}
                            className="flex items-center mt-5 border rounded-lg p-3 justify-between gap-4"
                        >
                            <Link
                                to={`/post/${post.post_id}`}>
                                <img src={JSON.parse(post.imageUrls)[0]} alt="post cover"
                                    className='w-40 h-40 object-cover rounded-lg' />
                            </Link>
                            <Link
                                to={`/post/${post.post_id}`}
                                className='flex-1 font-semibold hover:underline truncate'>
                                <p>{post.title}</p>
                            </Link>
                            <div className='flex flex-col'>
                                <Link to={`/update-post/${post.post_id}`}>
                                    <button className='text-green-600 uppercase'>
                                        edit
                                    </button>
                                </Link>
                                <button onClick={() => handlePostDelete(post.post_id)} className='text-red-600 uppercase'>
                                    delete
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            }
        </div>
    )
}



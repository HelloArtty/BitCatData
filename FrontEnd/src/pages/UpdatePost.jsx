import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytesResumable
} from "firebase/storage";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { app } from '../firebase';

export default function UpdatePost() {
    const { currentUser } = useSelector(state => state.user)
    const navigate  = useNavigate()
    const [files, setFiles] = useState([])
    const params = useParams()
    const [formData, setFormData] = useState({
        imageUrls: [],
        title: '',
        catBreed: '',
        age: '',
        sex: '',
        location: '',
        description: '',
    });
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            const postId = params.postId;
            const res = await fetch(`/backend/post/get/${postId}`);
            const data = await res.json();
            if(data.success === false){
                console.log(data.message);
                return;
            }
            setFormData(data);
        }
        fetchPost();
    },[]);


    const handleImageSubmit = (e) => {
        if (files.length > 0 && files.length + JSON.parse(formData.imageUrls).length < 7) {
            setUploading(true);
            setImageUploadError(false);
            const promises = [];
            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({
                    ...formData, imageUrls: JSON.stringify(JSON.parse(formData.imageUrls).concat(urls))
                });
                setImageUploadError(false);
                setUploading(false);

            }).catch((err) => {
                setImageUploadError('Image upload failed (2mb max per image)');
                setUploading(false);
            });
        } else {
            setImageUploadError('You can only upload 6 images per post');
            setUploading(false);
        }
    };

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app)
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                        resolve(downloadURL);
                    });
                }
            );
        });
    };

    const handleRemoveImage = (index) => {
        setFormData({
            ...formData,
            imageUrls: JSON.parse(formData.imageUrls).filter((_, i) => i !== index),
        });
    };

    const handleChanges = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1) {
                return setError('You must upload at least one image');
            }
            if (formData.title.length < 5 || formData.title.length > 50) {
                return setError('Title must be between 10 and 50 characters');
            }
            if (formData.description.length < 10 || formData.description.length > 500) {
                return setError('Description must be between 10 and 500 characters');
            }
            setLoading(true);
            setError(false);
            const res = await fetch(`/backend/post/update/${params.postId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    user_id: currentUser.user_id,
                }),
            });
            const data = await res.json();
            setLoading(false);
            if (data.success === false) {
                setError(data.message);
            }
            navigate(`/post/${data.post_id}`)
        } catch (error) {
            setError(error.message);
            setLoading(false);
        }
    };

    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Edit Post</h1>
            <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input
                        type="text"
                        placeholder="Title"
                        className=" border-blue-1000 bg-slate-1000 border p-3 rounded-lg"
                        id='title'
                        maxLength="50" minLength="10"
                        required
                        onChange={handleChanges}
                        value={formData.title}
                    />
                    <select
                        className="border-blue-1000 bg-slate-1000 border p-3 rounded-lg"
                        id="catBreed"
                        required
                        onChange={handleChanges}
                        value={formData.catBreed}
                    >
                        <>
                        <option value="">Select Cat Breed</option>
                            <option value="American Shorthair">American Shorthair</option>
                            <option value="American Curl">American Curl</option>
                            <option value="Balinese">Balinese</option>
                            <option value="Bengal">Bengal</option>
                            <option value="British Shorthair">British Shorthair</option>
                            <option value="Chinchilla">Chinchilla</option>
                            <option value="Exotic Shorthair">Exotic Shorthair</option>
                            <option value="Scottish Fold">Scottish Fold</option>
                            <option value="Korat">Korat</option>
                            <option value="Khao Manee">Khao Manee</option>
                            <option value="Maine Coon">Maine Coon</option>
                            <option value="Munchkin">Munchkin</option>
                            <option value="Norwegian Forest">Norwegian Forest</option>
                            <option value="Persian">Persian</option>
                            <option value="Ragdoll">Ragdoll</option>
                            <option value="Russian Blue">Russian Blue</option>
                            <option value="Siamese">Siamese</option>
                            <option value="Snowshoe">Snowshoe</option>
                            <option value="Sphynx">Sphynx</option>
                        </>
                    </select>
                    <input
                        type="number"
                        placeholder="Age"
                        className=" border-blue-1000 bg-slate-1000 border p-3 rounded-lg"
                        id='age'
                        required
                        onChange={handleChanges}
                        value={formData.age}
                    />
                    <select
                        className="border-blue-1000 bg-slate-1000 border p-3 rounded-lg"
                        id="sex"
                        required
                        value={formData.sex}
                        onChange={handleChanges}
                    >
                        <>
                            <option value="">Select Sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </>
                    </select>
                    <input
                        type="text"
                        placeholder="Address"
                        className=" border-blue-1000 bg-slate-1000 border p-3 rounded-lg"
                        id='location'
                        required
                        onChange={handleChanges}
                        value={formData.location}
                    />
                    <textarea
                        type="text"
                        placeholder="Description"
                        className=" border-blue-1000 bg-slate-1000 border p-3 rounded-lg"
                        id='description'
                        required
                        onChange={handleChanges}
                        value={formData.description}
                    />
                </div>
                <div className='flex flex-1 flex-col gap-4'>
                    <p className='font-semibold'>
                        Images:
                        <span className='font-normal text-gray-700 ml-2'>
                            Add Image (max 6)
                        </span>
                    </p>
                    <div className='flex gap-4'>
                        <input
                            onChange={(e) => setFiles(e.target.files)}
                            className="border p-3 border-gray-300 rounded w-full"
                            type='file'
                            id="images"
                            accept="image/*"
                            multiple
                        />
                        <button
                            type='button'
                            disabled={uploading}
                            onClick={handleImageSubmit}
                            className='p-3 text-green-700 border border-green-600 rounded uppercase hover:shadow-lg disabled:opacity-90'>
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </div>
                    <p className='text-red-700 text-sm'>
                        {imageUploadError && imageUploadError}
                    </p>
                    {formData.imageUrls.length > 0 &&
                        JSON.parse(formData.imageUrls).map((url, index) => (
                            <div
                                key={url}
                                className='flex justify-between p-3 border items-center'
                            >
                                <img
                                    src={url}
                                    alt='listing image'
                                    className='w-1/2 h-40 object-cover rounded-lg'
                                />
                                <button
                                    type='button'
                                    onClick={() => handleRemoveImage(index)}
                                    className='p-3 text-red-700 rounded-lg uppercase hover:opacity-75'
                                >
                                    Delete
                                </button>
                            </div>
                        ))}
                    <button disabled={loading || uploading}
                        className='p-3 bg-blue-1001 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
                        {loading ? 'Updating...' : 'Edit Post'}
                    </button>
                    {error && <p className='text-red-700 text-sm'>{error}</p>}
                </div>
            </form>
        </main>
    )
}

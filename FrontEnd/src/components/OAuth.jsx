import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { app } from '../firebase';
import { signInSuccess } from '../redux/user/userSlice';

export default function OAuth() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGoogleClick = async () => {
        try {
            setLoading(true);
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

            const res = await fetch('backend/auth/google', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL,
                }),
            });

            const data = await res.json();
            dispatch(signInSuccess(data));
            navigate('/');
        } catch (error) {
            console.error('Could not sign in with Google', error);
            setLoading(false);
            setError('Could not sign in with Google. Please try again.');
        }
    };

    return (
        <button
            onClick={handleGoogleClick}
            type='button'
            className='bg-red-700 text-white p-3 rounded-lg uppercase hover:opacity-90'
            disabled={loading} // Disable the button while loading
        >
            {loading ? 'Logging in...' : 'Continue with Google'}
        </button>
    );
}

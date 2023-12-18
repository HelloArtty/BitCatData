import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import About from './pages/About';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import HowToPet from './pages/HowToPet';
import Post from './pages/Post';
import Profile from './pages/Profile';
import Search from './pages/Search';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import UpdatePost from './pages/UpdatePost';



export default function App() {
  
  return (
    <BrowserRouter>
    <Header />
      <Routes>
        <Route path='/' element = {<Home />} />
        <Route path='/about' element = {<About />} />
        <Route path='/cats' element = {<Search />} />
        <Route path='/how-to-pet' element = {<HowToPet />} />
        <Route path='/signin' element = {<SignIn />} />
        <Route path='/signup' element = {<SignUp />} />
        <Route path='/post/:postId' element = {<Post />} />
        <Route path='/search' element = {<Search />} />

        <Route element = {<PrivateRoute />} >
          <Route path='/profile' element = {<Profile />} />
          <Route path='/create-post' element = {<CreatePost />} />
          <Route path='/update-post/:postId' element = {<UpdatePost />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
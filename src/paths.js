
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Pages
import About from 'pages/About'
import Contact from 'pages/Contact'
import Login from 'pages/Login'
import NotFound from 'pages/NotFound'
import Posts from 'pages/Posts'
import Products from 'pages/Products'
import Profile from 'pages/Profile'
import Home from 'pages/Home'
import AllPosts from 'pages/Posts/AllPosts'


const Paths = () => {
    return (
        <>
        
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} />

                    <Route path="/products" element={<Products />} />
                    <Route path="/allposts" element={<AllPosts />} />
                    <Route path="/posts/:idPost" element={<Posts />} />
                    
                    <Route path="/about" element={<About />} />

                    <Route path="*" element={<NotFound />} />

                </Routes>
            </BrowserRouter>

        </>
    );
}

export default Paths;
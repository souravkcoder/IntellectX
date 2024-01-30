// import React from 'react';
// import { Link } from "react-router-dom";
import {useNavigate } from "react-router-dom";
import { useEffect } from "react";
import NavLink from "../NavLink/NavLink";
import Banner from "../Banner/Banner";
import Footer from "../Footer/Footer";
import Categories from "../Categories/Categories";
import Courses from "../Courses/Courses";
import { useCookies } from 'react-cookie';
const Home = () => {
    const [token, setToken, removeToken] = useCookies();
    const navigate = useNavigate();
    useEffect(() => {
        if (token['mytoken']) {
            navigate('/account/pHome');
        }
    }, [token]);
    return (
        <div className="h-screen relative flex flex-col items-center"
            style={{ textAlign: 'center' }}>

            {/* Header section */}
            <div className="relative w-full flex 
            items-center justify-between pt-5 mx-auto px-5 py-6" style={{ backgroundColor: '#407C87' }}>
                <h1 className="text-left text-4xl font-extrabold">InTeLLectX</h1>
                <ul className=" hidden md:flex items-center gap-10 lg:gap-12">
                    {/* <NavLink to="/login">Login</NavLink> */}
                    <NavLink to="/signup"><strong>Sign Up</strong></NavLink>
                    <NavLink to="/login"><strong>Log In</strong></NavLink>
                </ul>
            </div>


            {/* Banner section */}
             <Banner></Banner>

            {/* Top Courses */}
            <Courses></Courses>

            {/* Top Categories section */}
            <Categories></Categories>

            {/* Footer Section */}
            <Footer></Footer>

        
        </div>
    );
};

export default Home;
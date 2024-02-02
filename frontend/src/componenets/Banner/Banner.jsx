// import React from 'react';

import { Link } from "react-router-dom";

const Banner = () => {
    return (
        <div className="flex-grow w-full" style={{ 
        backgroundImage:'url("/../../images/banner.jpg")',
        backgroundSize:'cover',
        backgroundAttachment:'fixed',
        position:'relative',
        top:'0',
        left: '0',
        zIndex: '-1',
        width:'100%',
        height:'100vh',
        paddingTop: '10%',
        paddingRight:'50px',
        }}>
            <section>
                <div className="container text-left">
                    <div className="w-1/2 md:w-5/6 ps-10">
                        <h3 className='text-2xl font-semibold'>Welcome to IntellectX</h3>
                        <h1 className='text-4xl  font-bold '>Embrace a Limitless Learning Experience on Our Platform</h1>
                        <p className='text-lg mt-5'>Pioneering a new era with endless learning opportunities, join us in this transformative journey to revolutionize education, where innovation and <br />accessibility converge to create a future of limitless knowledge and growth.</p>
                            <div>
                                <Link>
                                <button className='w-1/4 lg:w-1/4 my-5 py-2 bg-cyan-300 shadow-lg shadow-cyan-400/30 hover:bg-teal-400 text-lg font-semibold rounded-lg'>Explore Now</button></Link>
                            </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Banner;

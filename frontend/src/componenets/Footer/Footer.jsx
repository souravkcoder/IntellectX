// import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <div className="w-full">
            <section className="mt-12 py-12 md:px-0 px-28 "
                style={{
                    backgroundColor: '#407C87',
                }}>
                <div className="grid grid-cols-3 gap-4">
                    <div className=" pe-12">
                        <h1 className="font-semibold text-3xl mb-3">IntellectX</h1>
                        <span className='text-xl'>online education & learning </span>

                        {/* social Icons */}
                        <div>
                            <Link ><FontAwesomeIcon icon={faFacebookSquare} className='me-4' /></Link>
                            <Link ><FontAwesomeIcon icon={faTwitter} className='me-4' /></Link>
                            <Link ><FontAwesomeIcon icon={faInstagram} /></Link>
                        </div>
                    </div>
                    <div className="">
                        <h3 className='font-medium text-2xl mb-3'>Explore</h3>
                        <ul>
                            <li className='text-xl'>About Us</li>
                            <li className='text-xl'>Contact Us</li>
                        </ul>
                    </div>
                    <div>
                        <h3 className='font-medium text-2xl mb-3'>Have a Question?</h3>
                        <ul>
                            <li><FontAwesomeIcon icon={faPhone} />+8801234567899</li>
                            <li><FontAwesomeIcon icon={faEnvelope} />intellectx@gmail.com</li>
                        </ul>
                    </div>
                </div>

            </section>
        </div>
    );
};

export default Footer;



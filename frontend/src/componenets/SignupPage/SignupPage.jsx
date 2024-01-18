// import React from 'react';
import signUpImg from '../../images/loginpageImg.jpg'
import { Link } from 'react-router-dom';
import ApiServices from '../ApiService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'

const SignupPage = () => {

    const [username, setUsername] = useState('')
    const [password, setPwd] = useState('')
    let [incorr, setIncorr] = useState('')
    const body = { username, password }
    let naviagte = useNavigate()
    const SignUpBtn = () => {
        const details = JSON.stringify(body)
        fetch('http://127.0.0.1:8000/auth/users/', {
            'method': 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: details
        })
            .then(resp => {
                if (resp.status === 400) {
                    setIncorr(incorr = <div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
                        <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                            Username Already Exists.
                        </div>
                    </div>)
                }
                else if (resp.status === 201) {
                    naviagte('/login')
                }
            })



    }



    return (
        <div className='p-1.5'>
            {/* <Header></Header> */}
            <div className='px-24 py-8 lg:px-64 lg:py-44 w-full h-full lg:overflow-y-hidden' style={{
                position: 'relative',
                backgroundColor: '#A5DBDD',
                textAlign: 'center',
            }}>
                <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 h-full w-full mx-auto my-auto'>
                    {/* <h1>THis is Login page</h1> */}
                    <div className='hidden sm:block sm:mb-1'>
                        <img className='h-96 w-full object-cover' src={signUpImg} alt="image" />
                    </div>

<<<<<<< HEAD

                    <div className="bg-cyan-600 flex flex-col justify-center mb-6">
                        <h2 className='text-4xl dark:text-white font-bold text-center mt-10'>Sign Up</h2>
                        {incorr}
                        <div className='flex flex-col text-gray-200 py-2 px-12 lg:px-32 mt-4'>
                            <label htmlFor="">User Name</label>
                            <input value={username} onChange={e => setUsername(e.target.value)} className='rounded-lg bg-gray-700 mt-1 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" />
                        </div>
                        <div className='flex flex-col text-gray-200 py-1 px-12 lg:px-32'>
                            <label htmlFor="">Password</label>
                            <input value={password} onChange={e => setPwd(e.target.value)} className='rounded-lg bg-gray-700 mt-1 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" />
                        <button className='w-2/5 lg:w-4/6 mx-auto my-5 py-2 bg-cyan-300 shadow-lg shadow-cyan-400/30 hover:bg-teal-400 text-1xl font-semibold rounded-lg' onClick={SignUpBtn}>Sign up</button>
                        </div>
                        {/* <div className='flex justify-between text-gray-200  py-2 px-12 lg:px-32'>
                                <p><input type="checkbox"/>Remember Me</p>
                                <p>Forget password</p>
                            </div> */}
                        <p className='text-1xl mb-5'>Already have an Account? Then {" "}
                            <Link className='font-semibold hover:text-emerald-800 hover:underline' to="/login"> Login</Link>{" "}
                        </p>
=======
                    <div className="bg-cyan-600 flex flex-col justify-center">
                            <h2 className='text-4xl dark:text-white font-bold text-center' >Sign Up</h2>
                            {incorr}
                            <div className='flex flex-col text-gray-200 py-2 px-12 lg:px-32'>
                                <label htmlFor="">User Name</label>
                                <input value={username} onChange={e=>setUsername(e.target.value)} className='rounded-lg bg-gray-700 mt-1 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" />
                            </div>
                            <div className='flex flex-col text-gray-200 py-1 px-12 lg:px-32'>
                                <label htmlFor="">Password</label>
                                <input value={password} onChange={e=>setPwd(e.target.value) } className='rounded-lg bg-gray-700 mt-1 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" />

                                <button className=' w-100% lg:w-6/6 my-5 py-2 bg-cyan-500 shadow-lg shadow-cyan-400/30 hover:bg-teal-500 text-1xl font-semibold rounded-lg' onClick={SignUpBtn}>Sign up</button>

                            </div>
                            {/* <div className='flex justify-between text-gray-200  py-2 px-12 lg:px-32'>
                                <p><input type="checkbox"/>Remember Me</p>
                                <p>Forget password</p>
                            </div> */}
                            
                            <p className='text-1xl'>Already have an Account? Then {" "}
                                 <Link className='font-semibold hover:text-emerald-800 hover:underline' to="/login"> Login</Link>{" "} </p>
>>>>>>> f4ebe8e0b5ee3433affeb8093ceb0b017ea65fe9
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
// import React from 'react';
import { Link, json } from 'react-router-dom';
import loginImg from '../../images/signupImg4.jpg';
// import Header from '../Header/Header';
import { useState,useEffect } from 'react';
import ApiServices from '../ApiService';
import { useCookies } from 'react-cookie';
import {useNavigate} from 'react-router-dom'


const LoginPage = () => {
   
    const [username, setUsername]=useState('')
    const [password, setPwd]=useState('')
    const body={username,password}
    const [token, setToken]= useCookies(['mytoken'])
    let [incorr, setIncorr]=useState('')
    let naviagte=useNavigate()



const loginBtn=()=>{
    ApiServices.loginUser(body).then(resp =>{
        console.log(resp)
        resp.token && setToken('mytoken',resp.token)
        resp.token && setToken('name',resp.username)
    } ).catch(error=> console.log(error))
    if(!token['mytoken']){
        setIncorr(incorr=<div className="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
        <svg className="flex-shrink-0 inline w-4 h-4 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
        </svg>
        <span className="sr-only">Info</span>
        <div>
        Incorrect Email or password.
        </div>
      </div>)  
    }
}

useEffect(()=>{
    if(token['mytoken']){
        console.log(token['mytoken'])
        naviagte('/account')
    }
    else{ 
 
    }
},[token])

    
    return (

        <div className=''>
            {/* <Header></Header> */}
            <div className='px-24 py-5 lg:px-52 lg:py-44 w-full h-full lg:overflow-y-hidden' style={{
                position: 'relative',
                backgroundColor: '#A5DBDD',
                textAlign: 'center',
            }}>
                <div className='grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 h-auto w-full mx-auto my-auto'>
                    {/* <h1>THis is Login page</h1> */}
                    <div className='hidden sm:block sm:mb-1'>
                        <img className='h-96 w-full object-cover' src={loginImg} alt="image" />
                    </div>
 

                    <div className="bg-slate-50 flex flex-col justify-center mb-6">
                            <h2 className='text-4xl dark:text-white font-bold text-center mt-8'>Welcome Back</h2>
                            <p>Please Enter your credentials to <span className='font-semibold'>Login</span></p>
                            {incorr}
                            <div className='flex flex-col text-gray-200 py-1 px-12 lg:px-32 mt-1'>
                                <label htmlFor="">User Name</label>
                                <input value={username} onChange={e=>setUsername(e.target.value)}className='rounded-lg bg-gray-700 mt-1 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" />
                            </div>
                            <div className='flex flex-col text-gray-200 py-2 px-12 lg:px-32'>
                                <label htmlFor="">Password</label>
                                <input value={password} onChange={e=>setPwd(e.target.value) }className='rounded-lg bg-gray-700 mt-1 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" />
                            </div>
                            <div className='flex justify-between text-gray-200  py-2 px-12 lg:px-32'>
                                <p><input type="checkbox"/>Remember Me</p>
                                <Link className='font-semibold hover:text-emerald-800 hover:underline' >Forget password</Link>
                            </div>
                            <button className='w-2/5 lg:w-2/4 mx-auto my-5 py-2 bg-cyan-300 shadow-lg shadow-cyan-400/30 hover:bg-teal-400 text-1xl font-semibold rounded-lg' onClick={loginBtn}>Log in</button>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default LoginPage;
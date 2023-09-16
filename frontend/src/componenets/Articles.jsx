import React from 'react';
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import {useNavigate} from 'react-router-dom'

export default function Articles() {
    const[article, setArticle]=useState([])
    const [token,setToken,removeToken]=useCookies()
    let final_token=token['mytoken']
    let naviagte=useNavigate()
    useEffect(() => {
        fetch('http://127.0.0.1:8000/auth/article/',{
            'method':'GET',
            headers:{
                'Content-Type':'application/json',
                'Authorization':`Token ${final_token}`
            }
        })
        .then(resp => resp.json())
        .then(resp =>final_token && setArticle(resp))
        .catch(error=> console.log(error))
    },[])

    useEffect(()=>{
        if(!token['mytoken']){
            naviagte('/login')
        }
        else{ 
     
        }
    },[token])

    const logout=()=>{
        removeToken(['mytoken'])
        
    }

  return (
      <div> 
      <button type="button" onClick={logout} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Logout</button>
    {article && article.map(val =>{
        return (
            <div key={val.id} className='m-6'>
            <a href="#" className="block max-w-sm p-6  bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{val.title}</h5>
    <p className="font-normal mt-5 text-gray-700 dark:text-gray-400">{val.description}</p>
</a>
</div>
        )
    })}

    </div>
  )
}

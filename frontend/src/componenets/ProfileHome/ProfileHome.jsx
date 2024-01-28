import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState,useEffect } from "react";
import { useCookies } from 'react-cookie';
const ProfileHome = () => {
    const [token,setToken,removeToken]=useCookies();
    let final_token=token['mytoken'];
    useEffect(()=>{
        if(!token['mytoken']){
            naviagte('/login')
        }
        else{ 
     
        }
    },[token])
    const [topicName, setTopicName] = useState("");
    const body = { topicName };
    const naviagte=useNavigate();
    const handleSearch = async () => {
       
        try {
            console.log(body)
            const response = await axios.post('http://127.0.0.1:8000/api/course', body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${final_token}`
                }
            });

            const topicDescription= response.data.topicDescription;
            console.log(topicDescription);
            naviagte("/search",{state:{topicName, topicDescription}})
            // Handle the response data as needed
        } catch (error) {
            console.error(error);
        }
        
    };
    const handleChange = (event) => {
        // Update topicName when the input value changes
        setTopicName(event.target.value);
    };

    return (
        <div>
            <div className="relative w-full xs:w-[460px] max-w-[530px] text-center gap-3 mt-14 mx-auto">
                <input
                    name="Search"
                    type="text"
                    placeholder="Search here"
                    value={topicName} // Bind the value to the state
                    onChange={handleChange} // Handle input changes
                    className="rounded-2xl border-teal-700 border-2 w-full md:w-96 px-4 py-3 md:py-4 bg-primary outline-none text-black text-base md:text-lg font-bold placeholder-teal-700" />
               
                    <button onClick={handleSearch} className="my-5 py-2 md:py-4 px-8 bg-cyan-300 shadow-lg hover:bg-teal-400 text-1xl md:text-2xl font-semibold rounded-2xl">Request a Course</button>
            </div>
        </div>
    );
};

export default ProfileHome;

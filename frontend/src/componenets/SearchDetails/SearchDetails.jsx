// import React from 'react';

import { Link, useLocation } from "react-router-dom";
import axios from 'axios';
const SearchDetails = () => {
    const location = useLocation();
    console.log(location);
    const topicName=location.state.topicName;
    const topicDescription=location.state.topicDescription;
    const finalToken = "03d6ac38c60d140670df7c098d588451ecbc69c3";
    const handleRequest = async () => {
        const username="souravk";
        
        const body = { topicName, username };
        const body2={topicName};

       
        try {
            console.log(body)
            const response = await axios.post('http://127.0.0.1:8000/api/user-course', body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${finalToken}`
                }
            });
            console.log(response);
            // Handle the response data as needed
            const response2 = await axios.post('http://127.0.0.1:8000/api/sub-add', body2, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${finalToken}`
                }
            });
            console.log(response2);

        } catch (error) {
            console.error(error);
        }
        
    };
 

    return (
        <div className="h-screen relative flex flex-col items-center justify-center" 
        style={{backgroundColor: '#f0f0f5', textAlign: 'center'}}>
            <div className="relative w-full max-w-[1590px] flex flex-col
            items-start justify-between py-5 mx-auto px-5 border-2 border-solid border-black rounded-xl hover:border-3 hover:shadow-lg">
                <div className="flex flex-row items-center  gap-3">
                    <h3 className="text-2xl font-semibold">Course Name:</h3>
                    <p className="text-xl font-medium">{topicName}</p>
                </div>
                <div className="flex flex-row  gap-7 mt-3">
                    <h3 className="text-2xl font-semibold">Discription: </h3>
                    <p className="text-xl text-left">{topicDescription}</p>
                </div>
                

            </div>
                <div className="flex flex-col items-center">
                <Link to={"/account"}>
                <button onClick={handleRequest} className="my-5 py-4 px-8 bg-cyan-300 shadow-lg shadow-cyan-400/30 bg-transparent hover:bg-teal-500 text-1xl font-semibold rounded-2xl border-2 border-cyan-600/30">Start Learning</button>
                </Link>
                
                </div>
        </div>
    );
};

export default SearchDetails;
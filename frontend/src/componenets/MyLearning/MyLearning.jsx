import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const MyLearning = () => {
  const [courses, setCourses] = useState([]);
  const [token,setToken,removeToken]=useCookies();
  let finalToken=token['mytoken'];
  const username = token['name'];
  useEffect(()=>{
      if(!token['mytoken']){
          naviagte('/login')
      }
      else{ 
   
      }
  },[token])
 


  useEffect(() => {
    const fetchData = async () => {
      

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/course-list', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${finalToken}`
          },
          params: { username: username }
        });
        const verifiedCourses = response.data.data.filter(course => course.verified);
        setCourses(verifiedCourses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-screen overflow-auto p-5 mt-10">
      <div className="relative flex flex-col items-center justify-center" style={{ backgroundColor: '#f0f0f5', textAlign: 'center' }}>
        {courses.map((course, index) => (
          <div key={index} className="relative grid grid-cols-2 items-center w-full max-w-[1590px] py-5 mx-auto px-5 border-2 border-solid border-black rounded-xl hover:border-3 hover:shadow-lg mb-4">
            <div>
              <h3 className='text-2xl font-medium'>{course.topicName}</h3>
              {/* Additional information about the course can be displayed here */}
            </div>
            <div>
              {/* Update the link to include the course.topicName as a URL parameter */}
              <Link to={`/startlearning?topicName=${encodeURIComponent(course.topicName)}`}>
                <button className='py-1 md:py-2 px-8 bg-cyan-400 shadow-lg hover:bg-teal-400 text-xl md:text-xl font-semibold rounded-2xl'>Go to Course</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyLearning;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MyLearning = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const username = "souravk";
      const finalToken = "03d6ac38c60d140670df7c098d588451ecbc69c3";

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/course-list', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${finalToken}`
          },
          params: { username: username }
        });

        setCourses(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div >
      <div className=" h-screen relative flex flex-col items-center justify-center" style={{ backgroundColor: '#f0f0f5', textAlign: 'center' }}>
        {courses.map((course, index) => (
          <div key={index} className="relative grid grid-cols-2 items-center w-full max-w-[1590px] py-5 mx-auto px-5 border-2 border-solid border-black rounded-xl hover:border-3 hover:shadow-lg mb-4">
            <div>
              <h3 className='text-2xl font-medium'>{course.topicName}</h3>
              {/* Additional information about the course can be displayed here */}
            </div>
            <div>
              <Link to={`/course/${course.id}`}>
                <button className='py-1 md:py-2 px-8 bg-cyan-400 shadow-lg hover:bg-teal-400 text-xl md:text-xl font-semibold rounded-2xl'>Go to Course</button>
              </Link>
            </div>
          </div>
        ))}

        {/* Uncomment and customize the following section if you want to add a new course */}
        {/* <button onClick={addCourse} className='mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded'>Add New Course</button> */}
      </div>
    </div>
  );
};

export default MyLearning;

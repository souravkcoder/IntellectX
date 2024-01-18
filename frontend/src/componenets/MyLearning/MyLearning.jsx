import { useState } from 'react';
import { Link } from 'react-router-dom';

const MyLearning = () => {
  const [courses, setCourses] = useState([]);

  const addCourse = () => {
    const newCourse = `Course ${courses.length + 1}`;
    setCourses([...courses, newCourse]);
  };

  return (
    <div>
      <div className="h-screen relative flex flex-col items-center justify-center" style={{ backgroundColor: '#f0f0f5', textAlign: 'center' }}>
        {courses.map((course, index) => (
          <div key={index} className="relative grid grid-cols-2 items-center w-full max-w-[1590px]  py-5 mx-auto px-5 border-2 border-solid border-black rounded-xl hover:border-3 hover:shadow-lg">
            <div>
              <h3 className='text-2xl font-medium'>{course}</h3>
            </div>
            <div>
              <Link to={`/course/${index + 1}`}>
                <button className='py-1 md:py-2 px-8 bg-cyan-400 shadow-lg hover:bg-teal-400 text-xl md:text-xl font-semibold rounded-2xl'>Go to Course</button>
              </Link>
            </div>
          </div>
        ))}

        <button onClick={addCourse} className='mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded'>Add New Course</button>
      </div>
    </div>
  );
};

export default MyLearning;

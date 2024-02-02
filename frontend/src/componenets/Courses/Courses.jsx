import axios from 'axios';
import { useEffect, useState } from 'react';

const Courses = () => {
    const [courses, setCourses] = useState([]);

    const getApiData = async () => {
        try {
            const res = await axios.get('courses.json');
            setCourses(res.data.courses);
            // console.log(res.data.courses[0]);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getApiData();
    }, []);

    return (
        <div className="container mx-auto mt-24 p-4">
            <h2 className="text-3xl font-bold mb-12 mx-auto">Top Courses</h2>
            <div className="grid grid-cols-3 gap-8">
                {courses.map((course) => {
                    const { id, title, picture_url, description } = course;
                    return (
                        <div
                            className="border border-teal-400 p-4 rounded-lg text-left max-w-[400px]"
                            key={id}
                        >
                            <img
                                className="h-48 w-80 mb-2 object-cover rounded"
                                src={picture_url}
                                alt=""
                            />
                            <h2 className="text-lg font-bold mb-2">Name: {title}</h2>
                            <p className="text-base">
                                <span className="text-lg font-semibold">Description:</span>{' '}
                                {description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Courses;

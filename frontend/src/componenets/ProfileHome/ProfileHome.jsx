import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useCookies } from 'react-cookie';

const ProfileHome = () => {
    const [token, setToken, removeToken] = useCookies();
    let final_token = token['mytoken'];
    const [loading, setLoading] = useState(false); 
    const [topicName, setTopicName] = useState("");
    const body = { topicName };
    const navigate = useNavigate();

    useEffect(() => {
        if (!token['mytoken']) {
            navigate('/login');
        }
    }, [token]);

    const handleSearch = async () => {
        setLoading(true); 
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/course', body, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${final_token}`
                }
            });

            const topicDescription = response.data.topicDescription;
            navigate("/search", { state: { topicName, topicDescription } });
        } catch (error) {
            
        } finally {
            setLoading(false); 
        }
    };

    const handleChange = (event) => {
        setTopicName(event.target.value);
    };

    return (
        <div>
            <div className="relative w-full xs:w-[460px] max-w-[530px] text-center gap-3 mt-14 mx-auto">
                <input
                    name="Search"
                    type="text"
                    placeholder="Search here"
                    value={topicName}
                    onChange={handleChange}
                    className="rounded-2xl border-teal-700 border-2 w-full md:w-96 px-4 py-3 md:py-4 bg-primary outline-none text-black text-base md:text-lg font-bold placeholder-teal-700" />
                
                <button onClick={handleSearch} className="my-5 py-2 md:py-4 px-8 bg-cyan-300 shadow-lg hover:bg-teal-400 text-1xl md:text-2xl font-semibold rounded-2xl">
                    {loading ? (
                       
                        "Please Wait..."
                    ) : (
                        "Request a Course"
                    )}
                </button>
            </div>
        </div>
    );
};

export default ProfileHome;

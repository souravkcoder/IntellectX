import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import avatarImage from '../../images/avator.jpg'; // Replace with the actual path

const Profile = () => {
    const [user, setUser] = useState({
        name: 'John Doe',
        avatar: avatarImage,
    });
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = () => {
                setUser({ ...user, avatar: reader.result });
            };
            reader.readAsDataURL(file);
        } else {
            setImage(null);
        }
    };

    return (
        <div className="h-screen w-full flex flex-col items-center">

            {/* Header */}
            <div className="w-full flex items-center justify-between pt-5 mx-auto px-5 py-6" style={{ backgroundColor: '#407C87' }}>
                <h1 className="text-left text-4xl font-extrabold text-white">InTeLLectX</h1>
                <div className="flex  flex-col items-center gap-3">
                    <img className="h-20 w-20 rounded-full border-2" src={user.avatar} alt="User Avatar" />

                    <label htmlFor="" className='font-semibold text-2xl'>{user.name}</label>

                    <InputText
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="text-white border-2 rounded-md"
                    />

                </div>
            </div>

            {/* Rest of the content */}
            <div className="flex-grow w-full" style={{ backgroundColor: '#f5f5fa' }}>

                {/* Options for Courses */}
                <div className="relative w-full flex items-center justify-center pt-10 mx-auto px-20">
                    <ul className="hidden md:flex items-center gap-8 lg:gap-10">
                        <Link to='/account/pHome'>
                            <h5 className="text-xl md:text-2xl font-semibold text-black cursor-pointer hover:text-teal-400 hover:underline">Home</h5>
                        </Link>
                        <Link to='/account/mylearning'>
                            <h5 className="text-xl md:text-2xl font-semibold text-black cursor-pointer hover:text-teal-400 hover:underline">My Learning</h5>
                        </Link>
                        
                    </ul>
                </div>


                <Outlet></Outlet>
                {/* Search Button */}
                {/* <div className="relative w-full xs:w-[460px] max-w-[530px] text-center gap-3 mt-14 mx-auto">
                    <input
                        name= "Search"
                        type="text" 
                        placeholder="Search here"
                        className="rounded-2xl border-teal-700 border-2 w-full md:w-96 px-4 py-3 md:py-4 bg-primary outline-none text-black text-base md:text-lg font-bold placeholder-teal-700" />
                    <Link to="/search">
                        <button className="my-5 py-2 md:py-4 px-8 bg-cyan-300 shadow-lg hover:bg-teal-400 text-1xl md:text-2xl font-semibold rounded-2xl">Request a Course</button>
                    </Link>
                </div> */}
            </div>
        </div>
    );
};

export default Profile;

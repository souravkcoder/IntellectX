import { Link } from "react-router-dom";



const ProfileHome = () => {
    return (
        <div>
            {/* <h3>Profile Home</h3> */}
              <div className="relative w-full xs:w-[460px] max-w-[530px] text-center gap-3 mt-14 mx-auto">
                    <input
                        name= "Search"
                        type="text" 
                        placeholder="Search here"
                        className="rounded-2xl border-teal-700 border-2 w-full md:w-96 px-4 py-3 md:py-4 bg-primary outline-none text-black text-base md:text-lg font-bold placeholder-teal-700" />
                    <Link to="/search">
                        <button className="my-5 py-2 md:py-4 px-8 bg-cyan-300 shadow-lg hover:bg-teal-400 text-1xl md:text-2xl font-semibold rounded-2xl">Request a Course</button>
                    </Link>
                </div>
        
        </div>
    );
};

export default ProfileHome;
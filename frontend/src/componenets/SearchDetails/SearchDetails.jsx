// import React from 'react';

import { Link } from "react-router-dom";

const SearchDetails = () => {
    return (
        <div className="h-screen relative flex flex-col items-center justify-center" 
        style={{backgroundColor: '#f0f0f5', textAlign: 'center'}}>
            <div className="relative w-full max-w-[1590px] flex flex-col
            items-start justify-between py-5 mx-auto px-5 border-2 border-solid border-black rounded-xl hover:border-3 hover:shadow-lg">
                <div className="flex flex-row items-center  gap-3">
                    <h3 className="text-2xl font-semibold">Course Name:</h3>
                    <p className="text-xl font-medium">Python</p>
                </div>
                <div className="flex flex-row  gap-7 mt-3">
                    <h3 className="text-2xl font-semibold">Discription: </h3>
                    <p className="text-xl text-left">Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt totam maiores, alias consectetur ratione beatae vel ex tempore iusto quas natus! Vitae magnam quibusdam, reprehenderit velit nemo nulla qui, dolorum ab unde deserunt doloremque facere molestias maxime ea consectetur, animi placeat quod! Voluptatum ea ex soluta ab assumenda hic ut ipsa praesentium id? Ipsa amet sit deleniti hic mollitia illum voluptatibus minus! Quos, commodi. Neque aperiam magni hic expedita quo ab, earum enim, veritatis dolore molestiae debitis reiciendis libero quis error temporibus reprehenderit asperiores amet facere sequi non odio. Libero, vero odit nobis dolorem exercitationem fugit ipsum culpa adipisci dolor?</p>
                </div>
                

            </div>
                <div className="flex flex-col items-center">
                <Link><button className="my-5 py-4 px-8 bg-cyan-300 shadow-lg shadow-cyan-400/30 bg-transparent hover:bg-teal-500 text-1xl font-semibold rounded-2xl border-2 border-cyan-600/30">Start Learning</button></Link>
                </div>
        </div>
    );
};

export default SearchDetails;
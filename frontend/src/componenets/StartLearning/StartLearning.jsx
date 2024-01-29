// import React from 'react';

// import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown, } from '@fortawesome/free-solid-svg-icons'
import { useState } from 'react';

const StartLearning = () => {
    // const [show, setShow] = useState(false);
    const [showTopic1, setShowTopic1] = useState(false);
    const [showTopic2, setShowTopic2] = useState(false);
    
    return (
        <div className="h-auto relative flex flex-col "
            style={{ backgroundColor: '#f0f0f5', textAlign: 'center' }}>
            {
                <div>
                    <div className="relative w-full flex flex-col
                        items-start justify-between gap-3 py-5 mx-auto px-5 border-2 border-solid border-black rounded-xl hover:border-3 hover:shadow-lg">
                        <div className="flex flex-row justify-center items-center  gap-3 border-1 border-solid rounded-md w-full p-5">
                            <h3 className="text-2xl font-semibold">Course Name:</h3>
                            <p className="text-xl font-bold">Topic</p>
                        </div>



                        <div className="flex flex-row items-center  gap-3 border-1 border-solid bg-slate-400 rounded-md w-full p-5">
                            <button onClick={() => setShowTopic1(!showTopic1)}><FontAwesomeIcon icon={faChevronDown} className='me-4' /></button>
                            <h3 className="text-2xl font-semibold">Subtopic-1</h3>
                            <p className="text-xl font-medium">Topic</p>
                        </div>
                        {
                            showTopic1 && <div className="flex flex-row  gap-5 mt-3">
                                <h3 className="text-2xl font-semibold">Discription: </h3>
                                <p className="text-xl text-left">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime eveniet a obcaecati amet expedita, reiciendis adipisci soluta itaque provident nobis, odit ratione magni. Distinctio aliquam, a voluptas dignissimos libero, facere officia explicabo tenetur ipsa corrupti illum veritatis quasi. Quos nam iure consequuntur quisquam, quibusdam voluptatem dolorum itaque voluptatibus perspiciatis delectus rerum quo sapiente inventore amet minus nesciunt ipsum odio. Sit sunt officiis ut magnam iure facere assumenda tempore ad accusamus eaque voluptatum autem provident placeat, dolores repellat minus doloribus officia vel ea unde soluta minima sed. Nobis fugit, at voluptate sit praesentium totam dolores dignissimos est, sint ipsa debitis similique!</p>
                            </div>
                        }




            <div className="flex flex-row items-center  gap-3 border-1 border-solid bg-slate-400 rounded-md w-full p-5">
              <button onClick={() => setSelectedSubtopic(selectedSubtopic === index ? null : index)}>
                <FontAwesomeIcon icon={faChevronDown} className='me-4' />
              </button>
              <h3 className="text-2xl font-semibold">{subtopic.subtopicsName}</h3>
            </div>
            {selectedSubtopic === index && (
              <div className="flex flex-row  gap-5 mt-3">
                <h3 className="text-2xl font-semibold">Description: </h3>
                <pre className=" font-sans text-xl text-left whitespace-pre-wrap">
                  {subtopic.subtopicDescription.split('\r\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </pre>
              </div>
            {
                            showTopic2 && <div className="flex flex-row  gap-5 mt-3">
                                <h3 className="text-2xl font-semibold">Discription: </h3>
                                <p className="text-xl text-left">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maxime eveniet a obcaecati amet expedita, reiciendis adipisci soluta itaque provident nobis, odit ratione magni. Distinctio aliquam, a voluptas dignissimos libero, facere officia explicabo tenetur ipsa corrupti illum veritatis quasi. Quos nam iure consequuntur quisquam, quibusdam voluptatem dolorum itaque voluptatibus perspiciatis delectus rerum quo sapiente inventore amet minus nesciunt ipsum odio. Sit sunt officiis ut magnam iure facere assumenda tempore ad accusamus eaque voluptatum autem provident placeat, dolores repellat minus doloribus officia vel ea unde soluta minima sed. Nobis fugit, at voluptate sit praesentium totam dolores dignissimos est, sint ipsa debitis similique!</p>
          </div>
        }
      </div>


    </div>
}
        </div >
  );
};

export default StartLearning;
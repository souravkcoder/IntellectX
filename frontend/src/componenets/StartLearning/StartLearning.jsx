import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const StartLearning = () => {
  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const topicName = param.get('topicName');

  const [subtopics, setSubtopics] = useState([]);
  const [selectedSubtopic, setSelectedSubtopic] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const finalToken = "03d6ac38c60d140670df7c098d588451ecbc69c3";

      try {
        const response = await axios.get('http://127.0.0.1:8000/api/fullcourse', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${finalToken}`
          },
          params: { topicName: topicName }
        });
        setSubtopics(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [topicName]);

  return (
    <div className="h-auto relative flex flex-col " style={{ backgroundColor: '#f0f0f5', textAlign: 'center' }}>
      <div className="relative w-full flex flex-col items-start justify-between gap-3 py-5 mx-auto px-5 border-2 border-solid border-black rounded-xl hover:border-3 hover:shadow-lg">
        <div className="flex flex-row justify-center items-center  gap-3 border-1 border-solid rounded-md w-full p-5">
          <h3 className="text-2xl font-semibold">Course Name:</h3>
          <p className="text-xl font-bold">{topicName}</p>
        </div>
        {subtopics.map((subtopic, index) => (
          <div key={index} className='w-full'>
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartLearning;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface ImageData {
  title: string;
  url: string;
  explanation: string;
}

const DashBoard: React.FC = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    const fetchImageData = async () => {
      const response = await axios.get<ImageData>('https://api.nasa.gov/planetary/apod', {
        params: {
          api_key: process.env.NEXT_PUBLIC_KEY
        }
      });
      setImageData(response.data);
      console.log(response.data)
    };
    fetchImageData();
  }, []);

  if (!imageData) return <div className='p-4 font:bold text-xl'>Loading...</div>;

  return (
    <div className=" text-white min-h-screen">
      <div className="container mx-auto pt-1 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">
            The Image Of The Day: {imageData.title}
          </h1>
        </div>

        <div className="flex pt-2 justify-center md:justify-around">

          <img
            src={imageData.url}
            alt={imageData.title}
            className="w-full md:w-4/5 lg:w-1/2 rounded-lg shadow-lg"
          />
        </div>

        <div className="mt-8 pl-4 sm:pl-10 pr-4 sm:pr-10">
          <p className="pt-2 text-lg">{imageData.explanation}</p>
        </div>
      </div>
    </div>



  );
};

export default DashBoard
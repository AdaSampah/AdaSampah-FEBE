import React, { useState, useEffect } from 'react';
import Map from '../../utils/map';  // Ensure this is correctly importing from utils/map

const PetaPage = () => {
  const [map, setMap] = useState(null);

  const initialMap = async () => {
    const mapInstance = await Map.createMap('#map', {
      zoom: 10,  
      center: [-7.7944973, 110.4070047],  
      locate: true,
    });

    setMap(mapInstance); 
  };

  useEffect(() => {
    initialMap();
  }, []);  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 ">
      <section className="w-full max-w-4xl p-5 z-10">
        <div className="reports-list__map__container">
          <div 
            id="map" 
            className="reports-list__map m-5 border-2 border-gray-300 rounded-lg shadow-lg" 
            style={{ height: 'calc(100vh - 2rem)', width: '100%' }} 
          ></div>
        </div>
      </section>
    </div>
  );
};

export default PetaPage;

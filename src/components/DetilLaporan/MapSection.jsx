// MapSection.jsx
import React, { useEffect, useRef, useState } from "react";
import { createMap, addMarker, getPlaceNameByCoordinate } from "../../utils/map";

const MapSection = ({ latitude, longitude }) => {
  const mapInstanceRef = useRef(null);
  const [placeName, setPlaceName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const mapId = `map-${Math.random().toString(36).substr(2, 9)}`; // Generate unique ID

  useEffect(() => {
    // Pastikan latitude dan longitude valid
    if (!latitude || !longitude) {
      setIsLoading(false);
      return;
    }

    const initializeMap = async () => {
      try {
        // Inisialisasi peta menggunakan createMap dengan selector ID
        if (!mapInstanceRef.current) {
          const mapSelector = `#${mapId}`;

          mapInstanceRef.current = createMap(mapSelector, {
            center: [parseFloat(latitude), parseFloat(longitude)],
            zoom: 15,
            scrollWheelZoom: true,
          });

          // Tambahkan marker untuk posisi sampah
          addMarker(
            mapInstanceRef.current,
            [parseFloat(latitude), parseFloat(longitude)],
            {
              alt: "Lokasi Sampah",
            },
            {
              closeButton: true,
              autoClose: false,
            }
          );
        }

        // Dapatkan nama tempat berdasarkan koordinat
        const name = await getPlaceNameByCoordinate(latitude, longitude);
        setPlaceName(name);
      } catch (error) {
        console.error("Error initializing map:", error);
        setPlaceName(`${latitude}, ${longitude}`);
      } finally {
        setIsLoading(false);
      }
    };

    // Delay untuk memastikan DOM sudah ter-render
    const timer = setTimeout(() => {
      initializeMap();
    }, 100);

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, mapId]);

  // Jika tidak ada koordinat
  if (!latitude || !longitude) {
    return (
      <div className="w-full bg-white rounded-lg shadow-md p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">Lokasi Sampah</h4>
        <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
          <p className="text-gray-500">Koordinat tidak tersedia</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full cardKu shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] bg-white rounded-lg mt-8 overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Lokasi Sampah</h4>
        <div className="space-y-1">
          <p className="text-sm text-gray-600">
            <span className="font-medium">Koordinat:</span> {latitude}, {longitude}
          </p>
          {isLoading ? (
            <p className="text-sm text-gray-500">Memuat nama tempat...</p>
          ) : (
            <p className="text-sm text-gray-600">
              <span className="font-medium">Lokasi:</span> {placeName}
            </p>
          )}
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div id={mapId} className="w-full h-72 md:h-96 z-10" style={{ minHeight: "256px" }} />

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
              <span className="text-gray-600">Memuat peta...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapSection;

import React, { useState, useEffect } from "react";
import Map from "../../utils/map"; // Memastikan ini diimpor dengan benar
import { axiosInstance } from "../../config"; // Import axiosInstance

const PetaPage = () => {
  const [map, setMap] = useState(null);
  const [laporanData, setLaporanData] = useState([]); // State untuk data laporan dari API
  const [isLoading, setIsLoading] = useState(true); // State untuk menampilkan spinner loading

  // Inisialisasi peta
  const initialMap = async () => {
    setIsLoading(true);
    const mapInstance = await Map.createMap("#map", {
      zoom: 11,
      center: [-7.7944973, 110.4070047],
      locate: true,
    });

    setMap(mapInstance);
    console.log("Peta sudah diinisialisasi"); // Debugging peta terinisialisasi
    addMarkers(mapInstance);
    setIsLoading(false);
  };

  // Memanggil data laporan dari backend
  const fetchLaporanData = async () => {
    try {
      const response = await axiosInstance.get("/reports"); // Gantilah dengan endpoint yang sesuai
      setLaporanData(response.data.data);
    } catch (error) {
      console.error("Error fetching laporan data:", error);
    }
  };

  const addMarkers = (mapInstance) => {
    laporanData.forEach((laporan) => {
      const lat = parseFloat(laporan.lat);
      const lon = parseFloat(laporan.lon);

      if (!isNaN(lat) && !isNaN(lon)) {
        // Hanya popup, tanpa tooltip
        const popupContent = `
          <div style="min-width:120px">
            <b>${laporan.location || "Lokasi tidak diketahui"}</b><br/>
            <a href="/laporan/${
              laporan._id
            }" style="color:#129990;text-decoration:underline;">Lihat Detail</a>
          </div>
        `;
        Map.addMarker(
          mapInstance,
          [lat, lon],
          {}, // hilangkan alt agar tidak ada tooltip
          {
            autoClose: true,
            closeOnClick: true,
            className: "custom-popup",
            content: popupContent,
          }
        );
      } else {
        console.log(
          `Koordinat tidak valid untuk laporan dengan ID: ${laporan.id}`
        );
      }
    });
  };

  useEffect(() => {
    initialMap();
    fetchLaporanData(); // Memanggil API saat komponen pertama kali dimuat
  }, []);

  useEffect(() => {
    if (map && laporanData.length > 0) {
      addMarkers(map); // Menambahkan marker setelah data tersedia
    }
  }, [map, laporanData]);

  return (
    <div className="flex justify-center items-center min-h-0 md:min-h-[80vh] lg:min-h-screen bg-gray-100 py-2 md:py-6 lg:py-10">
      <section className="w-full max-w-6xl px-1 sm:px-2 md:px-4 lg:px-6 py-2 md:py-6 lg:py-10 z-10">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-extrabold text-black mb-6 tracking-tight drop-shadow-sm">
          Peta Sebaran
        </h2>
        <div className="reports-list__map__container relative">
          <div
            id="map"
            className="reports-list__map mx-auto border-2 border-gray-300 rounded-lg shadow-lg min-h-[180px] sm:min-h-[220px] md:min-h-[400px] lg:min-h-[520px] xl:min-h-[600px] h-[50vw] md:h-[32vw] lg:h-[28vw] max-h-[700px] w-full aspect-[3/1]"
          ></div>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-20">
              <div className="flex items-center space-x-2">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#129990]" />
                <span className="text-[#129990] font-semibold">
                  Memuat peta...
                </span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PetaPage;

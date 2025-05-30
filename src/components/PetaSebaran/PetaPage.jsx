import React, { useState, useEffect } from 'react';
import Map from '../../utils/map';  // Memastikan ini diimpor dengan benar
import dummyLaporan from './dummyLaporan'; // Import dummy data

const PetaPage = () => {
  const [map, setMap] = useState(null);

  // Inisialisasi peta
  const initialMap = async () => {
    const mapInstance = await Map.createMap('#map', {
      zoom: 10,
      center: [-7.7944973, 110.4070047],
      locate: true,
    });

    setMap(mapInstance); 
    addMarkers(mapInstance);
  };

  // Fungsi untuk menambahkan markers berdasarkan data dummy
  const addMarkers = (mapInstance) => {
    dummyLaporan.forEach((laporan) => {
      // Mengonversi lat dan lon ke angka menggunakan parseFloat
      const lat = parseFloat(laporan.lat);
      const lon = parseFloat(laporan.lon);

      // Debug: Menampilkan koordinat untuk pengecekan
      console.log(`Memeriksa marker dengan lat: ${lat}, lon: ${lon}`);

      // Pastikan lat dan lon valid
      if (!isNaN(lat) && !isNaN(lon)) {
        Map.addMarker(mapInstance, [lat, lon], 
          {
            alt: laporan.kabupaten,  // Kategori digunakan sebagai label di marker dan di pop-up
          }, 
          `
            <b>${laporan.nama}</b><br>
            ${laporan.kategori}<br>
            ${laporan.deskripsi}<br>
            <img src="${laporan.foto}" alt="Foto Laporan" width="100" />
          `
        );
      } else {
        console.log(`Koordinat tidak valid untuk laporan dengan ID: ${laporan.id}`);
      }
    });
  };

  // Fungsi untuk menangani penambahan marker baru ketika data baru ditambahkan
  const addNewMarker = (newData) => {
    if (map) {
      const lat = parseFloat(newData.lat);
      const lon = parseFloat(newData.lon);

      // Pastikan lat dan lon valid
      if (!isNaN(lat) && !isNaN(lon)) {
        Map.addMarker(map, [lat, lon], 
          {
            alt: newData.kategori,  // Menambahkan kategori pada marker baru
          }, 
          `
            <b>${newData.nama}</b><br>
            ${newData.kategori}<br>
            ${newData.deskripsi}<br>
            <img src="${newData.foto}" alt="Foto Laporan" width="100" />
          `
        );
      } else {
        console.log(`Koordinat tidak valid untuk laporan baru dengan ID: ${newData.id}`);
      }
    }
  };

   // Inisialisasi peta saat komponen dimuat
  useEffect(() => {
    initialMap();
  }, []);  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
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

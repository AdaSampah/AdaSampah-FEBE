import React, { useEffect, useState } from "react";
import BarChartY from "./BarChartY";
import { axiosInstance } from "../../config"; // Import axiosInstance

const StatsSec3 = () => {
  const [topKabupatens, setTopKabupatens] = useState([]);
  const [semuaData, setSemuaData] = useState([]); // Menyimpan data yang didapat dari API

  useEffect(() => {
    // Memanggil data dari backend saat komponen pertama kali di-render
    fetchLaporanData();
  }, []);

  // Fungsi untuk mengambil data dari backend
  const fetchLaporanData = async () => {
    try {
      const response = await axiosInstance.get("/reports"); // Gantilah dengan endpoint yang sesuai
      setSemuaData(response.data.data);
      console.log(semuaData)
    } catch (error) {
      console.error("Error fetching laporan data:", error);
    }
  };

  useEffect(() => {
    // Hanya memanggil findTopKabupatens jika data sudah diterima
    if (semuaData.length > 0) {
      findTopKabupatens(semuaData);
            console.log(semuaData)

    }
  }, [semuaData]);

  // Fungsi untuk menghitung kabupaten dengan laporan terbanyak
  function findTopKabupatens(data) {
    const kabupatenCounts = {};

    // Memeriksa apakah data memiliki struktur yang benar
    data.forEach((entry) => {
      const kabupaten = entry.regency; // Memastikan mengambil 'regency' langsung dari objek
      if (kabupaten) {
        kabupatenCounts[kabupaten] = (kabupatenCounts[kabupaten] || 0) + 1;
      }
    });

    // Mengubah data menjadi array dan mengurutkannya berdasarkan jumlah laporan
    const sortedKabupatens = Object.entries(kabupatenCounts).sort(
      (a, b) => b[1] - a[1]
    );

    // Mengambil 5 kabupaten teratas
    const topKabupatens = sortedKabupatens.slice(0, 5); // Ubah menjadi 5
    setTopKabupatens(topKabupatens);
  }

  // Menyusun data untuk grafik (BarChartY)
  const chartData = topKabupatens.map(([kabupaten, jumlah]) => [
    kabupaten,
    jumlah,
  ]);

  return (
    <section>
      <div className="md:px-32 sm:px-6 px-3 lg:py-40 md:py-15 sm:py-10 py-8">
        <h3 className="text-center 2xl:text-[52px] sm:text-[42px] text-2xl font-extrabold mb-10">
          Laporan Aktivitas Laporan Sampah
        </h3>

        <div className="flex flex-col lg:flex-row flex-wrap lg:gap-8 gap-6 justify-around items-center">
          {/* BarChartY menerima data yang sudah diproses */}
          <BarChartY data={chartData} />

          {/* Menampilkan statistik berdasarkan topKabupatens */}
          <p className="2xl:text-[18px] text-normal font-medium w-full max-w-[400px] text-center lg:text-left mt-4 lg:mt-0">
            Statistik menyatakan bahwa kabupaten dengan laporan aktivitas 
            laporan sampah terbanyak adalah{" "}
            {topKabupatens.map((kabupaten, index) => (
              <span key={index}>
                <b>{kabupaten[0]}</b> dengan jumlah laporan {kabupaten[1]}
                {index !== topKabupatens.length - 1 && ", "}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
};

export default StatsSec3;

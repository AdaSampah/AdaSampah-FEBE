import React, { useEffect, useState } from "react";
import BarChartY from "./BarChartY";
import dummyLaporan from "./dummyLaporan"; // Import data dummy Anda

const StatsSec3 = () => {
  const [topKabupatens, setTopKabupatens] = useState([]);
  const [semuaData, setSemuaData] = useState(dummyLaporan); // Menggunakan data dummy

  useEffect(() => {
    findTopKabupatens(semuaData);
  }, [semuaData]);

  function findTopKabupatens(data) {
    const kabupatenCounts = {};

    // Menghitung jumlah laporan berdasarkan kabupaten
    data.forEach((entry) => {
      const kabupaten = entry.kabupaten; // Ambil data kabupaten
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

  // Debugging: Cetak data yang akan dikirim ke BarChartY
  console.log("Top Kabupatens:", topKabupatens);

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
            laporan sampah adalah{" "}
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

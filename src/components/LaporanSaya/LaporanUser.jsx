import React, { useContext, useEffect, useState } from "react";
import { axiosInstance } from "../../config"; // import instance axios

import Card from "../Laporan/Card";
import SkeletonCard from "../Skeleton/SkeletonCard";
import { UserContext } from "../../context/UserContext";

export default function LaporanUser() {
  const [laporan, setLaporan] = useState([]);
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [urutkan, setUrutkan] = useState("Terbaru");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { user } = useContext(UserContext); // ambil user dari context
  const userId = user?.userId; // asumsi userId ada di dalam user object

  useEffect(() => {
    const fetchLaporan = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const response = await axiosInstance.get(`/reports/user/${userId}`, { withCredentials: true });

        if (response.data.status === "success") {
          let filteredData = response.data.data;

          // Filter berdasarkan status
          if (filterStatus !== "Semua") {
            filteredData = filteredData.filter((item) => item.status === filterStatus);
          }

          // Urutkan berdasarkan createdAt
          filteredData.sort((a, b) => {
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            return urutkan === "Terbaru" ? dateB - dateA : dateA - dateB;
          });

          setLaporan(filteredData);
        }
      } catch (err) {
        console.error("Error fetching reports:", err);
        setError("Gagal memuat laporan. Silakan coba lagi nanti.");
      } finally {
        setLoading(false);
      }
    };

    fetchLaporan();
  }, [userId, filterStatus, urutkan]);

  // Hitung jumlah laporan per status
  const countByStatus = (status) => laporan.filter((item) => item.status === status).length;

  if (loading) {
    return (
      <div className="cardContainer flex flex-wrap justify-center gap-8 mt-6 mb-20">
        {[...Array(3)].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <section className="xl:px-36 lg:px-32 md:px-32 sm:px-10 px-4">
      <div className="flex flex-wrap justify-between">
        {/* FILTER DAN SORT */}
        <div className="my-2 flex md:gap-8 gap-3">
          <div>
            <label htmlFor="filter" className="font-bold md:text-base text-sm">
              Filter:
            </label>
            <select name="filter" id="filter" className="lg:ml-2 focus:outline-none border-[1px] border-gray-500 rounded-md py-1 lg:px-4 px-2 md:text-base text-sm" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
              <option value="Semua">Semua</option>
              <option value="Belum Ditindaklanjut">Belum Ditindaklanjut</option>
              <option value="Diverifikasi">Diverifikasi</option>
              <option value="Diproses">Diproses</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
          <div>
            <label htmlFor="urutkan" className="font-bold md:text-base text-sm">
              Urutkan:
            </label>
            <select name="urutkan" id="urutkan" className="lg:ml-2 focus:outline-none border-[1px] border-gray-500 rounded-md py-1 lg:px-4 px-2 md:text-base text-sm" value={urutkan} onChange={(e) => setUrutkan(e.target.value)}>
              <option value="Terbaru">Terbaru</option>
              <option value="Terlama">Terlama</option>
            </select>
          </div>
        </div>

        {/* RINGKASAN STATUS LAPORAN */}
        <div className="flex lg:gap-10 gap-6 lg:mt-0 mt-4">
          <div className="text-center">
            <p className="md:text-body text-base font-semibold">Diverifikasi</p>
            <p className="font-bold text-[#0084FF] lg:text-4xl sm:text-3xl text-2xl">{countByStatus("Diverifikasi")}</p>
          </div>
          <div className="text-center">
            <p className="md:text-body text-base font-semibold">Diproses</p>
            <p className="font-bold text-[#C9AE17] lg:text-4xl sm:text-3xl text-2xl">{countByStatus("Diproses")}</p>
          </div>
          <div className="text-center">
            <p className="md:text-body text-base font-semibold">Selesai</p>
            <p className="font-bold text-[#53A88C] lg:text-4xl sm:text-3xl text-2xl">{countByStatus("Selesai")}</p>
          </div>
        </div>
      </div>

      {/* DAFTAR LAPORAN */}
      <div className="cardContainer flex flex-wrap justify-center gap-8 mt-6 mb-20">
        {laporan.length > 0 ? laporan.map((item) => <Card dataSampah={item} key={item._id} />) : <p className="text-center w-full text-gray-500">Tidak ada laporan ditemukan.</p>}
      </div>
    </section>
  );
}

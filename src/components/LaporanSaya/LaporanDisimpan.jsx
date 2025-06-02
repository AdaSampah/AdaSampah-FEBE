import React, { useContext, useEffect, useState } from "react";
import Card from "../Laporan/Card";
import { UserContext } from "../../context/UserContext";
import { axiosInstance } from "../../config";
import SkeletonCard from "../Skeleton/SkeletonCard";

export default function LaporanDisimpan() {
  const { user } = useContext(UserContext);
  const [laporanDisimpan, setLaporanDisimpan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortOption, setSortOption] = useState("Terbaru");

  useEffect(() => {
    const fetchAllReportsAndFilter = async () => {
      try {
        const res = await axiosInstance.get("/reports");
        const semuaLaporan = res.data.data;

        // Filter hanya laporan yang disimpan oleh user saat ini
        const filtered = semuaLaporan?.filter((laporan) => laporan.saved?.includes(user?.userId));

        setLaporanDisimpan(filtered);
      } catch (error) {
        console.error("Gagal mengambil dan memfilter laporan:", error);
      } finally {
        setLoading(false);
      }
    };

    if (user?.userId) {
      fetchAllReportsAndFilter();
    }
  }, [user]);

  // Fungsi sort manual tanpa useMemo
  const getSortedLaporan = () => {
    if (!laporanDisimpan.length) return [];

    const sorted = [...laporanDisimpan];

    sorted.sort((a, b) => {
      const dateA = new Date(a.createdAt || a.updatedAt);
      const dateB = new Date(b.createdAt || b.updatedAt);

      if (sortOption === "Terbaru") {
        return dateB - dateA;
      } else {
        return dateA - dateB;
      }
    });

    return sorted;
  };

  const sortedLaporan = getSortedLaporan();
  // Di dalam LaporanDisimpan.js

  const handleUpdateSavedReport = (reportId, isBookmarked) => {
    if (isBookmarked) {
      // Tambahkan reportId jika disimpan
      const updatedList = laporanDisimpan.map((item) => (item._id === reportId ? { ...item, saved: [...(item.saved || []), user.userId] } : item));
      setLaporanDisimpan(updatedList);
    } else {
      // Hapus reportId jika di-unsave
      const updatedList = laporanDisimpan.filter((item) => item._id !== reportId);
      setLaporanDisimpan(updatedList);
    }
  };

  return (
    <section className="xl:px-36 lg:px-32 md:px-32 sm:px-10 px-4">
      <div className="flex flex-wrap justify-between">
        <div>
          <label htmlFor="urutkan" className="font-bold md:text-base text-sm">
            Urutkan:
          </label>
          <select name="urutkan" id="urutkan" value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="lg:ml-2 focus:outline-none border-[1px] border-gray-500 rounded-md py-1 lg:px-4 px-2 md:text-base text-sm">
            <option value="Terbaru">Terbaru</option>
            <option value="Terlama">Terlama</option>
          </select>
        </div>
      </div>

      <div className="cardContainer flex flex-wrap justify-center gap-8 mt-6 mb-20">
        {loading ? (
          [...Array(3)].map((_, index) => <SkeletonCard key={index} />)
        ) : sortedLaporan.length > 0 ? (
          sortedLaporan.map((item, index) => <Card dataSampah={item} index={index} key={item._id || index} onUpdateSavedReport={handleUpdateSavedReport} />)
        ) : (
          <p>Tidak ada laporan yang disimpan.</p>
        )}
      </div>
    </section>
  );
}

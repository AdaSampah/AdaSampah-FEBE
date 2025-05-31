import React, { useState } from "react";
import HeroLaporan from "../components/Laporan/HeroLaporan";
import LaporanSection from "../components/Laporan/LaporanSection";
import { useEffect } from "react";
import { axiosInstance } from "../config";

export const Laporan = () => {
  const [dataSampah, setDataSampah] = useState([]);

  useEffect(() => {
    const fetchDataSampah = async () => {
      try {
        // 1. Ambil data reports
        const { data } = await axiosInstance.get("/reports");
        const reports = data?.data || [];

        // 2. Ambil semua userId yang unik
        const uniqueUserIds = [...new Set(reports.map((item) => item.userId))];

        // 3. Ambil data user secara paralel dengan Promise.all
        const userPromises = uniqueUserIds.map((id) => axiosInstance.get(`/user/${id}`).then((res) => res.data.data));
        const usersData = await Promise.all(userPromises);

        // 4. Buat mapping userId -> userData
        const userMap = {};
        usersData.forEach((user) => {
          userMap[user._id] = user;
        });

        // 5. Gabungkan data reports dengan data user
        const mergedData = reports.map((report) => {
          const user = userMap[report.userId] || {};
          return {
            ...report,
            username: user.username || "",
            profileUrl: user.profileUrl || "",
          };
        });

        // 6. Set data ke state
        setDataSampah(mergedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDataSampah();
  }, []);
  console.log(dataSampah);
  const [searchParams, setSearchParams] = useState(null);
  return (
    <>
      <HeroLaporan setSearchParams={setSearchParams} />
      <LaporanSection searchParams={searchParams} dataSampah={dataSampah} />
    </>
  );
};

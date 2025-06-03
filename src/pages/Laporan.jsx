import React, { useState } from "react";
import HeroLaporan from "../components/Laporan/HeroLaporan";
import LaporanSection from "../components/Laporan/LaporanSection";
import { useEffect } from "react";
import { axiosInstance } from "../config";
import Pagination from "../components/Laporan/Pagination";

export const Laporan = () => {
  const [dataSampah, setDataSampah] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchDataSampah = async () => {
      try {
        const { data } = await axiosInstance.get("/reports/limit", {
          params: {
            page: currentPage,
            limit: itemsPerPage,
          },
        });

        const reports = data?.data || [];
        const total = data.totalPages;

        const uniqueUserIds = [...new Set(reports.map((item) => item.userId))];
        const userPromises = uniqueUserIds.map((id) => axiosInstance.get(`/user/${id}`).then((res) => res.data.data));
        const usersData = await Promise.all(userPromises);

        const userMap = {};
        usersData.forEach((user) => {
          userMap[user._id] = user;
        });

        const mergedData = reports.map((report) => ({
          ...report,
          username: userMap[report.userId]?.username || "",
          profileUrl: userMap[report.userId]?.profileUrl || "",
        }));

        setDataSampah(mergedData);
        setTotalPages(total);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDataSampah();
  }, [currentPage]);

  const [searchParams, setSearchParams] = useState(null);
  console.log(searchParams);

  return (
    <>
      <HeroLaporan setSearchParams={setSearchParams} />
      <LaporanSection searchParams={searchParams} dataSampah={dataSampah} isLoading={isLoading} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </>
  );
};

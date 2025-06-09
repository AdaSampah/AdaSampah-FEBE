import React, { useEffect, useState } from "react";
import DetailKiri from "../components/DetilLaporan/DetailKiri";
import DetailKanan from "../components/DetilLaporan/DetailKanan";
import MapSection from "../components/DetilLaporan/MapSection";
import { axiosInstance } from "../config";

const DetailLaporan = () => {
  const path = window.location.pathname.split("/")[2];
  const [detailLaporan, setDetailLaporan] = useState(null);

  useEffect(() => {
    const fetchDetailLaporan = async () => {
      try {
        // 1️⃣ Ambil detail report
        const { data: reportRes } = await axiosInstance.get(`/reports/${path}`);
        const report = reportRes?.data;

        // 2️⃣ Ambil data user
        const { data: userRes } = await axiosInstance.get(`/user/${report.userId}`);
        const user = userRes?.data;

        // 3️⃣ Gabungkan data
        const mergedDetail = {
          ...report,
          username: user.username || "",
          profileUrl: user.profileUrl || "",
        };

        setDetailLaporan(mergedDetail);
      } catch (error) {
        console.error("Error fetching detail laporan:", error);
      }
    };
    fetchDetailLaporan();
  }, [path]);

  return (
    <>
      <section className="md:py-[120px] py-[100px] 2xl:px-28 sm:px-16 p-6">
        <h3 className="font-extrabold 2xl:text-[40px] md:text-3xl text-2xl text-center my-6">Detail laporan </h3>
        <div className="max-w-7xl w-full mx-auto ">
          <div className="containerDetail grid lg:grid-cols-2 grid-cols-1 md:gap-8 gap-3">
            <div className="w-full">
              <DetailKiri detailLaporan={detailLaporan} />
            </div>
            <div className="w-full">
              <DetailKanan detailLaporan={detailLaporan} />
            </div>
          </div>

          <MapSection latitude={detailLaporan?.latDetail} longitude={detailLaporan?.lonDetail} />
        </div>
      </section>
    </>
  );
};

export default DetailLaporan;

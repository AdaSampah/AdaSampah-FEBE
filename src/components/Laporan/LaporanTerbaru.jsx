import React from "react";
import Card from "./Card";
import terbaruIcon from "../../assets/Laporan/terbaru.svg";
// import { useState } from "react";
// import { useEffect } from "react";
// import { axiosInstance } from "../../config";

export const LaporanTerbaru = ({ dataSampah }) => {
  // const [dataSampah, setDataSampah] = useState([]);

  // useEffect(() => {
  //   const fetchDataSampah = async () => {
  //     try {
  //       // 1. Ambil data reports
  //       const { data } = await axiosInstance.get("/reports");
  //       const reports = data?.data || [];

  //       // 2. Ambil semua userId yang unik
  //       const uniqueUserIds = [...new Set(reports.map((item) => item.userId))];

  //       // 3. Ambil data user secara paralel dengan Promise.all
  //       const userPromises = uniqueUserIds.map((id) => axiosInstance.get(`/user/${id}`).then((res) => res.data.data));
  //       const usersData = await Promise.all(userPromises);

  //       // 4. Buat mapping userId -> userData
  //       const userMap = {};
  //       usersData.forEach((user) => {
  //         userMap[user._id] = user;
  //       });

  //       // 5. Gabungkan data reports dengan data user
  //       const mergedData = reports.map((report) => {
  //         const user = userMap[report.userId] || {};
  //         return {
  //           ...report,
  //           username: user.username || "",
  //           profileUrl: user.profileUrl || "",
  //         };
  //       });

  //       // 6. Set data ke state
  //       setDataSampah(mergedData);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchDataSampah();
  // }, []);
  // console.log(dataSampah);

  return (
    <>
      <div className="flex items-center mt-12 ">
        <h3 className="md:text-[36px] sm:text-3xl text-2xl font-extrabold sm:mr-4 mr-2">Semua Laporan</h3>
        <img src={terbaruIcon} alt="terbarud" className="lg:w-12 w-6" />
      </div>
      <div className="cardContainer flex flex-wrap justify-start gap-8 mt-12">
        {dataSampah.map((item, index) => {
          return <Card dataSampah={item} index={index} key={index} />;
        })}
      </div>
    </>
  );
};

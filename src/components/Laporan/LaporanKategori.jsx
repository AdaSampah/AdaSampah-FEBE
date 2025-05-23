import React, { useState } from "react";
import Card from "./Card";
import dummyLaporan from "./dummyLaporan";

export const LaporanKategori = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleClick = (index) => {
    setActiveIndex(index);
  };
  return (
    <>
      <div className="flex items-center mt-12 ">
        <h3 className="md:text-[36px] text-2xl font-extrabold mr-4">Laporan Berdasarkan Kategori</h3>
      </div>
      <div className="flex flex-wrap mt-6 sm:gap-4 gap-2">
        <div
          className={`md:text-normal text-smallText font-extrabold px-6  py-4 border-[1px] border-[#D7D9DA] md:rounded-lg rounded-sm cursor-pointer ${activeIndex === 0 ? "border-[#74CAAE] bg-[#E2FFF5]" : "bg-[#F9F9F9]"}`}
          onClick={() => handleClick(0)}
        >
          Sampah
        </div>
        <div
          className={`md:text-normal text-smallText font-extrabold px-6 py-4 border-[1px] border-[#D7D9DA] rounded-lg cursor-pointer ${activeIndex === 1 ? "border-[#74CAAE] bg-[#E2FFF5]" : "bg-[#F9F9F9]"}`}
          onClick={() => handleClick(1)}
        >
          Pencemaran
        </div>
        <div
          className={`md:text-normal text-smallText font-extrabold px-6 py-4 border-[1px] border-[#D7D9DA] rounded-lg cursor-pointer ${activeIndex === 2 ? "border-[#74CAAE] bg-[#E2FFF5]" : "bg-[#F9F9F9]"}`}
          onClick={() => handleClick(2)}
        >
          Eksploitasi Hewan
        </div>
        <div
          className={`md:text-normal text-smallText font-extrabold px-6 py-4 border-[1px] border-[#D7D9DA] rounded-lg cursor-pointer ${activeIndex === 3 ? "border-[#74CAAE] bg-[#E2FFF5]" : "bg-[#F9F9F9]"}`}
          onClick={() => handleClick(3)}
        >
          Perusakan Lingkungan
        </div>
      </div>
      <div className="cardContainer flex flex-wrap justify-start gap-8 mt-12">
        {dummyLaporan.slice(0, 3).map((item, index) => {
          return <Card dataSampah={item} index={index} key={index} />;
        })}
      </div>
    </>
  );
};

import React, { useState } from "react";
import trendingIcon from "../../assets/Laporan/populer.svg";
import Card from "./Card";
import dummyLaporan from "./dummyLaporan";

const LaporanTerpopuler = () => {
  return (
    <>
      <div className="flex items-center mt-12 ">
        <h3 className="md:text-[36px] sm:text-3xl text-2xl font-extrabold sm:mr-4 mr-2">Laporan terpopuler nasional</h3>
        <img src={trendingIcon} alt="trending" className="lg:w-12 w-6" />
      </div>
      <div className="cardContainer flex flex-wrap justify-start gap-8 mt-12">
        {dummyLaporan.slice(0, 3).map((item, index) => {
          return <Card dataSampah={item} index={index} key={index} />;
        })}
      </div>
    </>
  );
};

export default LaporanTerpopuler;

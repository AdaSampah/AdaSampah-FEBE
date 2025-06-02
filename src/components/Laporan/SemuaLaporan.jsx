import React, { useEffect, useState } from "react";
import Card from "./Card";
import terbaruIcon from "../../assets/Laporan/terbaru.svg";
import SkeletonCard from "../Skeleton/SkeletonCard";

export const SemuaLaporan = ({ dataSampah }) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className="flex items-center mt-12">
        <h3 className="md:text-[36px] sm:text-3xl text-2xl font-extrabold sm:mr-4 mr-2">Semua Laporan</h3>
        <img src={terbaruIcon} alt="terbarud" className="lg:w-12 w-6" />
      </div>
      <div className="cardContainer flex flex-wrap justify-start gap-8 mt-12">
        {isLoading
          ? [...Array(3)].map((_, index) => <SkeletonCard key={index} />) // Tampilkan 3 skeleton card saat loading
          : dataSampah.map((item, index) => <Card dataSampah={item} index={index} key={index} />)}
      </div>
    </>
  );
};

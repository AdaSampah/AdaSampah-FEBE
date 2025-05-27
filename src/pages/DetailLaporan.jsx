import React from "react";
import DetailKiri from "../components/DetilLaporan/DetailKiri";
import DetailKanan from "../components/DetilLaporan/DetailKanan";
import MapSection from "../components/DetilLaporan/MapSection";

const DetailLaporan = () => {
  return (
    <>
      <section className="md:py-[120px] py-[100px] 2xl:px-28 sm:px-16 p-6">
        <h3 className="font-extrabold 2xl:text-[40px] md:text-3xl text-2xl text-center my-6">Detail laporan </h3>
        <div className="max-w-7xl w-full mx-auto ">
          <div className="containerDetail flex lg:flex-row flex-col flex-wrap md:gap-8 gap-3 justify-between items-stretch">
            <div className="lg:flex-1 w-full">
              <DetailKiri />
            </div>
            <div className="lg:flex-1 w-full">
              <DetailKanan />
            </div>
          </div>
          <MapSection latitude="-6.5951" longitude="-39.2833" />
        </div>
      </section>
    </>
  );
};

export default DetailLaporan;

import React from "react";
import DetailKiri from "../components/DetilLaporan/DetailKiri";
import DetailKanan from "../components/DetilLaporan/DetailKanan";

const DetailLaporan = () => {
  return (
    <>
      <section className="md:py-[120px] py-[100px] 2xl:px-28 sm:px-16 p-6">
        <h3 className="font-extrabold 2xl:text-[40px] md:text-3xl text-2xl text-center my-6">Detail laporan </h3>
        <div className="flex flex-wrap md:gap-8 gap-3 justify-center">
          <DetailKiri />
          <DetailKanan />
        </div>
      </section>
    </>
  );
};

export default DetailLaporan;

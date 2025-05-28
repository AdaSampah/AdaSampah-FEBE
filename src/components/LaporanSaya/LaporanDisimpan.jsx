import React from "react";
import dummyLaporan from "../Laporan/dummyLaporan";
import Card from "../Laporan/Card";

export default function LaporanDisimpan() {
  return (
    <section className="xl:px-36 lg:px-32 md:px-32 sm:px-10 px-4">
      <div className="flex flex-wrap justify-between">
        <div>
          <label htmlFor="urutkan" className="font-bold md:text-base text-sm">
            Urutkan:
          </label>
          <select name="urutkan" id="urutkan" className="lg:ml-2 focus:outline-none border-[1px] border-gray-500 rounded-md py-1 lg:px-4 px-2 md:text-base text-sm">
            <option value="Terbaru">Terbaru</option>
            <option value="Terlama">Terlama</option>
          </select>
        </div>
      </div>
      <div className="cardContainer flex flex-wrap justify-center gap-8 mt-6 mb-20">
        {dummyLaporan.map((item, index) => {
          return <Card dataSampah={item} index={index} key={index} />;
        })}
      </div>
    </section>
  );
}

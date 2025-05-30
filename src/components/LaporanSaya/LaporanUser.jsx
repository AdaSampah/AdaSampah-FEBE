import React from "react";
import dummyLaporan from "../Laporan/dummyLaporan";
import Card from "../Laporan/Card";

export default function LaporanUser() {
  return (
    <section className="xl:px-36 lg:px-32 md:px-32 sm:px-10 px-4">
      <div className="flex flex-wrap justify-between">
        <div className="my-2 flex md:gap-8 gap-3">
          <div>
            <label htmlFor="filter" className="font-bold md:text-base text-sm">
              Filter:
            </label>
            <select name="filter" id="filter" className="lg:ml-2 focus:outline-none border-[1px] border-gray-500 rounded-md py-1 lg:px-4 px-2 md:text-base text-sm">
              <option value="Semua">Semua</option>
              <option value="Belum Ditindaklanjut">Belum Ditindaklanjut</option>
              <option value="Diverifikasi">Diverifikasi</option>
              <option value="Diproses">Diproses</option>
              <option value="Selesai">Selesai</option>
            </select>
          </div>
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

        <div className="flex lg:gap-10 gap-6 lg:mt-0 mt-4">
          <div className="text-center">
            <p className="md:text-body text-base font-semibold">Diverifikasi</p>
            <p className="font-bold text-[#0084FF] lg:text-4xl sm:text-3xl text-2xl">3</p>
          </div>
          <div className="text-center">
            <p className="md:text-body text-base font-semibold">Diproses</p>
            <p className="font-bold text-[#C9AE17] lg:text-4xl sm:text-3xl text-2xl">2</p>
          </div>
          <div className="text-center">
            <p className="md:text-body text-base font-semibold">Selesai</p>
            <p className="font-bold text-[#53A88C] lg:text-4xl sm:text-3xl text-2xl">4</p>
          </div>
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

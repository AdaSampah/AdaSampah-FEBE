import React, { useState } from "react";
import { LaporanTerbaru } from "./LaporanTerbaru";
import { LaporanKategori } from "./LaporanKategori";
import Card from "./Card";
import LaporanTerpopuler from "./LaporanTerpopuler";
import { LaporanPencarian } from "./LaporanPecarian";

const LaporanSection = ({ searchParams }) => {
  return (
    <section>
      <div className="xl:px-36 lg:px-32 sm:px-12 px-8 lg:py-20 py-10">
        {searchParams && <LaporanPencarian searchParams={searchParams} />}
        <LaporanTerpopuler />
        <LaporanTerbaru />
        {/* <LaporanKategori /> */}
      </div>
    </section>
  );
};

export default LaporanSection;

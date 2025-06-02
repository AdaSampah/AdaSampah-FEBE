import React, { useState } from "react";

import { LaporanKategori } from "./LaporanKategori";
import Card from "./Card";
import LaporanTerpopuler from "./LaporanTerpopuler";
import { LaporanPencarian } from "./LaporanPecarian";
import { SemuaLaporan } from "./SemuaLaporan";

const LaporanSection = ({ searchParams, dataSampah }) => {
  return (
    <section>
      <div className="xl:px-36 lg:px-32 sm:px-12 px-8 lg:py-20 py-10">
        {searchParams && <LaporanPencarian searchParams={searchParams} dataSampah={dataSampah} />}
        {/* <LaporanTerpopuler /> */}
        <SemuaLaporan dataSampah={dataSampah} />
        {/* <LaporanKategori /> */}
      </div>
    </section>
  );
};

export default LaporanSection;

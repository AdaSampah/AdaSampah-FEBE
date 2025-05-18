import React, { useState } from "react";
import HeroLaporan from "../components/Laporan/HeroLaporan";
import LaporanSection from "../components/Laporan/LaporanSection";

export const Laporan = () => {
  const [searchParams, setSearchParams] = useState(null);
  return (
    <>
      <HeroLaporan setSearchParams={setSearchParams} />
      <LaporanSection searchParams={searchParams} />
    </>
  );
};

// routes/LaporanSaya.jsx
import React from "react";
import CoverEditProfile from "../components/LaporanSaya/CoverEditProfile";
import ProfileImage from "../components/LaporanSaya/ProfileImage";
import { Outlet, Link, useLocation } from "react-router-dom";
import newsIcon from "../assets/LaporanSaya/news.svg";
import bookmarkIcon from "../assets/LaporanSaya/bookmark.svg";

const LaporanSaya = () => {
  const location = useLocation();
  const isDisimpan = location.pathname === "/disimpan";

  const styleMenuLaporan = `flex items-center cursor-pointer ${!isDisimpan ? "text-[#129990] border-b-2 border-[#129990]" : "text-black"}`;
  const styleMenuDisimpan = `flex items-center cursor-pointer ${isDisimpan ? "text-[#129990] border-b-2 border-[#129990]" : "text-black"}`;

  return (
    <>
      <CoverEditProfile />
      <ProfileImage />
      <div className="max-w-7xl mx-auto translate-y-[-40px] border-b-2 border-[#B0B0B0] mt-20">
        <div className="flex items-center gap-6 sm:text-body text-normal font-semibold mb-6">
          <Link to="/laporan-saya" className={styleMenuLaporan}>
            <img src={newsIcon} alt="newsIcon" className="md:w-6 w-5 mr-2" />
            <p>Laporan Saya</p>
          </Link>
          <Link to="/disimpan" className={styleMenuDisimpan}>
            <img src={bookmarkIcon} alt="newsIcon" className="md:w-6 w-5 mr-2" />
            <p>Disimpan</p>
          </Link>
        </div>
      </div>
      {/* Ini untuk render konten berbeda di bawah */}
      <Outlet />
    </>
  );
};

export default LaporanSaya;

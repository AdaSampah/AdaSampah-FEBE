import React, { useContext } from "react";
import logowhite from "../../assets/Footer/logo-white.svg";
import FBLogo from "../../assets/Footer/FBLogo.svg";
import IGLogo from "../../assets/Footer/IGLogo.svg";
import XLogo from "../../assets/Footer/XLogo.svg";
import YtbLogo from "../../assets/Footer/YtbLogo.svg";
import { FaPhoneAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

export default function Footer() {
  const { user } = useContext(UserContext);

  return (
    <footer className="mt-20">
      <div className="bg-[rgb(18,18,18)] py-20 md:px-40 sm:px-20 px-6">
        <div className="flex flex-wrap md:flex-nowrap flex-col md:flex-row gap-8 md:gap-4 justify-between">
          <div className="w-full md:w-auto">
            <p className="font-extrabold text-white my-3">CONTACT US</p>
            <div className="flex items-center gap-4 text-[#9C9C9C] font-semibold mb-3">
              <FaPhoneAlt className="text-2xl" />
              <span className="break-all text-sm md:text-base">
                +6281326022762
              </span>
            </div>
            <a
              href="mailto:AdaSampah@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="flex items-center gap-3 text-[#9C9C9C] font-semibold">
                <IoMdMail className="text-3xl" />
                <span className="break-all text-sm md:text-base">
                  AdaSampah@gmail.com
                </span>
              </div>
            </a>
          </div>
          <div className="w-full md:w-auto">
            <p className="font-extrabold text-white my-3">AdaSampah</p>
            <div className="text-[#9C9C9C] font-semibold cursor-pointer flex flex-col gap-1 md:gap-0">
              <Link to="/">
                <p className="mb-2 md:mb-3">Beranda</p>
              </Link>
              {!(user && user.role === "admin") && (
                <Link to="/laporkan">
                  <p className="mb-2 md:mb-3">Laporkan</p>
                </Link>
              )}
              <Link to="/laporan">
                <p className="mb-2 md:mb-3">Laporan</p>
              </Link>
              <Link to="/peta-sebaran">
                <p className="mb-2 md:mb-3">Peta Sebaran</p>
              </Link>
              <Link to="/education">
                <p className="mb-2 md:mb-3">Kenali Sampahmu</p>
              </Link>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <p className="font-extrabold text-white my-3">SOSIAL MEDIA</p>
            <div className="flex gap-4 items-center">
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={FBLogo}
                  alt="FBLogo"
                  className="w-7 h-7 md:w-8 md:h-8"
                />
              </a>
              <a
                href="https://www.instagram.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={IGLogo}
                  alt="IGLogo"
                  className="w-7 h-7 md:w-8 md:h-8"
                />
              </a>
              <a
                href="https://twitter.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={XLogo}
                  alt="XLogo"
                  className="w-7 h-7 md:w-8 md:h-8"
                />
              </a>
              <a
                href="https://youtube.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={YtbLogo}
                  alt="YtbLogo"
                  className="w-7 h-7 md:w-8 md:h-8"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#121212] md:px-40 sm:px-10 px-6 py-8 flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 border-t-[0.1px] border-[#9C9C9C]">
        <div className="flex items-center gap-4 text-[#9C9C9C]">
          <img
            src={logowhite}
            alt="AdaSampah logo"
            className="h-10 mr-[-10px] mt-[-8px]"
          />
          <span className="text-base md:text-lg">AdaSampah</span>
        </div>
        <p className="text-[#9C9C9C] text-center text-xs md:text-base w-full md:w-auto">
          Copyright © 2025 AdaSampah. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

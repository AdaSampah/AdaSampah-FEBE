import React from "react";
import profImg from "../../assets/Navbar/profile-icon.png";
import titikTiga from "../../assets/Laporan/titikTiga.svg";
import { MdArrowCircleUp } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import { data, Link } from "react-router-dom";

import contoh from "../../assets/Laporan/contoh.png";

const Card = ({ dataSampah, index }) => {
  const date = new Date(dataSampah.createdAt);

  // Format menjadi "29 Mei 2025" (Indonesia)
  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  return (
    <Link to={`/laporan/${dataSampah._id}`}>
      <div key={index} className="cardKu shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)]  lg:max-w-[360px] max-w-[320px] rounded-3xl ">
        <div className="p-4">
          <div className="flex items-center gap-2">
            <img src={dataSampah.profileUrl || profImg} alt="profpic" className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="lg:text-smallText text-[12px]">
                <b>{dataSampah.username}</b>
                <span className="text-[#8A8A8A]"> · {formattedDate}</span>
              </p>
              <p className="lg:text-smallText text-[12px] text-[#5B5B5B] font-medium">
                {dataSampah.regency}, {dataSampah.province}
              </p>
            </div>
            {/* <img src={titikTiga} alt="titikTiga" /> */}
          </div>
          <p className="lg:text-smallText text-[12px] text-[#222] font-medium overflow-hidden line-clamp-4 my-2">{dataSampah.description}</p>
          <img src={dataSampah.photoUrl} alt="buktiFoto" className="rounded-lg" />
          <div className="flex items-center justify-between mt-4">
            <div className="cursor-pointer flex gap-4 items-center text-body text-[#5B5B5B]">
              <IoMdShare />
              <FaRegBookmark />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;

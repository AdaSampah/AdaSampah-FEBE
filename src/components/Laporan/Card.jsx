import React from "react";
import profImg from "../../assets/Navbar/kosong.jpeg";
import titikTiga from "../../assets/Laporan/titikTiga.svg";
import { MdArrowCircleUp } from "react-icons/md";
import { IoMdShare } from "react-icons/io";
import { FaRegBookmark } from "react-icons/fa";
import contoh from "../../assets/Laporan/contoh.png";

const Card = ({ dataSampah, index }) => {
  return (
    <div key={index} className="cardKu border-[1px] border-inputBorder lg:max-w-[360px] max-w-[320px] rounded-3xl ">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <img src={profImg} alt="profpic" className="w-10 h-10 rounded-full object-cover" />
          <div>
            <p className="lg:text-smallText text-[12px]">
              <b>{dataSampah.nama}</b>
              <span className="text-[#8A8A8A]"> · {dataSampah.tanggal}</span>
            </p>
            <p className="lg:text-smallText text-[12px] text-[#5B5B5B] font-medium">
              {dataSampah.kabupaten}, {dataSampah.provinsi} · {dataSampah.kategori}
            </p>
          </div>
          {/* <img src={titikTiga} alt="titikTiga" /> */}
        </div>
        <p className="lg:text-smallText text-[12px] text-[#222] font-medium overflow-hidden line-clamp-4 my-2">{dataSampah.deskripsi}</p>
        <img src={contoh} alt="buktiFoto" />
        <div className="flex items-center justify-between mt-4">
          <div>
            <div className="flex gap-2 justify-center items-center px-2 py-2 border-[1px] border-[#D7D9DA] bg-[#F1F1F1] rounded-2xl font-semibold cursor-pointer">
              <MdArrowCircleUp className="text-body" />
              <span className="text-[#636466] text-[12px]">Upvote · {dataSampah.upvote.toLocaleString("id-ID")}</span>
            </div>
          </div>
          <div className="cursor-pointer flex gap-4 items-center text-body text-[#5B5B5B]">
            <IoMdShare />
            <FaRegBookmark />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

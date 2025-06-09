import React, { useState, useEffect, useContext } from "react";
import profImg from "../../assets/Navbar/profile-icon.png";
import { IoMdShare } from "react-icons/io";
import { FaRegBookmark, FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "../../config";
import { UserContext } from "../../context/UserContext";

const Card = ({ dataSampah, index, onUpdateSavedReport }) => {
  const { user } = useContext(UserContext);
  const date = new Date(dataSampah.createdAt);
  let StatusSekarang = "";
  if (dataSampah?.status?.length) {
    const statusIndex = dataSampah.status.length - 1;
    const status = dataSampah.status[statusIndex];
    StatusSekarang = status?.statusName;
  }

  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const [isBookmarked, setIsBookmarked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (dataSampah.saved && dataSampah.saved.includes(user?.userId)) {
      setIsBookmarked(true);
    } else {
      setIsBookmarked(false);
    }
  }, [dataSampah.saved, user?.userId]);

  const handleBookmark = async (e) => {
    e.stopPropagation();
    try {
      const res = await axiosInstance.patch(
        `/reports/${dataSampah?._id}/saved/${user?.userId}`,
        {},
        {
          withCredentials: true,
        }
      );

      if (res.data.status === "success") {
        setIsBookmarked((prev) => !prev);

        // Beri tahu komponen induk bahwa ada perubahan
        if (onUpdateSavedReport) {
          onUpdateSavedReport(dataSampah._id, !isBookmarked);
        }
      }
    } catch (error) {
      console.error("Gagal toggle bookmark:", error);
    }
  };

  const handleShare = (e) => {
    e.stopPropagation();
    const baseUrl = window.location.href;
    const urlToShare = baseUrl;
    if (navigator.share) {
      navigator
        .share({
          url: urlToShare,
        })
        .then(() => console.log("Berhasil berbagi"))
        .catch((error) => console.error("Error berbagi:", error));
    } else {
      console.log("Fungsi share tidak didukung di browser ini.");
    }
  };

  const handleCardClick = () => {
    navigate(`/laporan/${dataSampah?._id}`);
  };

  return (
    <div
      key={index}
      className="cardKu shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] 
        lg:w-[360px] w-[320px] rounded-3xl flex flex-col  cursor-pointer"
      onClick={handleCardClick}
    >
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-2">
          <img
            src={dataSampah.profileUrl || profImg}
            alt="profpic"
            className="w-10 h-10 rounded-full object-cover aspect-[1/1]"
          />
          <div>
            <p className="lg:text-smallText text-[12px]">
              <b>{dataSampah.username}</b>
              <span className="text-[#8A8A8A]"> · {formattedDate}</span>
            </p>
            <p className="lg:text-smallText text-[12px] text-[#5B5B5B] font-medium leading-tight min-h-[32px]">
              {dataSampah.regency}, {dataSampah.province}
            </p>
          </div>
          {StatusSekarang === "Diverifikasi" && (
            <div className="flex gap-4">
              <span className="border-[1px] border-[#0084FF] rounded-[40px] sm:py-[6px] ml-[2px] sm:px-3 py-1 px-3 sm:text-[13px] text-[11px] text-[#0084FF] bg-[#E5F2FF] font-medium">
                Diverifikasi
              </span>
            </div>
          )}
          {StatusSekarang === "Diproses" && (
            <div className="flex gap-4">
              <span className="border-[1px] border-[#C9AE17] rounded-[40px] sm:py-[6px] ml-[2px] sm:px-3 py-1 px-3 sm:text-[13px] text-[11px] text-[#C9AE17] bg-[#FFF8D1] font-medium">
                Diproses
              </span>
            </div>
          )}
          {StatusSekarang === "Selesai" && (
            <div className="flex gap-4">
              <span className="border-[1px] border-[#53A88C] rounded-[40px] sm:py-[6px] ml-[2px] sm:px-3 py-1 px-3 sm:text-[13px] text-[11px] text-[#53A88C] bg-[#E2FFF5] font-medium">
                Selesai
              </span>
            </div>
          )}
        </div>

        <p className="lg:text-smallText text-[12px] text-[#222] font-medium  line-clamp-3 break-words whitespace-pre-wrap my-2 flex-grow">
          {dataSampah.description}
        </p>

        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden">
          <img
            src={dataSampah.photoUrl}
            alt="buktiFoto"
            className="w-full h-full object-cover"
          />
        </div>

        <div
          className="flex items-center justify-between mt-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="cursor-pointer flex gap-4 items-center text-body text-[#5B5B5B]">
            <IoMdShare onClick={handleShare} size={20} />
            {isBookmarked ? (
              <FaBookmark onClick={handleBookmark} size={18} />
            ) : (
              <FaRegBookmark onClick={handleBookmark} size={18} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

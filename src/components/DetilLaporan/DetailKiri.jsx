import React, { useContext, useEffect, useState } from "react";
import profImg from "../../assets/Navbar/kosong.jpeg";
import titikTiga from "../../assets/Laporan/titikTiga.svg";
import bookMarkIcon from "../../assets/Laporan/bookmark.svg";
import bookMarkFill from "../../assets/Laporan/bookmark_fill.svg";
import shareIcon from "../../assets/Laporan/share.svg";
import arrowUpIcon from "../../assets/Laporan/arrow_circle_up.svg";
import editIcon from "../../assets/DetilLaporan/edit.svg";
import trashIcon from "../../assets/DetilLaporan/trash.svg";
import Bukti from "../../assets/DetilLaporan/bukti.jpg";
import { axiosInstance } from "../../config";
import { UserContext } from "../../context/UserContext";
import { toast } from "react-hot-toast";

const DetailKiri = ({ detailLaporan }) => {
  const { user } = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  console.log(user);

  let StatusSekarang = "";
  if (detailLaporan?.status?.length) {
    const statusIndex = detailLaporan.status.length - 1;
    const status = detailLaporan.status[statusIndex];
    StatusSekarang = status?.statusName;
  }

  console.log(detailLaporan);
  // Mengecek status save ketika komponen di-mount
  useEffect(() => {
    const checkIsSaved = async () => {
      try {
        if (!user) return; // Jika belum login, skip
        const res = await axiosInstance.get(
          `/reports/${detailLaporan._id}/saved`
        );
        if (res.data && res.data.data) {
          setIsSaved(res.data.data.includes(user?.userId));
        }
      } catch (error) {
        console.error("Gagal cek status save:", error);
      }
    };
    checkIsSaved();
  }, [detailLaporan?._id, user]);

  const openModal = (image) => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleShare = () => {
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

  const handleSaveToggle = async () => {
    if (!user) {
      toast.error("Silakan login terlebih dahulu untuk menyimpan laporan!");
      return;
    }

    try {
      const res = await axiosInstance.patch(
        `/reports/${detailLaporan?._id}/saved/${user?.userId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data && res.data.status === "success") {
        setIsSaved((prev) => !prev);
      }
    } catch (error) {
      console.error("Gagal toggle save:", error);
    }
  };

  const date = new Date(detailLaporan?.createdAt);
  const formattedDate = date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div className="cardKu shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)]  md:rounded-3xl rounded-2xl flex-1 h-full">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img
                src={detailLaporan?.profileUrl || profImg}
                alt="profpic"
                className="2xl:w-14 2xl:h-14 md:w-12 md:h-12 w-10 h-10 rounded-full object-cover"
              />
              <p className="lg:text-[18px] text-[12px]">
                <b>{detailLaporan?.username}</b>
              </p>
            </div>
            {StatusSekarang === "Diverifikasi" && (
              <div className="flex gap-4">
                <span className="border-[1px] border-[#0084FF] rounded-[40px] sm:py-2 sm:px-4 py-1 px-3 sm:text-sm text-[12px] text-[#0084FF] bg-[#E5F2FF] font-medium">
                  Diverifikasi
                </span>
              </div>
            )}
            {StatusSekarang === "Diproses" && (
              <div className="flex gap-4">
                <span className="border-[1px] border-[#C9AE17] rounded-[40px] sm:py-2 sm:px-4 py-1 px-3 sm:text-sm text-[12px] text-[#C9AE17] bg-[#FFF8D1] font-medium">
                  Diproses
                </span>
              </div>
            )}
            {StatusSekarang === "Selesai" && (
              <div className="flex gap-4">
                <span className="border-[1px] border-[#53A88C] rounded-[40px] sm:py-2 sm:px-4 py-1 px-3 sm:text-sm text-[12px] text-[#53A88C] bg-[#E2FFF5] font-medium">
                  Selesai
                </span>
              </div>
            )}
          </div>
          <div className="my-4">
            <p className="lg:text-normal text-sm text-[#5B5B5B] font-medium">
              <span className="font-bold">Lokasi :</span>{" "}
              {detailLaporan?.regency}, {detailLaporan?.province}
            </p>
            <p className="lg:text-normal text-sm text-[#5B5B5B] font-medium">
              <span className="font-bold">Detil Lokasi :</span>{" "}
              {detailLaporan?.detailLocation}
            </p>
            <p className="lg:text-normal text-sm text-[#5B5B5B] font-medium">
              <span className="font-bold">Waktu Lapor :</span> {formattedDate}
            </p>
          </div>

          <img
            src={detailLaporan?.photoUrl}
            alt="buktiFoto"
            className="w-full aspect-[4/3] object-cover 2xl:min-w-[600px] md:min-w-[450px] min-w-[250px] max-h-96 md:rounded-2xl rounded-xl cursor-pointer"
            onClick={() => openModal(detailLaporan?.photoUrl)}
          />

          <div className="flex items-center justify-between mt-4">
            <div className="cursor-pointer flex gap-4 items-center text-body text-[#5B5B5B]">
              <img src={shareIcon} alt="shareicon" onClick={handleShare} />
              <img
                src={isSaved ? bookMarkFill : bookMarkIcon}
                alt="bookmarkicon"
                onClick={handleSaveToggle}
              />
            </div>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="max-w-screen-lg w-full mx-4">
            <div className="relative">
              <span
                className="absolute top-2 right-2 text-white cursor-pointer md:text-5xl text-3xl"
                onClick={closeModal}
              >
                &times;
              </span>
              <img
                src={detailLaporan?.photoUrl}
                alt="modalImage"
                className="rounded-lg w-full max-h-[500px] object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DetailKiri;

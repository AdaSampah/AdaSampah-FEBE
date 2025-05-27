import React, { useContext, useEffect, useState } from "react";
import profImg from "../../assets/Navbar/kosong.jpeg";
import titikTiga from "../../assets/Laporan/titikTiga.svg";
import bookMarkIcon from "../../assets/Laporan/bookmark.svg";
import bookMarkFill from "../../assets/Laporan/bookmark_fill.svg";
import shareIcon from "../../assets/Laporan/share.svg";
import arrowUpIcon from "../../assets/Laporan/arrow_circle_up.svg";
import editIcon from "../../assets/DetilLaporan/edit.svg";
import trashIcon from "../../assets/DetilLaporan/trash.svg";
import Bukti from "../../assets/DetilLaporan/Bukti.png";
// import Swal from "sweetalert2";
// import { axiosInstance } from "../../config";
// import { UserContext } from "../../context/UserContext";
// import { useNavigate } from "react-router-dom";

const DetailKiri = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const JenisLaporan = "Public";
  const StatusSekarang = "Diverifikasi";
  const isUpvoted = false;
  const isSaved = true;
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
      // Fallback jika fungsi share tidak didukung
      console.log("Fungsi share tidak didukung di browser ini.");
      // Implementasikan cara lain untuk berbagi link jika diperlukan
    }
  };
  return (
    <div>
      <div className="cardKu shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)] border-inputBorder 2xl:max-w-[690px] md:max-w-[520px] max-w-full  md:rounded-3xl rounded-2xl ">
        <div className="p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <img src={profImg} alt="profpic" className="2xl:w-14 2xl:h-14 md:w-12 md:h-12 w-10 h-10 rounded-full object-cover" />
              <p className="lg:text-[18px] text-[12px]">{JenisLaporan == "Public" ? <b>Alfian </b> : <b>Anonymous</b>}</p>
            </div>
            {StatusSekarang == "Diverifikasi" && (
              <div className="flex gap-4">
                <span className="border-[1px] border-[#0084FF]  rounded-[40px] sm:py-2 sm:px-4 py-1 px-3 sm:text-smallText text-verySmallText text-[#0084FF] bg-[#E5F2FF] font-medium">Diverifikasi</span>
              </div>
            )}

            {StatusSekarang == "Diproses" && (
              <div className="flex gap-4">
                <span className="border-[1px] border-[#C9AE17]  rounded-[40px] sm:py-2 sm:px-4 py-1 px-3 sm:text-smallText text-verySmallText text-[#C9AE17] bg-[#FFF8D1] font-medium">Diproses</span>
              </div>
            )}
            {StatusSekarang == "Selesai" && (
              <div className="flex gap-4">
                <span className="border-[1px] border-[#53A88C]  rounded-[40px] sm:py-2 sm:px-4 py-1 px-3 sm:text-smallText text-verySmallText text-[#53A88C] bg-[#E2FFF5] font-medium">Selesai</span>
              </div>
            )}
          </div>
          <div className="my-4">
            {/* <p className="lg:text-normal text-smallText text-[#5B5B5B] font-medium">
              <span className="font-bold">Kategori :</span> Sampah Dilaut
            </p> */}
            <p className="lg:text-normal text-smallText text-[#5B5B5B] font-medium">
              <span className="font-bold">Lokasi :</span> Bantul, Daerah Istimewa Yogyakarta
            </p>
            <p className="lg:text-normal text-smallText text-[#5B5B5B] font-medium">
              <span className="font-bold">Detil Lokasi :</span> Bogor, Jawa Barat
            </p>
            <p className="lg:text-normal text-smallText text-[#5B5B5B] font-medium">
              <span className="font-bold">Waktu Lapor :</span> Rabu, 24 Januari 2024
            </p>
          </div>

          <img src={Bukti} alt="buktiFoto" className="2xl:min-w-[600px] md:min-w-[450px] min-w-[250px] md:rounded-2xl rounded-xl cursor-pointer" onClick={() => openModal(Bukti)} />
          <div className="flex items-center justify-between mt-4">
            <div>
              <div className={`flex gap-2 justify-center items-center px-2 py-2 border-[1px] border-[#D7D9DA] rounded-2xl font-semibold cursor-pointer ${isUpvoted ? "bg-[#E2FFF5]" : "bg-[#F1F1F1]"}`}>
                <img src={arrowUpIcon} alt="arrowUp" className="w-5" />

                <span className="text-[#636466] text-[12px]">Dukung · 1000</span>
              </div>
            </div>
            <div className="cursor-pointer flex gap-4 items-center text-body text-[#5B5B5B]">
              <img src={shareIcon} alt="shareicon" onClick={handleShare} />
              {isSaved ? <img src={bookMarkFill} alt="bookmarkfillicon" /> : <img src={bookMarkIcon} alt="bookmarkicon" />}
            </div>
          </div>
          {/* {PemilikID === user?._id && (
            <div className="flex gap-2 mt-6">
              <button className="flex item-center justify-center gap-1 border-[1px] border-black sm:py-3 sm:px-4 py-2 px-3 rounded-md " onClick={() => setEditingDescription(true)}>
                <img src={editIcon} alt="editIcon" className="w-6" />
                <span className="text-normal font-semibold">Ubah</span>
              </button>
              <button className="flex item-center justify-center gap-1 border-[1px] border-greenMain sm:py-3 sm:px-4 py-2 px-3 rounded-md " onClick={() => handleDelete(data._id)}>
                <img src={trashIcon} alt="editIcon" className="w-5" />
                <span className="text-normal font-semibold">Hapus</span>
              </button>
            </div>
          )}

          {verifikasi ? (
            <>
              {statusLaporan === null ? (
                <textarea
                  className="w-full focus:outline-none border-[1px] border-inputBorder p-2 my-4"
                  name="verifikasi"
                  id="verifikasi"
                  cols="30"
                  rows="5"
                  placeholder="laporan diteruskan ke pemerintah kabupaten ABC"
                  onChange={(e) => setDeskripsiPertama(e.target.value)}
                ></textarea>
              ) : (
                <>
                  {statusLaporan?.StatusPertama !== " " && statusLaporan?.StatusKedua == " " && (
                    <textarea
                      className="w-full focus:outline-none border-[1px] border-inputBorder p-2 my-4"
                      name="proses"
                      id="proses"
                      cols="30"
                      rows="5"
                      placeholder="laporan diproses oleh pemerintah dan dilanjutkan ke pemerintah kabupaten ABC"
                      onChange={(e) => setDeskripsiKedua(e.target.value)}
                    ></textarea>
                  )}
                  {statusLaporan?.StatusKedua !== " " && statusLaporan?.StatusKetiga == " " && (
                    <textarea
                      className="w-full focus:outline-none border-[1px] border-inputBorder p-2 my-4"
                      name="selesai"
                      id="selesai"
                      cols="30"
                      rows="5"
                      placeholder="laporan berhasil diselesaikan oleh ABC"
                      onChange={(e) => setDeskripsiKetiga(e.target.value)}
                    ></textarea>
                  )}
                </>
              )}

              {statusLaporan === null ? (
                <button onClick={handleBuatStatus} className="text-white bg-greenMain px-3 py-2 rounded-md mr-2">
                  Submit Verifikasi
                </button>
              ) : (
                <>
                  {statusLaporan?.StatusPertama !== " " && statusLaporan?.StatusKedua == " " && (
                    <button onClick={handleUpdateStatus} className="text-white bg-greenMain px-3 py-2 rounded-md mr-2">
                      Submit Proses
                    </button>
                  )}
                  {statusLaporan?.StatusKedua !== " " && statusLaporan?.StatusKetiga == " " && (
                    <button onClick={handleUpdateStatusNext} className="text-white bg-greenMain px-3 py-2 rounded-md mr-2">
                      Selesaikan
                    </button>
                  )}
                </>
              )}
              <button onClick={() => setVerifikasi(false)} className="text-white bg-red-700 px-3 py-2 rounded-md">
                Batalkan
              </button>
            </>
          ) : (
            <>
              {Provinsi == user?.username && statusLaporan === null ? (
                <button className="mt-4 px-3 py-2 rounded-md text-white bg-[#0084FF]" onClick={() => setVerifikasi(true)}>
                  Verifikasi Laporan
                </button>
              ) : (
                <>
                  {Provinsi == user?.username && statusLaporan?.StatusPertama !== " " && statusLaporan?.StatusKedua == " " && (
                    <button className="mt-4 px-3 py-2 rounded-md text-white bg-[#C9AE17] mr-2" onClick={() => setVerifikasi(true)}>
                      Proses Laporan
                    </button>
                  )}
                  {Provinsi == user?.username && statusLaporan?.StatusKedua !== " " && statusLaporan?.StatusKetiga == " " && (
                    <button className="mt-4 px-3 py-2 rounded-md text-white bg-[#53A88C]" onClick={() => setVerifikasi(true)}>
                      Selesaikan Laporan
                    </button>
                  )}
                </>
              )}
            </>
          )} */}
        </div>
      </div>
      {modalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="max-w-screen-lg w-full mx-4">
            <div className="relative">
              <span className="absolute top-2 right-2 text-white cursor-pointer md:text-5xl text-3xl" onClick={closeModal}>
                &times;
              </span>
              <img src={Bukti} alt="modalImage" className="rounded-lg w-full max-h-[500px] object-cover" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DetailKiri;

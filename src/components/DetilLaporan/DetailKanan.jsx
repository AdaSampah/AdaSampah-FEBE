import React, { useContext, useState } from "react";
import check1 from "../../assets/DetilLaporan/check1.svg";
import check2 from "../../assets/DetilLaporan/check2.svg";
import check3 from "../../assets/DetilLaporan/check3.svg";
import send from "../../assets/DetilLaporan/send.svg";
import { axiosInstance } from "../../config";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";

const DetailKanan = ({ detailLaporan }) => {
  const { user } = useContext(UserContext);
  const [inputDeskripsi, setInputDeskripsi] = useState("");
  console.log(user?.role);
  const handleInputChange = (e) => {
    setInputDeskripsi(e.target.value);
  };

  const handleSendClick = async () => {
    if (inputDeskripsi.trim() === "") return;

    try {
      const response = await axiosInstance.patch(`/reports/${detailLaporan?._id}/status`, {
        statusDescription: inputDeskripsi,
      });
      const data = response.data;

      if (data.status === "success") {
        toast.success("Status berhasil diperbarui!");
        setInputDeskripsi("");
      } else {
        toast.error("Terjadi kesalahan saat memperbarui status.");
      }
    } catch (error) {
      toast.error("Terjadi kesalahan saat memperbarui status.");
    } finally {
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  return (
    <div className="cardKu shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] md:rounded-3xl h-full rounded-2xl ">
      <h6 className="text-normal font-bold text-center pt-10">PROSES LAPORAN</h6>
      <br />

      <div className="px-10 pb-10 flex flex-col justify-between">
        {detailLaporan?.status.length > 0 ? (
          <div>
            {detailLaporan?.status.map((status, index) => (
              <div key={index} className="flex items-start gap-4 my-4">
                <img src={status.statusName === "Diverifikasi" ? check1 : status.statusName === "Diproses" ? check2 : check3} alt="check" />
                <div>
                  <p
                    className="font-semibold md:text-xl text-normal"
                    style={{
                      color: status.statusName === "Diverifikasi" ? "#0084FF" : status.statusName === "Diproses" ? "#C9AE17" : "#53A88C",
                    }}
                  >
                    {status.statusName}
                  </p>
                  <p className="text-[#8A8A8A] font-medium sm:text-sm text-[12px]">{status.time}</p>
                  <p className="text-[#5B5B5B] font-bold sm:text-sm text-[12px]">PEMERINTAH DAERAH ISTIMEWA YOGYAKARTA</p>
                  <p className="text-[#222] font-medium sm:text-sm text-[12px]">{status.statusDescription}</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[#222] font-medium sm:text-sm text-[12px] text-center">Laporan Belum Ditindaklanjuti.</p>
        )}
        {user?.role == "admin" && detailLaporan?.status.length < 3 && (
          <div className="flex items-center border rounded-full px-4 py-2 mt-6">
            <input type="text" value={inputDeskripsi} onChange={handleInputChange} placeholder="Tulis deskripsi proses..." required className="flex-1 outline-none text-sm sm:text-base" />
            <button onClick={handleSendClick} className="ml-2 cursor-pointer">
              <img src={send} alt="send icon" className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailKanan;

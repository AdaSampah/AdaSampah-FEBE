import React, { useEffect, useState } from "react";
import check1 from "../../assets/DetilLaporan/check1.svg";
import check2 from "../../assets/DetilLaporan/check2.svg";
import check3 from "../../assets/DetilLaporan/check3.svg";

const DetailKanan = () => {
  const statusLaporan = "ada";

  return (
    <div>
      <div className="cardKu shadow-[0px_4px_16px_0px_rgba(0,0,0,0.25)] 2xl:max-w-[510px] md:max-w-[420px] max-w-full md:rounded-3xl rounded-2xl ">
        <div className="p-10">
          <h6 className="text-normal font-bold text-center">PROSES LAPORAN</h6>
          <br />
          <hr />
          <br />

          <div className="flex items-start gap-4 my-4">
            <>
              <img src={check1} alt="check1" />
              <div>
                <p className="text-[#0084FF] font-semibold md:text-xl text-normal">Diverifikasi</p>
                <p className="text-[#8A8A8A] font-medium] sm:text-sm text-[12px] ">Rabu, 24 Januari 2024 · 08:24 WIB</p>
                <p className="text-[#5B5B5B] font-bold sm:text-sm text-[12px] ">PEMERINTAH KOTA BOGOR </p>
                <p className="text-[#222] font-medium sm:text-sm text-[12px] ">Baik kak, akan kami cek dan koordinasikan dengan dinas kehutanan </p>
              </div>
            </>
          </div>
          <div className="flex items-start gap-4 my-4">
            <>
              <img src={check2} alt="check1" />
              <div>
                <p className="text-[#C9AE17] font-semibold md:text-xl text-normal">Diproses</p>
                <p className="text-[#8A8A8A] font-medium] sm:text-sm text-[12px] ">Sabtu, 27 Januari 2024 · 13:27 WIB</p>
                <p className="text-[#5B5B5B] font-bold sm:text-sm text-[12px] ">PEMERINTAH KOTA BOGOR</p>
                <p className="text-[#222] font-medium sm:text-sm text-[12px] ">Tim kami sedang berusaha semaksimal mungkin dan akan kami usahakan secepatnya menangkap para pelaku penebangan liar tersebut 🙏 </p>
              </div>
            </>
          </div>
          <div className="flex items-start gap-4 my-4">
            <>
              <img src={check3} alt="check1" />
              <div>
                <p className="text-[#53A88C] font-semibold md:text-xl text-normal">Selesai</p>
                <p className="text-[#8A8A8A] font-medium] sm:text-sm text-[12px] ">Sabtu, 27 Januari 2024 · 13:27 WIB</p>
                <p className="text-[#5B5B5B] font-bold sm:text-sm text-[12px] ">PEMERINTAH KOTA BOGOR</p>
                <p className="text-[#222] font-medium sm:text-sm text-[12px] ">Pelaku penebangan liar sudah ditangkap. Terimakasih atas laporan Anda. Apabila ada keresahan lainnya, jangan ragu untuk melaporkan 👍</p>
              </div>
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailKanan;

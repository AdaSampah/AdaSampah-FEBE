import React, { useState } from "react";
import HeroLaporanImg from "../../assets/Laporan/HeroLaporanImg.png";
import { IoSearch } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";

const HeroLaporan = ({ setSearchParams }) => {
  const [isOpenKabupaten, setIsOpenKabupaten] = useState(false);
  const [kabupatenDipilih, setKabupatenDipilih] = useState("");

  const DIY = ["Yogyakarta", "Bantul", "Sleman", "Gunung Kidul", "Kulon Progo"];
  const handleKabupatenSelect = (option) => {
    setKabupatenDipilih(option);
  };

  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    setSearchParams({
      regency: kabupatenDipilih.toLowerCase(),
      keyword: keyword.toLowerCase(),
    });
  };
  return (
    <section>
      <div>
        <div className="w-full 2xl:h-[700px] lg:h-[600px] md:h-[500px] h-[480px] bg-no-repeat bg-cover" style={{ backgroundImage: `url(${HeroLaporanImg})` }} />
        <div className="w-full absolute 2xl:top-52 md:top-40 top-24 flex flex-col justify-center sm:p-10 p-4">
          <h2 className="text-white 2xl:text-headline2 md:text-[52px] text-3xl  font-extrabold text-center md:leading-normal leading-normal">Laporan Kerusakan Alam</h2>
          <p className="text-white 2xl:text-body text-normal my-8 text-center">Temukan tindakan-tindakan ilegal yang dilaporkan oleh masyarakat ke website Ecotection</p>
          <div className="flex mx-auto">
            <div>
              <div className="bg-white flex justify-between items-center px-4 py-6 rounded-l-md md:gap-2 gap-1 max-w-60  border-r-[1px] border-[#D9D9D9] cursor-pointer" onClick={() => setIsOpenKabupaten(!isOpenKabupaten)}>
                <CiLocationOn className="md:text-2xl text-xl" />
                <span className="text-smallText font-semibold md:block hidden"> {kabupatenDipilih || "Kabupaten"}</span>
                {kabupatenDipilih ? " " : <IoMdArrowDropdown className="md:text-2xl text-xl md:block hidden" />}
              </div>
              {isOpenKabupaten && (
                <div className="absolute z-50 w-72 max-h-96 overflow-y-scroll mt-1 bg-white shadow-lg rounded-md" onClick={() => setIsOpenKabupaten(false)}>
                  <ul className="p-2">
                    {DIY.map((kabupaten, index) => (
                      <li className="cursor-pointer hover:bg-gray-100" key={index} onClick={() => handleKabupatenSelect(kabupaten)}>
                        {kabupaten}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="bg-white flex justify-between items-center sm:px-4 px-2 sm:py-2 py-1 rounded-r-md  lg:w-[840px] sm:w-[500px] max-w-[840px]">
              <input type="text" id="cari" onChange={(e) => setKeyword(e.target.value)} className=" px-1 py-2 outline-none text-normal font-medium w-full" placeholder="Cari disini" />
              <button onClick={handleSearch} className="flex items-center cursor-pointer py-2 md:px-6 px-2 md:ml-2 ml-0 rounded-md text-white bg-[#096b69]">
                <IoSearch className="md:text-2xl text-xl md:mr-4 mr-0 " />
                <span className="md:text-normal text-smallText md:block hidden">Cari</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroLaporan;

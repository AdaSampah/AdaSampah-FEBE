import React, { useState } from "react";
import HeroLaporanImg from "../../assets/Laporan/HeroLaporanImg.png";
import { IoSearch } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { CiLocationOn } from "react-icons/ci";
import Indonesia from "../../data/dataProvinsi";

const HeroLaporan = ({ setSearchParams }) => {
  const [isOpenProvinsi, setIsOpenProvinsi] = useState(false);
  const [provinsiDipilih, setProvinsiDipilih] = useState("");

  const handleProvinsiSelect = (option) => {
    setProvinsiDipilih(option);
    console.log(option);
  };

  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    setSearchParams({
      provinsi: provinsiDipilih.toLowerCase(),
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
              <div className="bg-white flex justify-between items-center px-4 py-6 rounded-l-md md:gap-2 gap-1 max-w-60  border-r-[1px] border-[#D9D9D9] cursor-pointer" onClick={() => setIsOpenProvinsi(!isOpenProvinsi)}>
                <CiLocationOn className="md:text-2xl text-xl" />
                <span className="text-smallText font-semibold md:block hidden"> {provinsiDipilih || "Provinsi"}</span>
                {provinsiDipilih ? " " : <IoMdArrowDropdown className="md:text-2xl text-xl md:block hidden" />}
              </div>
              {isOpenProvinsi && (
                <div className="absolute z-50 w-72 max-h-96 overflow-y-scroll mt-1 bg-white shadow-lg rounded-md" onClick={() => setIsOpenProvinsi(false)}>
                  <ul className="p-2">
                    {Indonesia.map((provinsi, index) => (
                      <li className="cursor-pointer hover:bg-gray-100" key={index} onClick={() => handleProvinsiSelect(provinsi.namaProvinsi)}>
                        {provinsi.namaProvinsi}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="bg-white flex justify-between items-center px-4 py-2 rounded-r-md  lg:w-[840px] sm:w-[500px] max-w-[840px]">
              <input type="text" id="cari" onChange={(e) => setKeyword(e.target.value)} className=" px-1 py-2 outline-none text-normal font-medium" placeholder="Cari disini" />
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

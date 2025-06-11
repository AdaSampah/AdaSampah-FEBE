import Invitation from "../../assets/Home/invitation.png";
import { FaArrowRight } from "react-icons/fa";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

export default function HomeInvitation() {
  const { user } = useContext(UserContext);
  return (
    <section className="mt-12 sm:mt-16 md:mt-24 flex flex-col md:flex-row gap-8 md:gap-[40px] lg:gap-[75px] items-center justify-center w-full px-4 md:px-8 lg:px-0">
      <div className="w-full max-w-[180px] sm:max-w-[220px] md:max-w-[260px] lg:max-w-[350px] xl:max-w-[400px] flex-shrink-0 flex justify-center mb-6 md:mb-0">
        <img
          src={Invitation}
          alt="Invitation Image"
          className="w-full h-auto object-contain rounded-2xl"
        />
      </div>
      <div className="w-full max-w-xl md:max-w-[400px] lg:max-w-[566px] flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="font-extrabold text-2xl sm:text-3xl md:text-[32px] lg:text-[40px] xl:text-[48px] w-full mb-4 md:mb-[32px] leading-tight">
          Bersama <span className="text-[#129990]">Atasi</span> Masalah Sampah
        </h2>
        <p className="mb-6 md:mb-[32px] text-sm sm:text-base md:text-[16px] lg:text-[18px] xl:text-[20px] w-full text-gray-700">
          Sampah adalah tanggung jawab kita bersama. Laporkan penemuan sampah
          liar, pembuangan sembarangan, atau masalah lingkungan di sekitar Anda
          melalui AdaSampah. Mari wujudkan lingkungan yang lebih bersih dan
          sehat!
        </p>
        <div className="w-full flex justify-center md:justify-start">
          {!(user && user.role === "admin") && (
            <a
              href="/laporkan"
              className="flex items-center gap-2 pl-5 pr-4 py-3 mt-2 bg-[#096B68] rounded-[40px] hover:bg-[#075A57] text-[16px] text-white transition-colors duration-200 shadow-md"
            >
              Laporkan sekarang
              <FaArrowRight className="text-xl sm:text-2xl p-2 bg-[#FFFBDE] rounded-full text-black ml-2" />
            </a>
          )}
        </div>
      </div>
    </section>
  );
}

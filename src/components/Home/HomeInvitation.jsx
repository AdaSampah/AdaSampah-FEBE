import Invitation from "../../assets/Home/invitation.png";
import { FaArrowRight } from "react-icons/fa";

export default function HomeInvitation() {
  return (
    <section className="mt-16 md:mt-24 flex flex-col md:flex-row gap-8 md:gap-[75px] items-center justify-center w-full px-4 md:px-0">
      <div className="w-full max-w-[220px] sm:max-w-[300px] md:max-w-[350px] lg:max-w-[400px] flex-shrink-0 flex justify-center">
        <img
          src={Invitation}
          alt="Invitation Image"
          className="w-full h-auto object-contain"
        />
      </div>
      <div className="w-full max-w-xl md:max-w-[566px] flex flex-col items-center md:items-start text-center md:text-left">
        <h2 className="font-extrabold text-2xl sm:text-3xl md:text-[40px] lg:text-[48px] w-full md:w-[496px] mb-6 md:mb-[32px] leading-tight">
          Mari Bersama <span className="text-[#129990]">Lawan</span> Kerusakan
          Alam
        </h2>
        <p className="mb-6 md:mb-[32px] text-base sm:text-lg md:text-[18px] lg:text-[20px] w-full">
          Alam adalah rumah bagi kita semua. Melindunginya adalah tanggung jawab
          kita bersama. Laporkan tindakan merusak alam yang Anda temukan melalui
          Ecotection.
        </p>
        <div className="w-full flex justify-center md:justify-start">
          <a
            href="/laporkan"
            className="flex items-center gap-2 pl-5 pr-4 py-3 mt-2 bg-[#096B68] rounded-[40px] hover:bg-[#075A57] text-[16px] text-white transition-colors duration-200"
          >
            Laporkan sekarang
            <FaArrowRight className="text-2xl sm:text-3xl p-2 bg-[#FFFBDE] rounded-full text-black ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
}


import React from "react";
import HeroLaporkanImg from "../../assets/Laporkan/HeroLaporkan.png";

export default function HeroLaporkan() {

    return (
    <section>
      <div className="w-full p-8 2xl:h-[1400px] lg:h-[1000px] md:h-[900px] h-[800px] bg-cover bg-no-repeat" style={{ backgroundImage: `url(${HeroLaporkanImg})` }}>
        <div className="lg:h-[798px] md:h-[700px] h-[600px] flex flex-col justify-center items-center">
          <h1 className="text-white font-extrabold 2xl:text-headline1 md:text-6xl sm:text-5xl text-3xl text-center md:leading-normal leading-normal 2xl:max-w-[1100px] max-w-[900px]">Laporkan Sampah Yang Ada Di Sekitar Anda</h1>
          <p className="text-white 2xl:text-body lg:text-[18px] text-normal  my-8 text-center">Dengan melaporkan sampah yang berserakan di sekitar anda, maka anda berkontribusi nyata dalam memelihara lingkungan</p>
        </div>
      </div>
    </section>
  );
};


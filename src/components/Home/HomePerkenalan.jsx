import Logo from "../../assets/react.svg";

export default function HomePerkenalan() {
  return (
    <section className="w-full py-10 px-4 md:px-0 mt-30">
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 md:gap-20">
        <img
          src={Logo}
          alt="logo AdaSampah"
          className="w-24 h-24 md:w-40 md:h-40 object-contain mb-4 md:mb-0"
        />
        <div className="text-center md:text-left">
          <h2 className="mb-[32px] font-extrabold text-2xl md:text-[48px]">
            Apa itu{" "}
            <span className="font-extrabold text-2xl md:text-[48px] text-[#129990] ">
              AdaSampah?
            </span>
          </h2>
          <p className="text-base md:text-[20px] text-gray-700 max-w-xl">
            AdaSampah adalah platform inovatif yang menghubungkan masyarakat
            dengan pemerintah untuk bersama-sama mewujudkan lingkungan yang
            bersih dan lestari. Melalui fitur unggulan{" "}
            <span className="font-semibold text-[#129990]">
              "Kenali Sampahmu"
            </span>
            , pengguna dapat mengunggah foto sampah dan secara otomatis
            memperoleh informasi jenis, solusi penanganan, hingga inspirasi
            pemanfaatan kreatif dari sampah tersebut. Jadikan setiap laporan dan
            aksi Anda bagian dari perubahan nyata menuju pengelolaan sampah yang
            cerdas, edukatif, dan berkelanjutan.
          </p>
        </div>
      </div>
    </section>
  );
}

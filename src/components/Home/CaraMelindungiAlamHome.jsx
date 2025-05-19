import CaraMelindungiAlam from "../../assets/Home/cara-melindungi-alam.png";

export default function CaraMelindungiAlamHome() {
  return (
    <section className="mt-16 sm:mt-[120px] md:mt-[150px] lg:mt-[190px]">
      <div className="w-full flex flex-col justify-center items-center py-6 sm:py-8 px-4 sm:px-6">
        <h2 className="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-[48px] text-center">
          Aksi Nyata untuk Melindungi Lingkungan
        </h2>
        <p className="font-medium text-sm sm:text-base md:text-lg lg:text-[20px] text-center mt-4 mb-6 w-full max-w-[95vw] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[841px]">
          Mulai dari langkah kecil seperti menghemat energi, air, memilah
          sampah, menanam pohon, hingga melaporkan penumpukan sampah melalui
          AdaSampah. Setiap aksi Anda berkontribusi untuk bumi yang lebih bersih
          dan sehat. Yuk, lakukan perubahan bersama AdaSampah!
        </p>
        <div className="flex justify-center mt-[30px] items-center w-full max-w-full sm:max-w-[600px] md:max-w-[700px] lg:max-w-[841px]">
          <img
            src={CaraMelindungiAlam}
            alt="Cara Melindungi Alam"
            className="w-full h-auto object-contain"
          />
        </div>
      </div>
    </section>
  );
}

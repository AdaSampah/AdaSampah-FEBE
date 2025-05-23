import HeroBackground from "../../assets/Home/hero-home.jpg";

export default function HeroHome() {
  return (
    <section>
      <div>
        <div
          className="w-full p-0 2xl:h-[800px] lg:h-[700px] md:h-[600px] h-[800px] bg-cover bg-no-repeat bg-center relative overflow-hidden flex items-center justify-center"
          style={{ backgroundImage: `url(${HeroBackground})` }}
        >
          <div className="w-full flex flex-col justify-center items-center sm:p-10 p-4">
            <h2 className="text-white 2xl:text-headline2 md:text-[52px] text-3xl font-extrabold text-center md:leading-normal leading-normal w-[789px]">
              Bersama Wujudkan Lingkungan Bersih dan Sehat
            </h2>
            <p className="text-white text-[18px] text-normal my-8 text-center max-w-[90vw]">
              Laporkan lokasi penumpukan sampah di sekitar Anda dengan mudah.
              Jadikan lingkungan lebih bersih, sehat, dan nyaman bersama
              AdaSampah.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

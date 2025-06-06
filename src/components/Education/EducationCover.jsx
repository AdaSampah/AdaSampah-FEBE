import Cover from "../../assets/Education/cover.jpg";

export default function EducationCover() {
  return (
    <section>
      <div>
        <div
          className="w-full p-0 2xl:h-[800px] lg:h-[700px] md:h-[600px] h-[400px] bg-cover bg-no-repeat bg-center relative overflow-hidden flex items-center justify-center"
          style={{ backgroundImage: `url(${Cover})` }}
        >
          <div className="w-full flex flex-col justify-center items-center sm:p-10 p-4">
            <h2 className="text-white 2xl:text-headline2 md:text-[52px] text-3xl font-extrabold text-center md:leading-normal leading-normal max-w-3xl">
              Temukan Potensi Sampahmu
            </h2>
            <p className="text-white text-[18px] text-normal my-8 text-center max-w-2xl">
              Unggah foto sampah untuk mengetahui jenis dan inspirasi
              pemanfaatannya. Bersama AdaSampah, wujudkan lingkungan yang lebih
              baik.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

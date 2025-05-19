import QuotesBg from "../../assets/Home/quotes-bg.png";

export default function Quotes() {
  return (
    <section
      className="mt-16 sm:mt-24 lg:mt-30 w-full min-h-[220px] sm:min-h-[300px] lg:min-h-[424px] bg-cover bg-no-repeat bg-center relative overflow-hidden flex items-center justify-center px-4 sm:px-8"
      style={{ backgroundImage: `url(${QuotesBg})` }}
    >
      <p className="max-w-[95vw] sm:max-w-[600px] md:max-w-[800px] lg:max-w-[834px] font-medium text-sm sm:text-base md:text-lg lg:text-[22px] text-white px-2 sm:px-0 text-center mx-auto">
        Setiap laporan Anda melalui AdaSampah membantu menciptakan lingkungan
        sekitar yang lebih bersih dan sehat. Mari mulai perubahan dari
        lingkungan kita sendiri, demi masa depan yang lebih baik dan nyaman
        untuk semua.
      </p>
    </section>
  );
}

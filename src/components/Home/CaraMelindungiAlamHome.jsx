import HematAir from "../../assets/Home/hemat-air.png";
import HematEnergi from "../../assets/Home/hemat-energi.png";
import KurangiSampahPlastik from "../../assets/Home/kurangi-sampah-plastik.png";
import PilahSampah from "../../assets/Home/pilah-sampah.png";
import TanamPohon from "../../assets/Home/tanam-pohon.png";
import LaporkanSampah from "../../assets/Home/laporkan-sampah.png";

export default function CaraMelindungiAlamHome() {
  return (
    <section className="mt-16 sm:mt-[120px] md:mt-[150px] lg:mt-[190px]">
      <div className="w-full flex flex-col justify-center items-center py-6 sm:py-8 px-4 sm:px-6">
        <h2 className="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-[48px] text-center mb-4">
          Aksi Nyata untuk Melindungi Lingkungan
        </h2>
        <p className="font-medium text-sm sm:text-base md:text-lg lg:text-[20px] text-center mt-4 mb-6 w-full max-w-[95vw] sm:max-w-[600px] md:max-w-[700px] lg:max-w-[841px]">
          Mulai dari langkah kecil seperti menghemat energi, air, memilah
          sampah, menanam pohon, hingga melaporkan penumpukan sampah melalui
          AdaSampah. Setiap aksi Anda berkontribusi untuk bumi yang lebih bersih
          dan sehat. Yuk, lakukan perubahan bersama AdaSampah!
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-[10px] max-w-full sm:max-w-[600px] md:max-w-[900px] lg:max-w-[1100px]">
          {/* Card 1 */}
          <div
            className="relative rounded-[40px] sm:rounded-[40px] sm:rounded-tl-[80px] lg:rounded-tl-[80px] lg:rounded-[40px] overflow-hidden min-h-[220px] sm:min-h-[260px] md:min-h-[280px] flex items-end shadow-lg transition-transform hover:scale-105"
            style={{
              backgroundImage: `url(${HematEnergi})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 p-4 sm:p-6 pb-8 w-full">
              <h3 className="font-extrabold text-white text-lg sm:text-xl md:text-2xl mb-2 drop-shadow-lg">
                Hemat energi
              </h3>
              <p className="text-white text-xs sm:text-base md:text-lg drop-shadow-lg">
                Matikan lampu dan peralatan elektronik saat tidak digunakan.
              </p>
            </div>
          </div>
          {/* Card 2 */}
          <div
            className="relative rounded-[40px] sm:rounded-[40px] sm:rounded-tr-[80px] lg:rounded-[40px] overflow-hidden min-h-[220px] sm:min-h-[260px] md:min-h-[280px] flex items-end shadow-lg transition-transform hover:scale-105"
            style={{
              backgroundImage: `url(${HematAir})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 p-4 sm:p-6 pb-8 w-full">
              <h3 className="font-extrabold text-white text-lg sm:text-xl md:text-2xl mb-2 drop-shadow-lg">
                Hemat air
              </h3>
              <p className="text-white text-xs sm:text-base md:text-lg drop-shadow-lg">
                Gunakan air secukupnya saat mencuci piring dan baju.
              </p>
            </div>
          </div>
          {/* Card 3 */}
          <div
            className="relative rounded-[40px] sm:rounded-[32px] lg:rounded-tr-[80px] lg:rounded-[40px] overflow-hidden min-h-[220px] sm:min-h-[260px] md:min-h-[280px] flex items-end shadow-lg transition-transform hover:scale-105"
            style={{
              backgroundImage: `url(${KurangiSampahPlastik})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 p-4 sm:p-6 pb-8 w-full">
              <h3 className="font-extrabold text-white text-lg sm:text-xl md:text-2xl mb-2 drop-shadow-lg">
                Kurangi sampah plastik
              </h3>
              <p className="text-white text-xs sm:text-base md:text-lg drop-shadow-lg">
                Gunakan kantong belanja ramah lingkungan untuk mengurangi sampah
                plastik.
              </p>
            </div>
          </div>
          {/* Card 4 */}
          <div
            className="relative rounded-[40px] sm:rounded-[32px] lg:rounded-bl-[80px] lg:rounded-[40px] overflow-hidden min-h-[220px] sm:min-h-[260px] md:min-h-[280px] flex items-end shadow-lg transition-transform hover:scale-105"
            style={{
              backgroundImage: `url(${PilahSampah})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 p-4 sm:p-6 pb-8 w-full">
              <h3 className="font-extrabold text-white text-lg sm:text-xl md:text-2xl mb-2 drop-shadow-lg">
                Pilah sampah
              </h3>
              <p className="text-white text-xs sm:text-base md:text-lg drop-shadow-lg">
                Pisahkan sampah organik dan anorganik.
              </p>
            </div>
          </div>
          {/* Card 5 */}
          <div
            className="relative rounded-[40px] sm:rounded-[40px] sm:rounded-bl-[80px] lg:rounded-[40px] overflow-hidden min-h-[220px] sm:min-h-[260px] md:min-h-[280px] flex items-end shadow-lg transition-transform hover:scale-105"
            style={{
              backgroundImage: `url(${TanamPohon})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 p-4 sm:p-6 pb-8 w-full">
              <h3 className="font-extrabold text-white text-lg sm:text-xl md:text-2xl mb-2 drop-shadow-lg">
                Tanam pohon
              </h3>
              <p className="text-white text-xs sm:text-base md:text-lg drop-shadow-lg">
                Tanam pohon di halaman rumah atau lingkungan sekitar
              </p>
            </div>
          </div>
          {/* Card 6 */}
          <div
            className="relative rounded-[40px] sm:rounded-[40px] sm:rounded-br-[80px] lg:rounded-br-[80px] lg:rounded-[40px] overflow-hidden min-h-[220px] sm:min-h-[260px] md:min-h-[280px] flex items-end shadow-lg transition-transform hover:scale-105"
            style={{
              backgroundImage: `url(${LaporkanSampah})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="relative z-10 p-4 sm:p-6 pb-8 w-full">
              <h3 className="font-extrabold text-white text-lg sm:text-xl md:text-2xl mb-2 drop-shadow-lg">
                Laporkan sampah
              </h3>
              <p className="text-white text-xs sm:text-base md:text-lg drop-shadow-lg">
                Laporkan lingkungan yang tercemar oleh sampah melalui AdaSampah
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Background from "../../assets/Home/misi-kami-bg.png";

const missionItems = [
  {
    number: 1,
    text: "Memberdayakan masyarakat untuk melaporkan kerusakan alam.",
  },
  {
    number: 2,
    text: "Memberdayakan masyarakat untuk melaporkan kerusakan alam.",
  },
  {
    number: 3,
    text: "Memberdayakan masyarakat untuk melaporkan kerusakan alam.",
  },
];

const itemClass = "flex flex-col items-center text-center mx-2";

export default function HomeMisiKami() {
  return (
    <section
      className="mt-30 w-full min-h-[520px] bg-cover bg-no-repeat bg-center relative overflow-hidden flex items-center justify-center"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="w-full flex flex-col justify-center items-center sm:py-8 py-4 px-2 sm:px-6">
        <h2 className="font-extrabold text-xl sm:text-2xl md:text-3xl lg:text-[48px] text-white text-center mb-4 sm:mb-6">
          Misi Kami
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-4 sm:mt-6 w-full max-w-5xl">
          {missionItems.map((item, index) => (
            <div
              className={
                itemClass +
                " flex-1 min-w-0 max-w-full w-full px-2 flex flex-col items-center justify-start" +
                (missionItems.length % 2 === 1 &&
                index === missionItems.length - 1
                  ? " sm:col-span-2 sm:justify-self-center lg:col-span-1 lg:justify-self-auto"
                  : "")
              }
              key={item.number}
            >
              <h3
                className={
                  "font-bold mb-2 text-white p-[4px] border-4 border-solid border-[#D2CDAF] rounded-full flex items-center justify-center mx-auto text-lg sm:text-2xl md:text-3xl lg:text-4xl w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 mb-2 sm:mb-3"
                }
              >
                {item.number}
              </h3>
              <p
                className={
                  "text-center mx-auto mt-2 break-words whitespace-normal text-sm sm:text-base md:text-lg lg:text-xl max-w-[90vw] sm:max-w-[220px] md:max-w-[305px] text-white"
                }
              >
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

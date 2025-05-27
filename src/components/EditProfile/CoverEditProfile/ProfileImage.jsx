import pp from "../../../assets/EditProfile/pp.jpg";
import { MdOutlineModeEditOutline } from "react-icons/md";

export default function ProfileImage() {
  return (
    <section className="relative w-full bg-white pb-8">
      <div className="absolute left-1/2 -top-16 transform -translate-x-1/2 z-20">
        <img src={pp} alt="foto profile" className="w-28 h-28 md:w-32 md:h-32 rounded-full border-4 border-white object-cover shadow-lg bg-white" />
      </div>
      {/* Informasi User */}
      <div className="flex flex-col items-center pt-20">
        <p className="font-extrabold text-2xl md:text-3xl text-black leading-tight">Luo Feng</p>
        <p className="text-gray-500 text-base md:text-lg font-medium">yangpunyabimasakti</p>
      </div>
    </section>
  );
}

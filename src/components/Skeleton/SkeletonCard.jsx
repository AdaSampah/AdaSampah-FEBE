import React from "react";

const SkeletonCard = () => {
  return (
    <div className="cardKu shadow-[0px_2px_8px_0px_rgba(0,0,0,0.25)] lg:w-[360px] w-[320px] rounded-3xl flex flex-col overflow-hidden bg-white">
      <div className="p-4 flex-1 flex flex-col">
        {/* Profil */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
          <div>
            <p className="lg:text-smallText text-[12px] font-medium bg-gray-200 animate-pulse w-24 h-4 rounded"></p>
            <p className="lg:text-smallText text-[12px] text-[#8A8A8A] bg-gray-200 animate-pulse w-40 h-4 mt-1 rounded"></p>
          </div>
        </div>

        <p className="lg:text-smallText text-[12px] text-[#222] font-medium bg-gray-200 animate-pulse w-full h-16 my-2 rounded"></p>

        <div className="w-full aspect-[4/3] rounded-lg overflow-hidden bg-gray-200 animate-pulse"></div>

        <div className="flex items-center justify-between mt-4">
          <div className="cursor-pointer flex gap-4 items-center text-body text-[#5B5B5B]">
            <div className="w-5 h-5 bg-gray-200 animate-pulse rounded-full"></div>
            <div className="w-5 h-5 bg-gray-200 animate-pulse rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;

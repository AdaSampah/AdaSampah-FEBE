import React from "react";
import Card from "./Card";

export const LaporanPencarian = ({ searchParams, dataSampah }) => {
  const { keyword, regency } = searchParams;
  console.log(searchParams);
  const hasilPencarian = dataSampah.filter((item) => {
    const cocokKabupaten = regency ? item.regency.toLowerCase().includes(regency.toLowerCase()) : true;

    const cocokKeyword = keyword ? item.description.toLowerCase().includes(keyword.toLowerCase()) : true;

    return cocokKabupaten && cocokKeyword;
  });

  return (
    <div className="mt-12">
      <h3 className="md:text-[36px] text-2xl font-extrabold">Hasil Pencarian</h3>
      {hasilPencarian.length === 0 ? (
        <p className="text-gray-500">Tidak ada hasil ditemukan.</p>
      ) : (
        <div className="cardContainer flex flex-wrap justify-start gap-8 mt-12">
          {hasilPencarian.map((item, index) => (
            <Card dataSampah={item} key={index} />
          ))}
        </div>
      )}
    </div>
  );
};

import pp from "../../../assets/EditProfile/pp.jpg";
import { MdOutlineModeEditOutline } from "react-icons/md";

export default function EditData() {
  return (
    <section className="w-full max-w-3xl mx-auto bg-white rounded-lg p-8 mt-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-8 text-gray-800">Biodata Diri</h2>
      <form className="flex flex-col gap-6">
        {/* Nama Lengkap */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <label className="w-40 font-medium text-gray-700 pt-2">
            Nama Lengkap
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            defaultValue="Luo Feng"
          />
        </div>
        {/* Username */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <label className="w-40 font-medium text-gray-700 pt-2">
            Username
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            defaultValue="yangpunyabimasakti"
          />
        </div>
        {/* Email */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <label className="w-40 font-medium text-gray-700 pt-2">Email</label>
          <input
            type="email"
            className="border border-gray-300 rounded-md px-3 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-green-600"
            defaultValue="lupfeng77@gmail.com"
          />
        </div>
        {/* Foto Profil */}
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <label className="w-40 font-medium text-gray-700 pt-2">
            Foto Profil
            <br />
            <span className="text-xs font-normal">(160x160)</span>
          </label>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <img
              src={pp}
              alt="foto profile"
              className="w-20 h-20 rounded-md object-cover border border-gray-300 bg-white"
            />
            <div className="flex flex-col gap-1">
              <button
                type="button"
                className="flex items-center gap-2 border border-gray-400 rounded px-3 py-1 text-sm font-medium text-black hover:bg-gray-100 transition-colors"
              >
                Ubah Foto Profil{" "}
                <MdOutlineModeEditOutline className="text-base" />
              </button>
              <span className="text-xs text-gray-500 mt-1">
                Ukuran file maksimal 1 Mb
                <br />
                Berkas yang diperbolehkan: jpg, jpeg, png
              </span>
            </div>
          </div>
        </div>
        {/* Tombol aksi */}
        <div className="flex justify-end gap-4 mt-8">
          <button
            type="button"
            className="border border-gray-400 rounded px-5 py-2 font-medium text-gray-700 hover:bg-gray-100 transition-colors"
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-green-700 hover:bg-green-800 text-white font-medium rounded px-5 py-2 transition-colors"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </section>
  );
}

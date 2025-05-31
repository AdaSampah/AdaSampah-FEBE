import ppKosong from "../../../assets/Navbar/profile-icon.png";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import { axiosInstance } from "../../../config";

export default function EditData() {
  const { user, setUser } = useContext(UserContext);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(user?.profileUrl || ppKosong);

  useEffect(() => {
    setFullName(user?.fullName || "");
    setUsername(user?.username || "");
    setEmail(user?.email || "");
    setPreview(user?.profileUrl || ppKosong);
  }, [user]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.userId) {
      alert("User belum siap, silakan refresh halaman.");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("username", username);
      formData.append("email", email);
      if (photo) formData.append("photo", photo);

      const res = await axiosInstance.put(`/user/${user.userId}`, formData, {
        withCredentials: true,
      });

      if (res.data?.data) {
        setUser(res.data.data); // update context
        alert("Profil berhasil diupdate!");
      }
    } catch (err) {
      alert("Gagal update profil");
    }
  };

  return (
    <section className="w-full max-w-3xl mx-auto bg-white rounded-2xl p-10 mt-10 border border-gray-200 transition-all">
      <h2 className="text-3xl font-bold mb-10 text-gray-800 tracking-tight">
        Biodata Diri
      </h2>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
        {/* Nama Lengkap */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <label className="w-44 font-semibold text-gray-700 pt-2 text-base">
            Nama Lengkap
          </label>
          <input
            type="text"
            className="border border-gray-200 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-800 bg-gray-50"
            value={fullName}
            placeholder="Nama Lengkap"
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        {/* Username */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <label className="w-44 font-semibold text-gray-700 pt-2 text-base">
            Username
          </label>
          <input
            type="text"
            className="border border-gray-200 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-800 bg-gray-50"
            value={username}
            placeholder="Username"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        {/* Email */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <label className="w-44 font-semibold text-gray-700 pt-2 text-base">
            Email
          </label>
          <input
            type="email"
            className="border border-gray-200 rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-800 bg-gray-50"
            value={email}
            placeholder="email@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        {/* Foto Profil */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <label className="w-44 font-semibold text-gray-700 pt-2 text-base">
            Foto Profil
            <br />
            <span className="text-xs font-normal text-gray-400">(160x160)</span>
          </label>
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <img
              src={preview}
              alt="foto profile"
              className="w-24 h-24 rounded-xl object-cover border-2 border-gray-200 bg-white"
            />
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2 border border-gray-300 rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 bg-gray-50 hover:bg-green-50 hover:border-green-400 transition-colors cursor-pointer">
                <MdOutlineModeEditOutline className="text-lg text-green-600" />
                <span>Ubah Foto Profil</span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </label>
              <span className="text-xs text-gray-400 mt-1">
                Maksimal 1 Mb, format: jpg, jpeg, png
              </span>
            </div>
          </div>
        </div>
        {/* Tombol aksi */}
        <div className="flex justify-end gap-4 mt-10">
          <button
            type="button"
            className="border border-gray-300 rounded-lg px-6 py-2 font-semibold text-gray-600 bg-white hover:bg-gray-100 hover:border-green-400 transition-all"
            onClick={() => window.history.back()}
          >
            Batal
          </button>
          <button
            type="submit"
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg px-6 py-2 transition-all"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
    </section>
  );
}

import ppKosong from "../../../assets/Navbar/profile-icon.png";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../../context/UserContext";
import { axiosInstance } from "../../../config";
import { toast } from "react-hot-toast";
import { ImSpinner2 } from "react-icons/im";
import { validateUsername, validateEmail } from "../../../utils/validation";

export default function EditData() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState(user?.fullName || "");
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(user?.profileUrl || ppKosong);

  // State untuk error
  const [errors, setErrors] = useState({
    fullName: "",
    username: "",
    email: "",
  });

  useEffect(() => {
    setFullName(user?.fullName || "");
    setUsername(user?.username || "");
    setEmail(user?.email || "");
    setPreview(user?.profileUrl || ppKosong);
    setErrors({ fullName: "", username: "", email: "" });
  }, [user]);

  // Validation helpers
  const validateEmailFormat = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  // Real-time validation handlers
  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    setErrors((prev) => ({
      ...prev,
      fullName:
        e.target.value.trim() === "" ? "Nama lengkap tidak boleh kosong." : "",
    }));
  };

  const handleUsernameChange = (e) => {
    const value = e.target.value;
    setUsername(value);
    let errorMsg = "";
    if (value.trim() === "") {
      errorMsg = "Username tidak boleh kosong.";
    } else if (/\s/.test(value)) {
      errorMsg = "Username tidak boleh mengandung spasi.";
    } else if (!validateUsername(value)) {
      // Gunakan pesan error yang sama dengan validasi manual
      if (!/^[A-Za-z0-9_]+$/.test(value)) {
        errorMsg = "Username hanya boleh huruf, angka, dan underscore (_).";
      } else if (value.length < 3 || value.length > 20) {
        errorMsg = "Username harus 3-20 karakter.";
      } else if (/^_/.test(value) || /_$/.test(value)) {
        errorMsg = "Username tidak boleh diawali atau diakhiri underscore (_).";
      } else if (/__/.test(value)) {
        errorMsg =
          "Username tidak boleh mengandung dua underscore (__) berturut-turut.";
      } else {
        errorMsg = "Username tidak valid.";
      }
    }
    setErrors((prev) => ({
      ...prev,
      username: errorMsg,
    }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({
      ...prev,
      email: !validateEmail(e.target.value) ? "Format email tidak valid." : "",
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.userId) {
      toast.error("User belum siap, silakan refresh halaman.");
      return;
    }
    // Final validation before submit
    const newErrors = {};
    if (fullName.trim() === "")
      newErrors.fullName = "Nama lengkap tidak boleh kosong.";
    if (username.trim() === "")
      newErrors.username = "Username tidak boleh kosong.";
    else if (/\s/.test(username)) {
      newErrors.username = "Username tidak boleh mengandung spasi.";
    } else if (!validateUsername(username)) {
      if (!/^[A-Za-z0-9_]+$/.test(username)) {
        newErrors.username =
          "Username hanya boleh huruf, angka, dan underscore (_).";
      } else if (username.length < 3 || username.length > 20) {
        newErrors.username = "Username harus 3-20 karakter.";
      } else if (/^_/.test(username) || /_$/.test(username)) {
        newErrors.username =
          "Username tidak boleh diawali atau diakhiri underscore (_).";
      } else if (/__/.test(username)) {
        newErrors.username =
          "Username tidak boleh mengandung dua underscore (__) berturut-turut.";
      } else {
        newErrors.username = "Username tidak valid.";
      }
    }
    if (!validateEmail(email)) newErrors.email = "Format email tidak valid.";
    setErrors((prev) => ({ ...prev, ...newErrors }));
    if (Object.values(newErrors).some((v) => v)) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("fullName", fullName);
      formData.append("username", username);
      formData.append("email", email);
      if (photo) formData.append("profileUrl", photo);

      const res = await axiosInstance.put(`/user/${user.userId}`, formData, {
        withCredentials: true,
      });

      if (res.data?.data) {
        setUser(res.data.data); // update context
        toast.success("Profil berhasil diupdate!");
      }
    } catch (err) {
      toast.error("Gagal update profil");
    }
    setLoading(false);
  };

  return (
    <section className="w-full max-w-3xl mx-auto bg-white rounded-2xl p-10 mt-10 border border-gray-200 transition-all">
      <h2 className="text-3xl font-bold mb-10 text-gray-800 tracking-tight">
        Biodata Diri
      </h2>
      <form className="flex flex-col gap-8" onSubmit={handleSubmit} noValidate>
        {/* Nama Lengkap */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <label className="w-44 font-semibold text-gray-700 pt-2 text-base">
            Nama Lengkap
          </label>
          <div className="w-full max-w-md flex flex-col">
            <input
              type="text"
              className={`border border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-800 bg-gray-50 ${
                errors.fullName ? "border-red-500" : ""
              }`}
              value={fullName}
              placeholder="Nama Lengkap"
              onChange={handleFullNameChange}
              required
            />
            {errors.fullName && (
              <div className="text-red-500 text-xs mt-1">{errors.fullName}</div>
            )}
          </div>
        </div>
        {/* Username */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <label className="w-44 font-semibold text-gray-700 pt-2 text-base">
            Username
          </label>
          <div className="w-full max-w-md flex flex-col">
            <input
              type="text"
              className={`border border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-800 bg-gray-50 ${
                errors.username ? "border-red-500" : ""
              }`}
              value={username}
              placeholder="Username"
              onChange={handleUsernameChange}
              required
            />

            {errors.username && (
              <div className="text-red-500 text-xs mt-1">{errors.username}</div>
            )}
          </div>
        </div>
        {/* Email */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <label className="w-44 font-semibold text-gray-700 pt-2 text-base">
            Email
          </label>
          <div className="w-full max-w-md flex flex-col">
            <input
              type="email"
              className={`border border-gray-200 rounded-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all text-gray-800 bg-gray-50 ${
                errors.email ? "border-red-500" : ""
              }`}
              value={email}
              placeholder="email@gmail.com"
              onChange={handleEmailChange}
              required
            />
            {errors.email && (
              <div className="text-red-500 text-xs mt-1">{errors.email}</div>
            )}
          </div>
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
            className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold rounded-lg px-6 py-2 transition-all flex items-center justify-center"
            disabled={loading}
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <ImSpinner2 className="animate-spin h-5 w-5 text-white" />
                Menyimpan...
              </span>
            ) : (
              "Simpan Perubahan"
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

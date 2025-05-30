import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import mataBuka from "../assets/Login/mataBuka.svg";
import mataTutup from "../assets/Login/mataTutup.svg";
// import { Navbar2 } from "../components/Navbar/Navbar2";
import { axiosInstance } from "../config";
import { ImSpinner2 } from "react-icons/im";

import { UserContext } from "../context/UserContext";

const Daftar = () => {
  const { user } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fotoPengguna, setFotoPengguna] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [jumlahLaporan, setJumlahLaporan] = useState(0);

  // UX improvement states
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isClosed, setIsClosed] = useState(true);

  // Redirect if user is already logged in
  if (user) {
    return <Navigate to="/" replace />;
  }

  // Validation helpers
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (pw) =>
    pw.length >= 8 && /[A-Za-z]/.test(pw) && /\d/.test(pw);

  // Real-time validation
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrors((prev) => ({
      ...prev,
      username:
        e.target.value.trim() === "" ? "Username tidak boleh kosong." : "",
    }));
  };

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
    setErrors((prev) => ({
      ...prev,
      fullName:
        e.target.value.trim() === "" ? "Nama lengkap tidak boleh kosong." : "",
    }));
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({
      ...prev,
      email: !validateEmail(e.target.value) ? "Format email tidak valid." : "",
    }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({
      ...prev,
      password: !validatePassword(e.target.value)
        ? "Password minimal 8 karakter, kombinasi huruf & angka."
        : "",
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setSubmitError("");
    // Final validation before submit
    const newErrors = {};
    if (fullName.trim() === "")
      newErrors.fullName = "Nama lengkap tidak boleh kosong.";
    if (username.trim() === "")
      newErrors.username = "Username tidak boleh kosong.";
    if (!validateEmail(email)) newErrors.email = "Format email tidak valid.";
    if (!validatePassword(password))
      newErrors.password =
        "Password minimal 8 karakter, kombinasi huruf & angka.";
    setErrors(newErrors);
    if (Object.values(newErrors).some((v) => v)) return;

    setLoading(true);
    const newUser = {
      fullName,
      username,
      email,
      password,
      isAdmin,
      fotoPengguna,
      jumlahLaporan,
    };
    try {
      await axiosInstance.post("/user/register", newUser);
      setLoading(false);
      window.location.replace("/login");
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setSubmitError(error.response.data.message);
      } else {
        setSubmitError("Registrasi gagal. Silakan coba lagi.");
      }
    }
  };

  const toggleEye = () => {
    setIsClosed(!isClosed);
  };

  return (
    <>
      {/* <Navbar2 /> */}
      <main>
        <div className="container-register md:py-[120px] py-[100px] min-h-screen ">
          <div className="sm:w-[550px] w-[300px] mx-auto">
            <h1 className=" text-[32px] font-bold">
              Selamat Datang di{" "}
              <span className="text-greenSecondary">Ecotection</span> 👋
            </h1>
            <p className="login-text mt-3 text-[#666] font-medium text-[16px] ">
              Mari mulai buat akun anda
            </p>
            <form
              onSubmit={handleRegister}
              className="login-container mt-9 h-auto "
              noValidate
            >
              <div className="input2 flex flex-col mb-6">
                <label
                  htmlFor="fullName"
                  className="text-neutral-800 text-xl font-bold leading-normal"
                >
                  Nama Lengkap
                </label>
                <input
                  id="fullName"
                  type="text"
                  required
                  placeholder="Contoh: John Doe"
                  className={`border mt-2 rounded-md border-[#222] w-full py-3 px-4 text-tprimary outline-none ${
                    errors.fullName ? "border-red-500" : ""
                  }`}
                  onChange={handleFullNameChange}
                  value={fullName}
                  autoComplete="name"
                />
                {errors.fullName && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.fullName}
                  </div>
                )}
              </div>

              <div className="input2 flex flex-col mb-6">
                <label
                  htmlFor="username"
                  className="text-neutral-800 text-xl font-bold leading-normal"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  required
                  placeholder="Contoh: John Doe "
                  className={`border mt-2 rounded-md border-[#222] w-full py-3 px-4 text-tprimary outline-none ${
                    errors.username ? "border-red-500" : ""
                  }`}
                  onChange={handleUsernameChange}
                  value={username}
                  autoComplete="username"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Masukkan nama pengguna unik Anda.
                </div>
                {errors.username && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.username}
                  </div>
                )}
              </div>
              <div className="input2 flex flex-col mb-6">
                <label
                  htmlFor="email"
                  className="text-neutral-800 text-xl font-bold  leading-normal"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Contoh: JohnDoe@gmail.com "
                  className={`border mt-2 rounded-md border-[#222] w-full py-3 px-4 text-tprimary outline-none ${
                    errors.email ? "border-red-500" : ""
                  }`}
                  onChange={handleEmailChange}
                  value={email}
                  autoComplete="email"
                />

                {errors.email && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="input2 flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="text-neutral-800 text-xl font-bold  leading-normal"
                >
                  Password
                </label>
                {/* Input + icon in relative wrapper */}
                <div className="relative w-full">
                  <input
                    id="password"
                    type={isClosed ? "password" : "text"}
                    required
                    placeholder="Contoh: John123Doe "
                    className={`border mt-2 rounded-md border-[#222] w-full py-3 px-4 pr-12 text-tprimary outline-none ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    minLength="8"
                    onChange={handlePasswordChange}
                    value={password}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="eye-icon absolute top-1/2 -translate-y-1/2 right-4 flex items-center p-0 bg-transparent border-none cursor-pointer"
                    onClick={toggleEye}
                  >
                    {isClosed ? (
                      <img src={mataTutup} alt="mataTutup" className="w-5" />
                    ) : (
                      <img src={mataBuka} alt="mataTerbuka" className="w-5" />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.password}
                  </div>
                )}
              </div>
              <button
                type="submit"
                className="button-login w-full py-3 mt-2 text-white bg-[#096B68] text-xl font-bold rounded-md border-none transition duration-200 cursor-pointer  hover:bg-[#075A57] flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <ImSpinner2 className="animate-spin h-5 w-5 text-white" />
                    Mendaftar...
                  </span>
                ) : (
                  "Daftar"
                )}
              </button>
              <div className="text-center mt-4">
                <span className="text-stone-500 text-base font-medium  leading-normal">
                  Sudah punya akun?{" "}
                </span>
                <Link
                  to={"/login"}
                  className="text-[#38866C] text-base font-bold  underline leading-normal"
                >
                  Masuk sekarang
                </Link>
              </div>
              {submitError && (
                <p className="wrong-input mt-4 text-center text-red-500">
                  {submitError}
                </p>
              )}
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Daftar;

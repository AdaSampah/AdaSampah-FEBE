import React, { useContext, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import mataBuka from "../assets/Login/mataBuka.svg";
import mataTutup from "../assets/Login/mataTutup.svg";
import { MdLogin } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";
import { UserContext } from "../context/UserContext";
import { axiosInstance } from "../config";

const Masuk = () => {
  const [error, setError] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isClosed, setIsClosed] = useState(true);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");
  const [loading, setLoading] = useState(false);

  if (user) {
    return <Navigate to="/" replace />;
  }

  // Real-time validation
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrors((prev) => ({
      ...prev,
      username:
        e.target.value.trim() === "" ? "Username tidak boleh kosong." : "",
    }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({
      ...prev,
      password: e.target.value.length < 8 ? "Password minimal 8 karakter." : "",
    }));
  };

  const handleMasuk = async (e) => {
    e.preventDefault();
    setSubmitError("");
    // Final validation before submit
    const newErrors = {};
    if (username.trim() === "")
      newErrors.username = "Username tidak boleh kosong.";
    if (password.length < 8)
      newErrors.password = "Password minimal 8 karakter.";
    setErrors(newErrors);
    if (Object.values(newErrors).some((v) => v)) return;

    setLoading(true);
    try {
      const res = await axiosInstance.post(
        "/user/login",
        { username, password },
        { withCredentials: true }
      );
      console.log("RESPON DATA.DATA:", res.data.data);
      setUser(res.data.data);
      console.log("setUser selesai");

      setLoading(false);
      navigate("/");
      console.log("navigate selesai");
    } catch (error) {
      setLoading(false);
      console.error("LOGIN ERROR:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setSubmitError(error.response.data.message);
      } else {
        setSubmitError("Login gagal. Silakan cek username dan password Anda.");
      }
    }
  };

  const toggleEye = () => {
    setIsClosed(!isClosed);
  };
  return (
    <>
      <main>
        <div className="container-login md:py-[120px] py-[100px] ">
          <div className="sm:w-[550px] w-[300px] mx-auto">
            <h1 className="flex items-center sm:gap-4 gap-0 sm:justify-center justify-end text-[32px] font-bold">
              <MdLogin className="text-5xl sm:mx-0 mx-4" />
              <div>
                Masuk ke <span className="text-greenSecondary">AdaSampah</span>
              </div>
            </h1>
            <form
              onSubmit={handleMasuk}
              className="login-container mt-9 h-auto"
              noValidate
            >
              <div className="input1 mb-6 flex flex-col">
                <label
                  htmlFor="username"
                  className="text-neutral-800 text-xl font-bold leading-normal"
                >
                  Username:
                </label>
                <input
                  required
                  type="text"
                  id="username"
                  placeholder="Contoh: JohnDoe"
                  className={`border mt-2 rounded-md border-[#222] w-full py-3 px-4 text-tprimary outline-none ${
                    errors.username ? "border-red-500" : ""
                  }`}
                  onChange={handleUsernameChange}
                  value={username}
                  autoComplete="username"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Masukkan username yang telah terdaftar.
                </div>
                {errors.username && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.username}
                  </div>
                )}
              </div>
              <div className="input2 flex flex-col mb-6">
                <label
                  htmlFor="password"
                  className="text-neutral-800 text-xl font-bold leading-normal"
                >
                  Password:
                </label>
                {/* Input + icon in relative wrapper */}
                <div className="relative w-full">
                  <input
                    required
                    type={isClosed ? "password" : "text"}
                    id="password"
                    placeholder="Masukkan Password!"
                    className={`border mt-2 rounded-md border-[#222] w-full py-3 px-4 pr-12 text-tprimary outline-none ${
                      errors.password ? "border-red-500" : ""
                    }`}
                    onChange={handlePasswordChange}
                    value={password}
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    tabIndex={-1}
                    className="eye-icon absolute inset-y-0 right-0 flex items-center pr-4 cursor-pointer bg-transparent border-none"
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
                    Masuk...
                  </span>
                ) : (
                  "Login"
                )}
              </button>
              <p className="text-center mt-4 text-[#666] font-semibold">
                Belum punya akun?{" "}
                <Link to="/register" className=" text-[#38866C] underline">
                  Daftar Sekarang
                </Link>
              </p>
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

export default Masuk;

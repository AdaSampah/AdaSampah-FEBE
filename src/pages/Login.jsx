import React, { useContext, useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import mataBuka from "../assets/Login/mataBuka.svg";
import mataTutup from "../assets/Login/mataTutup.svg";
import { MdLogin } from "react-icons/md";
import { ImSpinner2 } from "react-icons/im";
import { UserContext } from "../context/UserContext";
import { axiosInstance } from "../config";
import { validateUsername, validateEmail } from "../utils/validation";

const Masuk = () => {
  const [error, setError] = useState(false);
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
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
  const handleUsernameOrEmailChange = (e) => {
    const value = e.target.value;
    setUsernameOrEmail(value);
    let errorMsg = "";
    if (value.trim() === "") {
      errorMsg = "Username atau email tidak boleh kosong.";
    } else if (value.includes("@")) {
      // Cek sebagai email
      if (!validateEmail(value)) {
        errorMsg = "Format email tidak valid.";
      }
    } else {
      // Cek sebagai username
      if (/\s/.test(value)) {
        errorMsg = "Username tidak boleh mengandung spasi.";
      } else if (!validateUsername(value)) {
        if (!/^[A-Za-z0-9_]+$/.test(value)) {
          errorMsg = "Username hanya boleh huruf, angka, dan underscore (_).";
        } else if (value.length < 3 || value.length > 20) {
          errorMsg = "Username harus 3-20 karakter.";
        } else if (/^_/.test(value) || /_$/.test(value)) {
          errorMsg =
            "Username tidak boleh diawali atau diakhiri underscore (_).";
        } else if (/__/.test(value)) {
          errorMsg =
            "Username tidak boleh mengandung dua underscore (__) berturut-turut.";
        } else {
          errorMsg = "Username tidak valid.";
        }
      }
    }
    setErrors((prev) => ({
      ...prev,
      usernameOrEmail: errorMsg,
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
    if (usernameOrEmail.trim() === "")
      newErrors.usernameOrEmail = "Username atau email tidak boleh kosong.";
    else if (usernameOrEmail.includes("@")) {
      if (!validateEmail(usernameOrEmail)) {
        newErrors.usernameOrEmail = "Format email tidak valid.";
      }
    } else {
      if (/\s/.test(usernameOrEmail)) {
        newErrors.usernameOrEmail = "Username tidak boleh mengandung spasi.";
      } else if (!validateUsername(usernameOrEmail)) {
        if (!/^[A-Za-z0-9_]+$/.test(usernameOrEmail)) {
          newErrors.usernameOrEmail =
            "Username hanya boleh huruf, angka, dan underscore (_).";
        } else if (usernameOrEmail.length < 3 || usernameOrEmail.length > 20) {
          newErrors.usernameOrEmail = "Username harus 3-20 karakter.";
        } else if (/^_/.test(usernameOrEmail) || /_$/.test(usernameOrEmail)) {
          newErrors.usernameOrEmail =
            "Username tidak boleh diawali atau diakhiri underscore (_).";
        } else if (/__/.test(usernameOrEmail)) {
          newErrors.usernameOrEmail =
            "Username tidak boleh mengandung dua underscore (__) berturut-turut.";
        } else {
          newErrors.usernameOrEmail = "Username tidak valid.";
        }
      }
    }
    if (password.length < 8)
      newErrors.password = "Password minimal 8 karakter.";
    setErrors(newErrors);
    if (Object.values(newErrors).some((v) => v)) return;

    setLoading(true);
    try {
      let payload = { password };
      if (usernameOrEmail.includes("@")) {
        payload.email = usernameOrEmail;
      } else {
        payload.username = usernameOrEmail;
      }
      const res = await axiosInstance.post("/user/login", payload, {
        withCredentials: true,
      });
      setUser(res.data.data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setSubmitError(error.response.data.message);
      } else {
        setSubmitError(
          "Login gagal. Silakan cek username/email dan password Anda."
        );
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
                  htmlFor="usernameOrEmail"
                  className="text-neutral-800 text-xl font-bold leading-normal"
                >
                  Username atau Email:
                </label>
                <input
                  required
                  type="text"
                  id="usernameOrEmail"
                  placeholder="Username atau Email"
                  className={`border mt-2 rounded-md border-[#222] w-full py-3 px-4 text-tprimary outline-none ${
                    errors.usernameOrEmail ? "border-red-500" : ""
                  }`}
                  onChange={handleUsernameOrEmailChange}
                  value={usernameOrEmail}
                  autoComplete="username"
                />
                {errors.usernameOrEmail && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.usernameOrEmail}
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
                    Menuggu...
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

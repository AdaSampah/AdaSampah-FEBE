import { useEffect, useState, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/Navbar/logo.svg";
import LogoMonochrome from "../../assets/Navbar/logo-monochrome.svg";
import logout from "../../assets/Navbar/logout.svg";
import news from "../../assets/Navbar/news.svg";
import editProfile from "../../assets/Navbar/editProfile.svg";
import ProfileIcon from "../../assets/Navbar/profile-icon.png";

import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { axiosInstance } from "../../config";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const { user, setUser } = useContext(UserContext);
  console.log("USER CONTEXT:", user);

  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileProfileDrawerOpen, setMobileProfileDrawerOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const mobileProfileDropdownRef = useRef(null);
  const location = useLocation();
  const handleToggleMenu = () => setMenuOpen((prev) => !prev);
  const handleProfileClick = () => setProfileDrawerOpen(true);
  const handleMobileProfileClick = () =>
    setMobileProfileDrawerOpen((prev) => !prev);
  const alwaysWhiteBgPaths = ["/login", "/register"];

  // Daftar path yang valid (selain NotFound)
  const validPaths = [
    "/",
    "/login",
    "/register",
    "/laporan",
    "/laporan/:id",
    "/laporkan",
    "/peta-sebaran",
    "/edit-profile",
    "/laporan-saya",
    "/disimpan",
    "/education",
  ];

  // Cek apakah path sekarang termasuk yang pake background putih
  const isAlwaysWhite =
    alwaysWhiteBgPaths.some((p) => location.pathname.startsWith(p)) ||
    /^\/laporan\/[^/]+$/.test(location.pathname) ||
    // Jika path tidak cocok dengan path valid, anggap NotFound
    !validPaths.some(
      (p) =>
        location.pathname === p || /^\/laporan\/[^/]+$/.test(location.pathname)
    );

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/user/logout", {}, { withCredentials: true });
      setUser(null);
      setProfileDrawerOpen(false);
      navigate("/login");
    } catch (err) {
      alert("Gagal logout. Silakan coba lagi.");
    }
  };

  const navbarClasses = `w-full left-0 top-0 z-50 fixed transition-all duration-300
  ${
    isAlwaysWhite
      ? "bg-white text-black shadow-sm"
      : scrolled
      ? "bg-white text-black shadow-sm"
      : "bg-transparent text-white shadow-none"
  }
  transition-colors transition-shadow`;

  // Handle scroll
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    // Cek posisi scroll saat mount
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const buttonMasuk = `hover:brightness-90 font-bold duration-150 w-[95px] h-[51px] px-6 py-4 rounded-[30px] border ${
    scrolled || isAlwaysWhite
      ? "border-black text-black"
      : "border-white text-white"
  } justify-center items-center gap-2.5 inline-flex`;

  //  Efek untuk close dropdown saat klik di luar (khusus desktop)
  useEffect(() => {
    if (!profileDrawerOpen) return;
    function handleClickOutside(e) {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(e.target)
      ) {
        setProfileDrawerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileDrawerOpen]);

  useEffect(() => {
    if (!mobileProfileDrawerOpen) return;
    function handleClickOutside(e) {
      if (
        mobileProfileDropdownRef.current &&
        !mobileProfileDropdownRef.current.contains(e.target)
      ) {
        setMobileProfileDrawerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileProfileDrawerOpen]);

  // Animasi Navbar muncul dari atas setiap kali route berubah
  const navbarRef = useRef(null);
  useEffect(() => {
    const navbar = navbarRef.current;
    if (!navbar) return;

    // View Transition API
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        navbar.animate(
          [
            { transform: "translateY(-100%)", opacity: 0 },
            { transform: "translateY(0)", opacity: 1 },
          ],
          { duration: 400, easing: "cubic-bezier(.4,0,.2,1)" }
        );
      });
    } else {
      // Fallback Animation API
      navbar.animate(
        [
          { transform: "translateY(-100%)", opacity: 0 },
          { transform: "translateY(0)", opacity: 1 },
        ],
        { duration: 400, easing: "cubic-bezier(.4,0,.2,1)" }
      );
    }
  }, [location.pathname]);

  return (
    <>
      <header
        ref={navbarRef}
        className={navbarClasses}
        style={{
          backdropFilter: !scrolled && !isAlwaysWhite ? "blur(2px)" : "none",
        }}
      >
        <div className="max-w-screen-xl mx-auto w-full flex items-center justify-between px-4 py-3 h-[72px] md:h-[104px]">
          {/* Logo kiri */}
          <div className="flex items-center flex-shrink-0 min-w-0">
            <Link to="/">
              <img
                src={isAlwaysWhite || scrolled ? Logo : LogoMonochrome}
                alt="Logo"
                className="h-8 w-auto md:h-12 lg:h-15 min-w-0 max-w-[120px] md:max-w-[160px] lg:max-w-[200px] object-contain mt-[-4px] md:mt-[-8px] mr-[-10px] md:mr-[-15px] transition-all duration-200"
                style={{ aspectRatio: "auto 4/3" }}
              />
            </Link>
            {/* <Link
              to="/"
              className={`font-extrabold text-lg md:text-2xl ${
                scrolled || isAlwaysWhite
                  ? "text-[#24BBB1]"
                  : "text-white drop-shadow"
              } ml-2 md:ml-3`}
            >
              AdaSampah
            </Link> */}
          </div>
          {/* Desktop menu */}
          <nav className="hidden md:flex flex-1 justify-center">
            <ul className="flex gap-6">
              <li>
                <Link
                  to="/"
                  className={`font-semibold transition-colors hover:text-[#24BBB1] relative pb-2
                  ${
                    location.pathname === "/"
                      ? "text-[#24BBB1] font-bold after:content-[''] after:block after:absolute after:left-0 after:right-0 after:mx-auto after:-bottom-1.5 after:w-2/3 after:h-1 after:rounded-full after:bg-[#24BBB1] after:opacity-80"
                      : isAlwaysWhite || scrolled
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  Beranda
                </Link>
              </li>
              {!(user && user.role === "admin") && (
                <li>
                  <Link
                    to="/laporkan"
                    className={`font-semibold transition-colors hover:text-[#24BBB1] relative pb-2
                  ${
                    location.pathname === "/laporkan"
                      ? "text-[#24BBB1] font-bold after:content-[''] after:block after:absolute after:left-0 after:right-0 after:mx-auto after:-bottom-1.5 after:w-2/3 after:h-1 after:rounded-full after:bg-[#24BBB1] after:opacity-80"
                      : isAlwaysWhite || scrolled
                      ? "text-black"
                      : "text-white"
                  }`}
                  >
                    Laporkan
                  </Link>
                </li>
              )}
              <li>
                <Link
                  to="/laporan"
                  className={`font-semibold transition-colors hover:text-[#24BBB1] relative pb-2
                  ${
                    location.pathname === "/laporan"
                      ? "text-[#24BBB1] font-bold after:content-[''] after:block after:absolute after:left-0 after:right-0 after:mx-auto after:-bottom-1.5 after:w-2/3 after:h-1 after:rounded-full after:bg-[#24BBB1] after:opacity-80"
                      : isAlwaysWhite || scrolled
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  Laporan
                </Link>
              </li>
              <li>
                <Link
                  to="/peta-sebaran"
                  className={`font-semibold transition-colors hover:text-[#24BBB1] relative pb-2
                  ${
                    location.pathname === "/peta-sebaran"
                      ? "text-[#24BBB1] font-bold after:content-[''] after:block after:absolute after:left-0 after:right-0 after:mx-auto after:-bottom-1.5 after:w-2/3 after:h-1 after:rounded-full after:bg-[#24BBB1] after:opacity-80"
                      : isAlwaysWhite || scrolled
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  Peta Sebaran
                </Link>
              </li>
              <li>
                <Link
                  to="/education"
                  className={`font-semibold transition-colors hover:text-[#24BBB1] relative pb-2
                  ${
                    location.pathname === "/education"
                      ? "text-[#24BBB1] font-bold after:content-[''] after:block after:absolute after:left-0 after:right-0 after:mx-auto after:-bottom-1.5 after:w-2/3 after:h-1 after:rounded-full after:bg-[#24BBB1] after:opacity-80"
                      : isAlwaysWhite || scrolled
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  Kenali Sampahmu
                </Link>
              </li>
            </ul>
          </nav>
          {/* Profile */}
          <div className="hidden md:flex items-center gap-4 flex-shrink-0 relative w-[212.63px] justify-center">
            {!!user ? (
              <>
                <img
                  src={user?.profileUrl || ProfileIcon}
                  alt="Profile"
                  className="user-profile w-13 h-13 rounded-full cursor-pointer object-cover border-2 border-[#24BBB1] shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-lg bg-white"
                  onClick={handleProfileClick}
                />
                {/* Dropdown Profile Drawer */}
                {
                  <div
                    ref={profileDropdownRef}
                    className={`absolute right-[50px] top-[150%] mt-4 z-50 w-56 bg-white shadow-lg rounded-lg p-4 min-h-[120px] flex flex-col transition-all duration-300 ease-in-out transform
                    ${
                      profileDrawerOpen
                        ? "opacity-100 scale-100 pointer-events-auto"
                        : "opacity-0 scale-95 pointer-events-none"
                    }`}
                  >
                    <h2
                      className="font-bold text-lg text-black mb-2 truncate max-w-xs"
                      title={user?.fullName}
                    >
                      {user?.fullName}
                    </h2>
                    <p
                      className="text-gray-500 text-l mb-4 font-semibold truncate max-w-xs"
                      title={user?.email}
                    >
                      {user?.email}
                    </p>
                    <hr />
                    <div className="flex-1">
                      <Link
                        to="/laporan-saya"
                        onClick={() => setProfileDrawerOpen(false)}
                      >
                        <div className="text-black flex items-center gap-3 mt-2 hover:bg-gray-100 duration-150 cursor-pointer px-4 py-2">
                          <img src={news} alt="news" />
                          <p>Laporan Saya</p>
                        </div>
                      </Link>
                      <Link
                        to="/edit-profile"
                        onClick={() => setProfileDrawerOpen(false)}
                      >
                        <div className="text-black flex items-center gap-3 mt-2 hover:bg-gray-100 duration-150 cursor-pointer px-4 py-2">
                          <img
                            src={editProfile}
                            alt="edit"
                            className="md:w-7 w-5"
                          />
                          <p className="md:text-normal text-smallText">
                            Edit Profile
                          </p>
                        </div>
                      </Link>
                      <div
                        className="text-[#B3261E] flex items-center gap-3 mt-2 hover:bg-gray-100 duration-150 cursor-pointer px-4 py-2"
                        onClick={handleLogout}
                      >
                        <img src={logout} alt="logout" className="md:w-7 w-5" />
                        <p className="font-semibold md:text-normal text-smallText">
                          Keluar
                        </p>
                      </div>
                    </div>
                  </div>
                }
              </>
            ) : (
              <div className="flex gap-4">
                <Link to="/login" className={buttonMasuk}>
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`border border-white rounded-[40px] font-bold px-5 py-2 text-center transition-colors flex items-center justify-center ${
                    scrolled || isAlwaysWhite
                      ? "bg-[#24BBB1] text-white hover:bg-[#064e4c]"
                      : "bg-white text-black hover:bg-gray-200"
                  }`}
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          {/* Hamburger menu (mobile) */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 ml-auto"
            onClick={handleToggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>
          {/* Mobile menu drawer */}
          <nav
            className={`fixed top-0 right-0 z-50 w-4/5 max-w-xs h-screen bg-white shadow-lg transform transition-transform duration-200 ${
              menuOpen ? "translate-x-0" : "translate-x-full"
            } md:hidden flex flex-col`}
            style={{ minWidth: "240px" }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center gap-2 px-6 py-5">
                <img src={Logo} alt="Logo" className=" h-8" />
                {/* <span className="font-bold text-black text-xl">AdaSampah</span> */}
              </div>
              <ul className="flex flex-col gap-2 px-6 py-6 flex-1 bg-white">
                <li>
                  <Link
                    to="/"
                    className={`block text-black font-semibold py-2 px-2 rounded transition-colors hover:bg-[#e0f7f6] hover:text-[#24BBB1] relative pb-2
                    ${
                      location.pathname === "/"
                        ? "bg-[#e0f7f6] text-[#24BBB1] font-bold"
                        : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Beranda
                  </Link>
                </li>
                {!(user && user.role === "admin") && (
                  <li>
                    <Link
                      to="/laporkan"
                      className={`block text-black font-semibold py-2 px-2 rounded transition-colors hover:bg-[#e0f7f6] hover:text-[#24BBB1] relative pb-2
                    ${
                      location.pathname === "/laporkan"
                        ? "bg-[#e0f7f6] text-[#24BBB1] font-bold"
                        : ""
                    }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      Laporkan
                    </Link>
                  </li>
                )}
                <li>
                  <Link
                    to="/laporan"
                    className={`block text-black font-semibold py-2 px-2 rounded transition-colors hover:bg-[#e0f7f6] hover:text-[#24BBB1] relative pb-2
                    ${
                      location.pathname === "/laporan"
                        ? "bg-[#e0f7f6] text-[#24BBB1] font-bold"
                        : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Laporan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/peta-sebaran"
                    className={`block text-black font-semibold py-2 px-2 rounded transition-colors hover:bg-[#e0f7f6] hover:text-[#24BBB1] relative pb-2
                    ${
                      location.pathname === "/peta-sebaran"
                        ? "bg-[#e0f7f6] text-[#24BBB1] font-bold"
                        : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Peta Sebaran
                  </Link>
                </li>
                <li>
                  <Link
                    to="/education"
                    className={`block text-black font-semibold py-2 px-2 rounded transition-colors hover:bg-[#e0f7f6] hover:text-[#24BBB1] relative pb-2
                    ${
                      location.pathname === "/education"
                        ? "bg-[#e0f7f6] text-[#24BBB1] font-bold"
                        : ""
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    Kenali Sampahmu
                  </Link>
                </li>
              </ul>
              <div className="px-6 pb-8 bg-white">
                {!!user ? (
                  <div className="relative flex flex-col items-center">
                    <img
                      src={user?.profileUrl || ProfileIcon}
                      alt="Profile"
                      className="w-15 h-15 rounded-full mx-auto cursor-pointer border-2 border-[#24BBB1] shadow-md transition-transform duration-200 hover:scale-105 hover:shadow-lg bg-white"
                      onClick={handleMobileProfileClick}
                    />
                    {/* Dropdown Profile Drawer Mobile */}
                    {
                      <div
                        ref={mobileProfileDropdownRef}
                        className={`absolute right-0 bottom-full mb-4 z-50 w-54 bg-white shadow-lg rounded-lg p-4 min-h-[120px] flex flex-col transition-all duration-300 ease-in-out transform
                        ${
                          mobileProfileDrawerOpen
                            ? "opacity-100 scale-100 pointer-events-auto"
                            : "opacity-0 scale-95 pointer-events-none"
                        }`}
                      >
                        <h2
                          className="font-bold text-lg mb-2 text-black truncate max-w-xs"
                          title={user?.fullName}
                        >
                          {user?.fullName}
                        </h2>
                        <p
                          className="text-gray-500 text-l mb-4 font-semibold truncate max-w-xs"
                          title={user?.email}
                        >
                          {user?.email}
                        </p>
                        <hr />
                        <div className="flex-1">
                          <Link
                            to="/laporan-saya"
                            onClick={() => setMenuOpen(false)}
                          >
                            <div className="text-black flex items-center gap-3 mt-2 hover:bg-gray-100 duration-150 cursor-pointer px-4 py-2">
                              <img src={news} alt="news" />
                              <p>Laporan Saya</p>
                            </div>
                          </Link>
                          <Link
                            to="/edit-profile"
                            onClick={() => setMenuOpen(false)}
                          >
                            <div className="text-black flex items-center gap-3 mt-2 hover:bg-gray-100 duration-150 cursor-pointer px-4 py-2">
                              <img
                                src={editProfile}
                                alt="news"
                                className="md:w-7 w-5"
                              />
                              <p className="font-semibold md:text-normal text-smallText ">
                                Edit Profile
                              </p>
                            </div>
                          </Link>
                          <div
                            className="text-[#B3261E] flex items-center gap-3 mt-2 hover:bg-gray-100 duration-150 cursor-pointer px-4 py-2"
                            onClick={handleLogout}
                          >
                            <img
                              src={logout}
                              alt="news"
                              className="md:w-7 w-5"
                            />
                            <p className="font-semibold md:text-normal text-smallText">
                              Keluar
                            </p>
                          </div>
                        </div>
                      </div>
                    }
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/login"
                      className="border border-[#24BBB1] text-[#24BBB1] px-5 py-2 font-bold rounded-[40px] text-center transition-colors hover:bg-[#e0f7f6] flex items-center justify-center min-h-[44px]"
                      onClick={() => setMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="border border-[#24BBB1] bg-[#24BBB1] font-bold text-white px-5 py-2 rounded-[40px] text-center transition-colors hover:bg-[#064e4c] flex items-center justify-center min-h-[44px]"
                      onClick={() => setMenuOpen(false)}
                    >
                      Register
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </nav>
        </div>
      </header>
      {/* Overlay blur untuk menutup drawer jika klik di luar drawer (best practice: di luar header) */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}

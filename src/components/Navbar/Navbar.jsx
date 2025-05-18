import { useEffect, useState, useRef } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../../assets/Navbar/vite.svg";
import logout from "../../assets/Navbar/logout.svg";
import news from "../../assets/Navbar/news.svg";
import editProfile from "../../assets/Navbar/editProfile.svg";

export default function Navbar({ isLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileProfileDrawerOpen, setMobileProfileDrawerOpen] = useState(false);
  const profileDropdownRef = useRef(null);
  const handleToggleMenu = () => setMenuOpen((prev) => !prev);
  const handleProfileClick = () => setProfileDrawerOpen(true);
  const handleMobileProfileClick = () => setMobileProfileDrawerOpen(true);
  const handleCloseMobileProfileDrawer = () =>
    setMobileProfileDrawerOpen(false);

  // Handle scroll
  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 1) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    }

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Navbar selalu fixed, transisi smooth pada bg, text, shadow
  const navbarClasses = `w-full left-0 top-0 z-50 fixed transition-all duration-300
    ${
      scrolled
        ? "bg-white text-black shadow-sm"
        : "bg-transparent text-white shadow-none"
    }
    transition-colors transition-shadow`;
  const buttonMasuk = `hover:brightness-90 duration-150 w-[95px] h-[51px] px-6 py-4 rounded-[30px] border ${
    scrolled ? "border-black text-black" : "border-white text-white"
  } justify-center items-center gap-2.5 inline-flex`;

  // Tambahkan efek untuk close dropdown saat klik di luar (khusus desktop)
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

  return (
    <header
      className={navbarClasses}
      style={{ backdropFilter: !scrolled ? "blur(2px)" : "none" }}
    >
      <div className="max-w-screen-xl mx-auto w-full flex items-center justify-between px-4 py-3 h-[72px] md:h-[104px]">
        {/* Logo kiri */}
        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
          <img src={Logo} alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
          <a
            href="/"
            className={`font-extrabold text-xl md:text-2xl ${
              scrolled ? "text-[#096B68]" : "text-white drop-shadow"
            }`}
          >
            AdaSampah
          </a>
        </div>
        {/* Desktop menu */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-6">
            <li>
              <a
                href="/"
                className={`font-semibold transition-colors hover:text-[#096B68] ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                Beranda
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`font-semibold transition-colors hover:text-[#096B68] ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                Laporkan
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`font-semibold transition-colors hover:text-[#096B68] ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                Laporan
              </a>
            </li>
            <li>
              <a
                href="#"
                className={`font-semibold transition-colors hover:text-[#096B68] ${
                  scrolled ? "text-black" : "text-white"
                }`}
              >
                Tentang Kami
              </a>
            </li>
          </ul>
        </nav>
        {/* Profile */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0 relative w-[212.63px] justify-center">
          {isLogin ? (
            <>
              <img
                src={Logo}
                alt="Profile"
                className="user-profile w-10 h-10 rounded-full cursor-pointer object-cover"
                onClick={handleProfileClick}
              />
              {/* Dropdown Profile Drawer */}
              {profileDrawerOpen && (
                <>
                  {/* Overlay transparan untuk klik di luar dropdown */}
                  <div
                    ref={profileDropdownRef}
                    className="absolute right-[50px] top-[150%] mt-4 z-50 w-56 bg-white shadow-lg rounded-lg p-4 min-h-[120px] flex flex-col"
                  >
                    <h2 className="font-bold text-lg text-black mb-2">Ujang</h2>
                    <p className="text-gray-500 text-l mb-4 font-semibold">
                      ujang@gmail.com
                    </p>
                    <hr />
                    <div className="flex-1">
                      <div className="text-black flex items-center gap-3 mt-2 hover:bg-gray-100 duration-150 cursor-pointer px-4 py-2">
                        <img src={news} alt="news" />
                        <p>Laporan Saya</p>
                      </div>
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
                      <div className="text-[#B3261E] flex items-center gap-3 mt-2 hover:bg-gray-100 duration-150 cursor-pointer px-4 py-2">
                        <img src={logout} alt="logout" className="md:w-7 w-5" />
                        <p className="font-semibold md:text-normal text-smallText">
                          Keluar
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          ) : (
            <div className="flex gap-4">
              <a href="#" className={buttonMasuk}>
                Login
              </a>
              <a
                href="#"
                className={`border border-[#096B68] rounded-[40px] px-5 py-2 text-center transition-colors flex items-center justify-center ${
                  scrolled
                    ? "bg-[#096B68] text-white hover:bg-[#064e4c]"
                    : "bg-white text-black hover:bg-gray-200"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                Register
              </a>
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
        {/* Overlay transparan untuk menutup drawer jika klik di luar drawer */}
        {menuOpen && (
          <div
            className="fixed inset-0 z-40 bg-transparent md:hidden"
            onClick={() => setMenuOpen(false)}
          />
        )}
        {/* Mobile menu drawer */}
        <nav
          className={`fixed top-0 right-0 z-50 w-4/5 max-w-xs h-screen bg-white shadow-lg transform transition-transform duration-200 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          } md:hidden flex flex-col`}
          style={{ minWidth: "240px" }}
        >
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-2 px-6 py-5">
              <img src={Logo} alt="Logo" className="w-8 h-8" />
              <span className="font-bold text-black text-xl">AdaSampah</span>
            </div>
            <ul className="flex flex-col gap-2 px-6 py-6 flex-1 bg-white">
              <li>
                <a
                  href="/"
                  className="block text-black font-semibold py-2 px-2 rounded transition-colors hover:bg-[#e0f7f6] hover:text-[#096B68]"
                  onClick={() => setMenuOpen(false)}
                >
                  Beranda
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block text-black font-semibold py-2 px-2 rounded transition-colors hover:bg-[#e0f7f6] hover:text-[#096B68]"
                  onClick={() => setMenuOpen(false)}
                >
                  Laporkan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block text-black font-semibold py-2 px-2 rounded transition-colors hover:bg-[#e0f7f6] hover:text-[#096B68]"
                  onClick={() => setMenuOpen(false)}
                >
                  Laporan
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block text-black font-semibold py-2 px-2 rounded transition-colors hover:bg-[#e0f7f6] hover:text-[#096B68]"
                  onClick={() => setMenuOpen(false)}
                >
                  Tentang Kami
                </a>
              </li>
            </ul>
            <div className="px-6 pb-8 bg-white">
              {isLogin ? (
                <div className="relative flex flex-col items-center">
                  <img
                    src={Logo}
                    alt="Profile"
                    className="w-10 h-10 rounded-full mx-auto cursor-pointer"
                    onClick={handleMobileProfileClick}
                  />
                  {/* Dropdown Profile Drawer Mobile */}
                  {mobileProfileDrawerOpen && (
                    <>
                      {/* Overlay transparan untuk klik di luar dropdown */}
                      <div
                        className="fixed inset-0 z-50"
                        onClick={handleCloseMobileProfileDrawer}
                      />
                      <div className="absolute right-0 bottom-full mb-4 z-50 w-54 bg-white shadow-lg rounded-lg p-4 min-h-[120px] flex flex-col">
                        <h2 className="font-bold text-lg mb-2 text-black">
                          Ujang
                        </h2>
                        <p className="text-gray-500 text-l mb-4 font-semibold">
                          {" "}
                          ujang@gmail.com
                        </p>
                        <hr />
                        <div className="flex-1">
                          <div className="text-black flex items-center gap-3 mt-2 hover:bg-gray-100 duration-150 cursor-pointer px-4 py-2">
                            <img src={news} alt="news" />
                            <p>Laporan Saya</p>
                          </div>
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
                          <div className="text-[#B3261E] flex items-center gap-3 mt-2 hover:bg-gray-100 duration-150 cursor-pointer px-4 py-2">
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
                    </>
                  )}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <a
                    href="#"
                    className="border border-[#096B68] text-[#096B68] px-5 py-2 rounded-[40px] text-center transition-colors hover:bg-[#e0f7f6] flex items-center justify-center min-h-[44px]"
                    onClick={() => setMenuOpen(false)}
                  >
                    Login
                  </a>
                  <a
                    href="#"
                    className="border border-[#096B68] bg-[#096B68] text-white px-5 py-2 rounded-[40px] text-center transition-colors hover:bg-[#064e4c] flex items-center justify-center min-h-[44px]"
                    onClick={() => setMenuOpen(false)}
                  >
                    Register
                  </a>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

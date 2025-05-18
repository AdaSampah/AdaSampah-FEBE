import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import Logo from "../../assets/Navbar/vite.svg";
import { Link } from "react-router-dom";
import logout from "../../assets/Navbar/logout.svg";
import news from "../../assets/Navbar/news.svg";
import editProfile from "../../assets/Navbar/editProfile.svg";

export default function Navbar({ isLogin }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileDrawerOpen, setProfileDrawerOpen] = useState(false);
  const [mobileProfileDrawerOpen, setMobileProfileDrawerOpen] = useState(false);
  const handleToggleMenu = () => setMenuOpen((prev) => !prev);
  const handleProfileClick = () => setProfileDrawerOpen(true);
  const handleCloseProfileDrawer = () => setProfileDrawerOpen(false);
  const handleMobileProfileClick = () => setMobileProfileDrawerOpen(true);
  const handleCloseMobileProfileDrawer = () =>
    setMobileProfileDrawerOpen(false);

  return (
    <header className="relative bg-white shadow-md">
      <div className="max-w-screen-xl mx-auto w-full flex items-center justify-between px-4 py-3 h-[72px] md:h-[104px]">
        {/* Logo kiri */}
        <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
          <img src={Logo} alt="Logo" className="w-8 h-8 md:w-10 md:h-10" />
          <h1 className="font-extrabold text-xl md:text-2xl text-[#096B68]">
            AdaSampah
          </h1>
        </div>
        {/* Desktop menu */}
        <nav className="hidden md:flex flex-1 justify-center">
          <ul className="flex gap-6">
            <li>
              <a
                href="/"
                className="font-semibold transition-colors hover:text-[#096B68]"
              >
                Beranda
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-semibold transition-colors hover:text-[#096B68]"
              >
                Laporkan
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-semibold transition-colors hover:text-[#096B68]"
              >
                Laporan
              </a>
            </li>
            <li>
              <a
                href="#"
                className="font-semibold transition-colors hover:text-[#096B68]"
              >
                Tentang Kami
              </a>
            </li>
          </ul>
        </nav>
        {/* Profile/ */}
        <div className="hidden md:flex items-center gap-4 flex-shrink-0 relative">
          {isLogin ? (
            <>
              <img
                src={Logo}
                alt="Profile"
                className="user-profile w-[198.39px] h-10 rounded-full cursor-pointer"
                onClick={handleProfileClick}
              />
              {/* Dropdown Profile Drawer */}
              {profileDrawerOpen && (
                <>
                  {/* Overlay transparan untuk klik di luar dropdown */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={handleCloseProfileDrawer}
                  />
                  <div className="absolute -left-[100px] top-[180%] z-50 w-54 bg-white shadow-lg rounded-lg p-4 min-h-[120px] flex flex-col">
                    <h2 className="font-bold text-lg mb-2">Ujang</h2>
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
                        <p className=" md:text-normal text-smallText ">
                          Edit Profile
                        </p>
                      </div>
                      <div className="text-[#B3261E] flex items-center gap-3 mt-2 hover:bg-gray-100 duration-150 cursor-pointer px-4 py-2">
                        <img src={logout} alt="news" className="md:w-7 w-5" />
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
              <a
                href="#"
                className="border border-[#096B68] text-[#096B68] px-5 py-2 rounded-[40px] transition-colors hover:bg-[#e0f7f6]"
              >
                Login
              </a>
              <a
                href="#"
                className="border border-[#096B68] bg-[#096B68] text-white px-5 py-2 rounded-[40px] transition-colors hover:bg-[#064e4c]"
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
      </div>
      {/* Overlay transparan untuk menutup drawer jika klik di luar drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent md:hidden"
          onClick={() => setMenuOpen(false)}
        />
      )}
      {/* Mobile menu drawer */}
      <nav
        className={`fixed top-0 right-0 z-50 w-4/5 max-w-xs h-full bg-white shadow-lg transform transition-transform duration-200 ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden flex flex-col`}
        style={{ minWidth: "240px" }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 px-6 py-5 border-b">
            <img src={Logo} alt="Logo" className="w-8 h-8" />
            <span className="font-bold text-xl">AdaSampah</span>
          </div>
          <ul className="flex flex-col gap-2 px-6 py-6 flex-1">
            <li>
              <a
                href="/"
                className="block font-semibold py-2 px-2 rounded transition-colors hover:bg-[#e0f7f6] hover:text-[#096B68]"
                onClick={() => setMenuOpen(false)}
              >
                Beranda
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block font-semibold py-2 px-2 rounded transition-colors hover:bg-[#e0f7f6] hover:text-[#096B68]"
                onClick={() => setMenuOpen(false)}
              >
                Laporkan
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block font-semibold py-2 px-2 rounded transition-colors hover:bg-[#e0f7f6] hover:text-[#096B68]"
                onClick={() => setMenuOpen(false)}
              >
                Laporan
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block font-semibold py-2 px-2 rounded transition-colors hover:bg-[#e0f7f6] hover:text-[#096B68]"
                onClick={() => setMenuOpen(false)}
              >
                Tentang Kami
              </a>
            </li>
          </ul>
          <div className="px-6 pb-8">
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
                      className="fixed inset-0 z-40"
                      onClick={handleCloseMobileProfileDrawer}
                    />
                    <div className="absolute right-0 bottom-full mb-4 z-50 w-54 bg-white shadow-lg rounded-lg p-4 min-h-[120px] flex flex-col">
                      <h2 className="font-bold text-lg mb-2">Ujang</h2>
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
                          <img src={logout} alt="news" className="md:w-7 w-5" />
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
                  className="border border-[#096B68] text-[#096B68] px-5 py-2 rounded-[40px] text-center transition-colors hover:bg-[#e0f7f6]"
                  onClick={() => setMenuOpen(false)}
                >
                  Login
                </a>
                <a
                  href="#"
                  className="border border-[#096B68] bg-[#096B68] text-white px-5 py-2 rounded-[40px] text-center transition-colors hover:bg-[#064e4c]"
                  onClick={() => setMenuOpen(false)}
                >
                  Register
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Laporan } from "./pages/Laporan";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import React, { useState } from "react";
import Laporkan from "./pages/Laporkan";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import EditProfile from "./pages/EditProfile";
import ScrollToTop from "./components/ScrollToTop";
import DetailLaporan from "./pages/DetailLaporan";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  function handleLogin() {
    setIsLogin(!isLogin);
  }
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar isLogin={isLogin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/laporan/:id" element={<DetailLaporan />} />
        <Route path="/laporkan" element={<Laporkan />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
      <button onClick={handleLogin} className="p-4 bg-blue-500 text-white rounded mt-9">
        {" "}
        Cek Login bang ko
      </button>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

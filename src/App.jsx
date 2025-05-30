import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Laporan } from "./pages/Laporan";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import React, { useState } from "react";
import Laporkan from "./pages/Laporkan";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import Daftar from "./pages/Daftar";
import Masuk from "./pages/Masuk";
import PetaSebaran from "./pages/PetaSebaran";
import EditProfile from "./pages/EditProfile";
import ScrollToTop from "./components/ScrollToTop";
import DetailLaporan from "./pages/DetailLaporan";
import LaporanSaya from "./pages/LaporanSaya";
import LaporanUser from "./components/LaporanSaya/LaporanUser";
import LaporanDisimpan from "./components/LaporanSaya/LaporanDisimpan";

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
        <Route path="/daftar" element={<Daftar />} />
        <Route path="/masuk" element={<Masuk />} />
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/laporan/:id" element={<DetailLaporan />} />
        <Route path="/laporkan" element={<Laporkan />} />
        <Route path="/peta-sebaran" element={<PetaSebaran />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/" element={<LaporanSaya />}>
          <Route path="laporan-saya" element={<LaporanUser />} />
          <Route path="disimpan" element={<LaporanDisimpan />} />
        </Route>
      </Routes>
     
      <Footer />
    </BrowserRouter>
  );
}

export default App;

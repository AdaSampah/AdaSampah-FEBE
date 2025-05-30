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
        <Route path="/laporkan" element={<Laporkan />} />
        <Route path="/peta-sebaran" element={<PetaSebaran />} />
        <Route path="/edit-profile" element={<EditProfile />} />
      </Routes>
     
      <Footer />
    </BrowserRouter>
  );
}

export default App;

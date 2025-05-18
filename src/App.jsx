import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Laporan } from "./pages/Laporan";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import React, { useState } from "react";
import Laporkan from "./pages/Laporkan";
import Footer from "./components/Footer/Footer";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  function handleLogin() {
    setIsLogin(!isLogin);
  }
  return (
    <BrowserRouter>
      <Navbar isLogin={isLogin} />
      <Routes>
        <Route path="/" element={<div />} />{" "}
        {/* Tambahkan route kosong untuk "/" */}
        <Route path="/laporan" element={<Laporan />} />
        <Route path="/laporkan" element={<Laporkan />} />
      </Routes>
      <button
        onClick={handleLogin}
        className="p-4 bg-blue-500 text-white rounded"
      >
        {" "}
        Cek Login bang ko
      </button>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

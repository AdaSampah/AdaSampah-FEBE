import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Laporan } from "./pages/Laporan";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { useState } from "react";
import React from "react";
import Laporkan from "./pages/Laporkan";
import Footer from "./components/Footer/Footer";
import DetailLaporan from "./pages/DetailLaporan";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  function handleLogin() {
    setIsLogin(!isLogin);
  }
  return (
    <>
      <Navbar isLogin={isLogin} />
      <button onClick={handleLogin} className="p-4 bg-blue-500 text-white rounded">
        {" "}
        Cek Login bang ko
      </button>

      <BrowserRouter>
        <Routes>
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/laporan/:id" element={<DetailLaporan />} />
          <Route path="/laporkan" element={<Laporkan />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;

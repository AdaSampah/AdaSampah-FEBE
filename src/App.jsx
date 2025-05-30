import { BrowserRouter, Route, Routes } from "react-router-dom";
import { UserContextProvider } from "./context/UserContext";
import { Laporan } from "./pages/Laporan";
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import React, { useState } from "react";
import Laporkan from "./pages/Laporkan";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home";
import PetaSebaran from "./pages/PetaSebaran";
import EditProfile from "./pages/EditProfile";
import ScrollToTop from "./components/ScrollToTop";
import DetailLaporan from "./pages/DetailLaporan";
import LaporanSaya from "./pages/LaporanSaya";
import LaporanUser from "./components/LaporanSaya/LaporanUser";
import LaporanDisimpan from "./components/LaporanSaya/LaporanDisimpan";
import Education from "./pages/Education";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  function handleLogin() {
    setIsLogin(!isLogin);
  }
  return (
    <UserContextProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Home />} />
          <Route path="/laporan" element={<Laporan />} />
          <Route path="/laporan/:id" element={<DetailLaporan />} />
          <Route path="/laporkan" element={<Laporkan />} />
          <Route path="/peta-sebaran" element={<PetaSebaran />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/" element={<LaporanSaya />}>
            <Route path="laporan-saya" element={<LaporanUser />} />
            <Route path="disimpan" element={<LaporanDisimpan />} />
          </Route>
          <Route path="/education" element={<Education />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </UserContextProvider>
  );
}

export default App;

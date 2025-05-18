import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { useState } from "react";

import React from "react";
import Laporkan from "./pages/Laporkan";
import Footer from "./components/Footer/Footer";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  function handleLogin() {
    setIsLogin(!isLogin);
  }
  return (
    <>
      <Navbar isLogin={isLogin} />

      <Router>
        <Laporkan />
        <button
          onClick={handleLogin}
          className="p-4 bg-blue-500 text-white rounded"
        >
          {" "}
          Cek Login bang ko
        </button>

        {<Footer />}
      </Router>
    </>
  );
}

export default App;

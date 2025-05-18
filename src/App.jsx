<<<<<<< HEAD
import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { useState } from "react";
=======
import React from 'react';
import Laporkan from './pages/Laporkan';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router } from 'react-router-dom';

>>>>>>> 620845abb12179d4eafbdf79a9d329e50f5ddd8f

function App() {
  const [isLogin, setIsLogin] = useState(false);

  function handleLogin() {
    setIsLogin(!isLogin);
  }
  return (
<<<<<<< HEAD
    <>
      <Navbar isLogin={isLogin} />
      <button
        onClick={handleLogin}
        className="p-4 bg-blue-500 text-white rounded"
      >
        {" "}
        Cek Login bang
      </button>
    </>
=======
    <Router>
      <Laporkan/>
      
      {<Footer />}
    </Router>
>>>>>>> 620845abb12179d4eafbdf79a9d329e50f5ddd8f
  );
}

export default App;

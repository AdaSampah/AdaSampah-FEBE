import Navbar from "./components/Navbar/Navbar";
import "./App.css";
import { useState } from "react";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  function handleLogin() {
    setIsLogin(!isLogin);
  }
  return (
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
  );
}

export default App;

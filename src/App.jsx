import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Laporan } from "./pages/Laporan";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/laporan" element={<Laporan />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

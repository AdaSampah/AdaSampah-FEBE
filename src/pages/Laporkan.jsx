import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import HeroLaporkan from "../components/Laporkan/HeroLaporkan";
import FormLaporkan from "../components/Laporkan/FormLaporkan";

export default function Laporkan() {
  const { user } = useContext(UserContext);
  if (user && user.role === "admin") {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <HeroLaporkan />
      <FormLaporkan />
    </>
  );
}

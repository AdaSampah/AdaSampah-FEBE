import CoverUser from "../../assets/LaporanSaya/cover-user.jpg";

export default function CoverEditProfile() {
  return (
    <section>
      <div className="w-full h-[300px] bg-cover bg-center" style={{ backgroundImage: `url(${CoverUser})` }}></div>
    </section>
  );
}

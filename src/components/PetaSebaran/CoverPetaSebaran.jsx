import CoverPetaSebaran from "../../assets/PetaSebaran/cover.jpg";

export default function CoverEditProfile() {
  return (
    <section>
      <div
        className="w-full h-[300px] bg-cover bg-center"
        style={{ backgroundImage: `url(${CoverPetaSebaran})` }}
      ></div>
    </section>
  );
}

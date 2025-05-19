import HeroHome from "../components/Home/HeroHome";
import HomePerkenalan from "../components/Home/HomePerkenalan";
import HomeMisiKami from "../components/Home/HomeMisiKami";
import CaraMelindungiAlamHome from "../components/Home/CaraMelindungiAlamHome";
import Quotes from "../components/Home/Quotes";
import HomeInvitation from "../components/Home/HomeInvitation";

export default function Home() {
  return (
    <>
      <HeroHome />
      <HomePerkenalan />
      <HomeMisiKami />
      <CaraMelindungiAlamHome />
      <Quotes />
      <HomeInvitation />
    </>
  );
}

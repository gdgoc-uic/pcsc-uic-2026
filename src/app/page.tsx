import Hero from "./components/sections/Hero";
import Marquee from "./components/sections/Marquee";
import SpeakersTeaser from "./components/sections/SpeakersTeaser";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee marqueeText="SPEAKERS" />
      <SpeakersTeaser />
      <Marquee marqueeText="SPEAKERS" />
    </main>
  );
}
import Hero from "./components/sections/Hero";
import Marquee from "./components/sections/Marquee";
import SpeakersTeaser from "./components/sections/SpeakersTeaser";
import Programs from "./components/sections/Programs";

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee marqueeText="SPEAKERS" />
      <SpeakersTeaser />
      <Marquee marqueeText="PROGRAMS" />
      <Programs />
      <Marquee marqueeText="CALL FOR PAPERS" />
      <SpeakersTeaser />
      <Marquee marqueeText="IMPORTANT DATES" />
      <SpeakersTeaser />
      <Marquee marqueeText="AREA OF INTEREST" />
      <SpeakersTeaser />
      <Marquee marqueeText="VENUE" />
      <SpeakersTeaser />
    </main>
  );
}
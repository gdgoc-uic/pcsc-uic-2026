import Hero from "./components/sections/Hero";
import Marquee from "./components/sections/Marquee";
import SpeakersTeaser from "./components/sections/SpeakersTeaser";
import Programs from "./components/sections/Programs";
import CallforPapers from "./components/sections/CallforPapers";
import ImportantDates from "./components/sections/ImportantDates";
import AreaOfInterest from "./components/sections/AreaOfInterest";
import Venue from "./components/sections/Venue";

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <Marquee marqueeText="SPEAKERS" /> */}
      {/* <SpeakersTeaser /> */}
      <Marquee marqueeText="PROGRAM" />
      <Programs />
      <Marquee marqueeText="CALL FOR PAPERS" />
      <CallforPapers />
      <Marquee marqueeText="IMPORTANT DATES" />
      <ImportantDates />
      <Marquee marqueeText="AREAS OF INTEREST" />
      <AreaOfInterest />
      <Marquee marqueeText="VENUE" />
      <Venue />
    </main>
  );
}
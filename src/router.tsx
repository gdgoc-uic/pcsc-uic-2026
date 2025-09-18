import { createBrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import Home from "./pages/Home";
import Program from "./pages/Program";
import SRW from "./pages/SRW";
import AcceptedPapers from "./pages/AcceptedPapers";
import Registration from "./pages/Registration";
import CallForPapers from "./pages/CallforPapers";
import Proceedings from "./pages/Proceedings";
import Venue from "./pages/Venue";
import Accommodations from "./pages/Accommodations";
import Contact from "./pages/Contact";
import About from "./pages/About";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "program", element: <Program /> },
      { path: "srw", element: <SRW /> },
      { path: "accepted-papers", element: <AcceptedPapers /> },
      { path: "registration", element: <Registration /> },
      { path: "call-for-papers", element: <CallForPapers /> },
      { path: "proceedings", element: <Proceedings /> },
      { path: "venue", element: <Venue /> },
      { path: "accommodations", element: <Accommodations /> },
      { path: "contact", element: <Contact /> },
      { path: "about", element: <About /> },
    ],
  },
]);
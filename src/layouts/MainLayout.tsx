import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar.tsx";
import Footer from "../components/Footer.tsx";

export function MainLayout() {
  return (
    <div style={{ minHeight: "100dvh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default MainLayout;



import { Link, NavLink } from "react-router-dom";
import { Button } from "./ui/Button";

const navItems = [
  { to: "/program", label: "program" },
  { to: "/call-for-papers", label: "call for papers" },
  { to: "/venue", label: "venue" },
  { to: "/contact", label: "contact" },
  { to: "/about", label: "about" },
];

export function Navbar() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "#363433",
        borderBottom: "1px solid #4a5568",
      }}
    >
        <div
          style={{
            width: "100%",
            paddingInline: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "2rem",
            height: 72,
          }}
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 0,
                  background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                P
              </div>
              <span style={{ 
                color: "white", 
                fontSize: "20px", 
                fontWeight: "600",
                letterSpacing: "-0.025em"
              }}>
                PCSC 2026
              </span>
            </div>
          </Link>

          {/* Centered Navigation */}
          <nav 
            style={{ 
              display: "flex", 
              gap: 32, 
              alignItems: "center", 
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                style={({ isActive }) => ({
                  padding: "16px 0",
                  color: isActive ? "#90cdf4" : "#e2e8f0",
                  textDecoration: "none",
                  fontSize: "22px",
                  fontWeight: "700",
                  position: "relative",
                  transition: "color 0.2s ease",
                  borderBottom: isActive ? "4px solid #90cdf4" : "4px solid transparent",
                  whiteSpace: "nowrap",
                })}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          {/* CTA Button */}
          <Link to="/registration" style={{ textDecoration: "none" }}>
            <Button 
              size="sm" 
              style={{
                background: "#e11d48",
                color: "white",
                padding: "14px 28px",
                fontSize: "16px",
                fontWeight: "700",
                border: "none",
                borderRadius: "0",
                cursor: "pointer",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              Apply Now
            </Button>
          </Link>
        </div>
    </header>
  );
}

export default Navbar;



export function Footer() {
  return (
    <footer style={{ background: "#363433" }}>
      <div
        style={{
          maxWidth: "1200px",
          marginInline: "auto",
          padding: "24px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <div style={{ color: "white", fontSize: 14 }}>
          © {new Date().getFullYear()} Computing Society of the Philippines. All rights reserved.
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, color: "white" }}>
          <strong>Made with ❤️ </strong> <a target="_blank" rel="noreferrer" href="https://fb.me/dscuic/" style={{ color: "white" }}>GDG on Campus - UIC</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;



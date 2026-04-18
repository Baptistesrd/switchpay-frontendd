import { SOCIAL_LINKS } from "../../constants/links";

const LINKS = [
  { label: "X", href: SOCIAL_LINKS.twitter },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { label: "Instagram", href: SOCIAL_LINKS.instagram },
  { label: "Substack", href: SOCIAL_LINKS.substack },
];

export default function Footer() {
  return (
    <footer style={{ background: "#080808", padding: "32px 80px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>

      <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
        <span style={{ fontFamily: "'DM Serif Display', Georgia, serif", fontWeight: 400, fontSize: "16px", color: "rgba(255,255,255,0.4)" }}>
          switchpay
        </span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.2)" }}>
          © {new Date().getFullYear()}
        </span>
      </div>

      <div style={{ display: "flex", gap: "28px" }}>
        {LINKS.map(({ label, href }) => (

          key = { label }
            href = { href }
            target = "_blank"
            rel = "noreferrer"
            style = {{ fontFamily: "'DM Sans', sans-serif", fontSize: "12px", color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 0.2s" }}
        onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
        onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.25)"; }}
          >
        {label}
      </a>
        ))}
    </div>

    </footer >
  );
}

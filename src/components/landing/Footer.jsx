import { SOCIAL_LINKS } from "../../constants/links";

const LINKS = [
  { label: "X", href: SOCIAL_LINKS.twitter },
  { label: "LinkedIn", href: SOCIAL_LINKS.linkedin },
  { label: "Instagram", href: SOCIAL_LINKS.instagram },
  { label: "Substack", href: SOCIAL_LINKS.substack },
];

export default function Footer() {
  return (
    <footer style={{ background: "#030303", borderTop: "1px solid rgba(255,255,255,0.06)", padding: "48px 24px" }}>
      <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "24px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #7c3aed)" }} />
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.3)" }}>
            {String.fromCharCode(169)} {new Date().getFullYear()} SwitchPay
          </span>
        </div>
        <div style={{ display: "flex", gap: "24px", flexWrap: "wrap" }}>
          {LINKS.map(({ label, href }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              style={{ fontSize: "14px", color: "rgba(255,255,255,0.35)", textDecoration: "none" }}
              onMouseEnter={(e) => { e.currentTarget.style.color = "#a5b4fc"; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.35)"; }}
            >
              {label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

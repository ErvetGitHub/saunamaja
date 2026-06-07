/* Header — transparent over hero, frosts to glass on scroll. Mobile overlay menu. */
const NAV = [
  { id: "mudelid", label: "Saunad" },
  { id: "konfigureeri", label: "Konfigureeri" },
  { id: "tood", label: "Tehtud tööd" },
  { id: "kontakt", label: "Kontakt" },
];

const Wordmark = ({ onDark, size = 23 }) => (
  <span style={{
    fontFamily: "var(--font-display)", fontWeight: 600, fontSize: size, lineHeight: 1,
    letterSpacing: "0.01em", color: onDark ? "var(--on-dark)" : "var(--ink)",
    display: "inline-flex", alignItems: "baseline", gap: "0.28em", userSelect: "none",
  }}>
    Moo Sviit
    <span style={{ width: size * 0.18, height: size * 0.18, borderRadius: "50%", background: "var(--ember)", alignSelf: "center" }} />
  </span>
);

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.pageYOffset > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const onDark = !scrolled;
  const go = (id) => { setOpen(false); scrollToId(id); };

  return (
    <>
      <header style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        height: 64, display: "flex", alignItems: "center",
        background: scrolled ? "var(--glass-light)" : "transparent",
        backdropFilter: scrolled ? "var(--glass-blur)" : "none",
        WebkitBackdropFilter: scrolled ? "var(--glass-blur)" : "none",
        borderBottom: scrolled ? "1px solid var(--line-light)" : "1px solid transparent",
        transition: "all .5s var(--ease)",
      }}>
        <Container style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span onClick={() => go("top")} style={{ cursor: "pointer" }}><Wordmark onDark={onDark} /></span>
          <nav className="ms-desktop-nav" style={{ display: "flex", alignItems: "center", gap: 34 }}>
            {NAV.map((n) => (
              <span key={n.id} className="ms-navlink" onClick={() => go(n.id)} style={{
                fontFamily: "var(--font-body)", fontSize: 14.5, fontWeight: 500, cursor: "pointer",
                color: onDark ? "var(--on-dark)" : "var(--ink)", opacity: 0.92,
                letterSpacing: "0.01em", transition: "opacity .3s",
                "--nav-underline": onDark ? "var(--ember-soft)" : "var(--ember)",
              }}>{n.label}</span>
            ))}
            <Button variant="primary" onClick={() => go("konfigureeri")} style={{ padding: "11px 20px", fontSize: 14 }}>Küsi pakkumist</Button>
          </nav>
          <button className="ms-burger" onClick={() => setOpen(true)} aria-label="Menüü" style={{
            display: "none", background: "none", border: "none", cursor: "pointer",
            color: onDark ? "var(--on-dark)" : "var(--ink)", padding: 6,
          }}><IMenu s={26} /></button>
        </Container>
      </header>

      {/* Mobile overlay */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 200, background: "var(--night)",
        display: "flex", flexDirection: "column", padding: "24px clamp(20px,6vw,40px)",
        transform: open ? "none" : "translateX(100%)", transition: "transform .5s var(--ease)",
        pointerEvents: open ? "auto" : "none",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 48 }}>
          <Wordmark onDark size={22} />
          <button onClick={() => setOpen(false)} aria-label="Sulge" style={{ background: "none", border: "none", color: "var(--on-dark)", cursor: "pointer" }}><IClose s={28} /></button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {NAV.map((n, i) => (
            <span key={n.id} onClick={() => go(n.id)} style={{
              fontFamily: "var(--font-display)", fontSize: 38, fontWeight: 500, color: "var(--on-dark)",
              padding: "10px 0", borderBottom: "1px solid var(--line-dark)", cursor: "pointer",
            }}>{n.label}</span>
          ))}
        </div>
        <div style={{ marginTop: "auto" }}>
          <Button variant="primary" onClick={() => go("konfigureeri")} style={{ width: "100%", justifyContent: "center", padding: "16px" }}>Küsi pakkumist</Button>
        </div>
      </div>
    </>
  );
};

Object.assign(window, { Header, Wordmark });

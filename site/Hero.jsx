/* Hero — full-bleed golden juniper coast, slow drift, serif headline, glass message card. */
const MESSAGES = [
"Saaremaa rahust sündinud.",
"Eestis ehitatud. Saaremaa hingega.",
"Päris leil — Saaremaa moodi."];


const Hero = () => {
  const [msg, setMsg] = useState(0);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    const i = setInterval(() => setMsg((m) => (m + 1) % MESSAGES.length), 5400);
    return () => {clearTimeout(t);clearInterval(i);};
  }, []);

  return (
    <section id="top" style={{ position: "relative", minHeight: "100svh", display: "flex", alignItems: "flex-end", overflow: "hidden", background: "var(--night)" }}>
      {/* Background photo with slow zoom */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <img className="ms-hero-img" src={RES("assets/photos/coast-juniper-golden.webp")} alt="Saaremaa kadakarand päikeseloojangul" style={{
          width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%"
        }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,24,21,0.55) 0%, rgba(15,24,21,0.12) 32%, rgba(15,24,21,0.35) 64%, rgba(15,24,21,0.86) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(95deg, rgba(15,24,21,0.62) 0%, rgba(15,24,21,0.10) 46%, transparent 70%)" }} />
      </div>

      {/* Content */}
      <Container style={{ position: "relative", zIndex: 2, paddingBottom: "clamp(56px, 9vh, 104px)", paddingTop: 120 }}>
        <div style={{ maxWidth: 820 }}>
          <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(16px)", transition: "all .9s var(--ease) .15s" }}>
            <Eyebrow onDark style={{ marginBottom: 22 }}>Saaremaa · Eesti · Käsitöö</Eyebrow>
          </div>
          <h1 className="t-hero" style={{
            color: "var(--on-dark)", margin: "0 0 26px", maxWidth: 820,
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(26px)",
            transition: "all 1.1s var(--ease) .28s"
          }}>
            Leil, mis sünnib<br /><span className="t-italic" style={{ color: "var(--ember-soft)" }}>mere ja kadaka</span> vahel.
          </h1>
          <p className="t-lead" style={{
            color: "var(--on-dark-soft)", maxWidth: 540, margin: "0 0 38px",
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)",
            transition: "all 1s var(--ease) .42s"
          }}>
            Premium saunamajad — Eestis ehitatud, Saaremaa hingega. Konfigureeri oma saunamaja ja telli leil, mis on päriselt sinu.
          </p>
          <div style={{
            display: "flex", gap: 14, flexWrap: "wrap",
            opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(18px)",
            transition: "all 1s var(--ease) .54s"
          }}>
            <Button variant="primary" onClick={() => scrollToId("konfigureeri")}>Konfigureeri saun <IArrow s={17} /></Button>
            <Button variant="ghost" onDark onClick={() => scrollToId("mudelid")}>Vaata mudeleid</Button>
          </div>
        </div>
      </Container>

      {/* Glass message card — labelled brand pull-quote */}
      <div className="ms-hero-glass" style={{
        position: "absolute", right: "clamp(20px,5vw,64px)", bottom: "clamp(56px,9vh,104px)", zIndex: 2,
        width: "min(440px, 32vw)", padding: "30px 34px", borderRadius: "var(--r-lg)",
        background: "var(--glass-dark)", backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)",
        border: "1px solid var(--glass-line)", boxShadow: "var(--shadow-glass)",
        opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 1s var(--ease) .7s"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <ILeaf s={20} c="var(--ember-soft)" />
          <span className="t-label" style={{ color: "var(--ember-soft)", fontSize: 10.5 }}>Meie lubadus</span>
        </div>
        <div style={{ height: 104, position: "relative" }}>
          {MESSAGES.map((m, i) =>
          <div key={i} className="t-h3" style={{
            position: "absolute", inset: 0, color: "var(--on-dark)", fontStyle: "italic", fontWeight: 500,
            fontSize: "clamp(23px, 1.9vw, 30px)", lineHeight: 1.2,
            opacity: msg === i ? 1 : 0, transform: msg === i ? "none" : "translateY(10px)",
            transition: "all .8s var(--ease)"
          }}>{m}</div>
          )}
        </div>
        <div style={{ display: "flex", gap: 7, marginTop: 20 }}>
          {MESSAGES.map((_, i) =>
          <span key={i} style={{ width: msg === i ? 24 : 7, height: 7, borderRadius: 9999, background: msg === i ? "var(--ember-soft)" : "var(--on-dark-faint)", transition: "all .5s var(--ease)" }} />
          )}
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{
        position: "absolute", left: "50%", bottom: 22, transform: "translateX(-50%)", zIndex: 2,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 7, color: "var(--on-dark-soft)",
        opacity: loaded ? 0.85 : 0, transition: "opacity 1s var(--ease) 1s"
      }}>
        <span className="t-label" style={{ fontSize: 10, letterSpacing: "0.24em" }}>Keri</span>
        <span className="ms-scrollcue"><IArrowDown s={18} /></span>
      </div>
    </section>);

};

Object.assign(window, { Hero });
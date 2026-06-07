/* Models — dark section, four sauna houses. Click a card to load it in the configurator. */

const ModelCard = ({ m, i, onSelect }) => {
  const [hover, setHover] = useState(false);
  return (
    <Reveal delay={(i % 2) * 0.08}>
      <article
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        onClick={() => onSelect(m.id)}
        style={{
          background: "var(--night-2)", border: `1px solid ${hover ? "var(--glass-line)" : "var(--line-dark)"}`,
          borderRadius: "var(--r-lg)", overflow: "hidden", cursor: "pointer", height: "100%",
          display: "flex", flexDirection: "column",
          transform: hover ? "translateY(-6px)" : "none",
          boxShadow: hover ? "var(--shadow-lg)" : "none",
          transition: "all .55s var(--ease)",
        }}>
        <div style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden" }}>
          <img src={m.photo} alt={`Moo Sviit ${m.name}`} style={{
            width: "100%", height: "100%", objectFit: "cover",
            transform: hover ? "scale(1.07)" : "scale(1.01)", transition: "transform 1.1s var(--ease)",
          }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,24,21,0.18) 0%, transparent 40%, rgba(15,24,21,0.5) 100%)" }} />
          <span className="t-label" style={{
            position: "absolute", top: 16, left: 16, padding: "6px 12px", borderRadius: "var(--r-pill)",
            background: "var(--glass-dark)", backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)",
            border: "1px solid var(--glass-line)", color: "var(--on-dark)", fontSize: 10.5,
          }}>{m.tier}</span>
          <div style={{ position: "absolute", left: 18, right: 18, bottom: 15, display: "flex", alignItems: "center", gap: 9, color: "var(--on-dark)" }}>
            <IFlame s={16} c="var(--ember-soft)" />
            <span style={{ fontFamily: "var(--font-display)", fontStyle: "italic", fontWeight: 500, fontSize: 16.5, lineHeight: 1.2, textShadow: "0 1px 6px rgba(15,24,21,0.45)" }}>{m.blurb}</span>
          </div>
        </div>

        <div style={{ padding: "26px 28px 28px", display: "flex", flexDirection: "column", flex: 1 }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 6 }}>
            <h3 className="t-h2" style={{ color: "var(--on-dark)", fontSize: 38 }}>{m.name}</h3>
            <span className="t-h3" style={{ color: "var(--on-dark-faint)", fontStyle: "italic", fontWeight: 500, fontSize: 24 }}>/ {m.sub}</span>
          </div>
          <p className="t-body-sm" style={{ color: "var(--on-dark-soft)", marginBottom: 20, flex: 1 }}>{m.desc.split(".")[0]}.</p>

          <div style={{ display: "flex", gap: 22, padding: "16px 0", borderTop: "1px solid var(--line-dark)", marginBottom: 18 }}>
            <Spec icon={IRuler} label="Suurus" value={`${m.size} mm`} />
            <Spec icon={IHome} label="Pind" value={m.area} />
          </div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span className="t-caption" style={{ color: "var(--on-dark-soft)" }}>{m.rooms}</span>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--ember-soft)", fontWeight: 600, fontSize: 14.5 }}>
              Vali see mudel <IArrow s={16} c="var(--ember-soft)" style={{ transform: hover ? "translateX(3px)" : "none", transition: "transform .4s var(--ease)" }} />
            </span>
          </div>
        </div>
      </article>
    </Reveal>
  );
};

const Spec = ({ icon: Ic, label, value }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
    <span style={{ display: "flex", alignItems: "center", gap: 6, color: "var(--on-dark-faint)" }}>
      <Ic s={14} c="var(--on-dark-faint)" /><span className="t-label" style={{ fontSize: 10, letterSpacing: "0.14em" }}>{label}</span>
    </span>
    <span className="t-body-sm" style={{ color: "var(--on-dark)", fontWeight: 600 }}>{value}</span>
  </div>
);

const Models = ({ onSelect }) => (
  <section id="mudelid" style={{ background: "var(--night)", padding: "clamp(80px,12vh,140px) 0" }}>
    <Container>
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 24, marginBottom: "clamp(40px,6vh,64px)", flexWrap: "wrap" }}>
        <div>
          <Reveal><Eyebrow onDark style={{ marginBottom: 22 }}>Saunamudelid</Eyebrow></Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-h1" style={{ color: "var(--on-dark)", maxWidth: 620 }}>
              Neli saunamaja.<br /><span className="t-italic" style={{ color: "var(--ember-soft)" }}>Üks</span> sinu jaoks.
            </h2>
          </Reveal>
        </div>
        <Reveal delay={0.12}>
          <p className="t-body" style={{ color: "var(--on-dark-soft)", maxWidth: 320 }}>
            Kompaktsest rannasaunast luksusliku puhkemajani — vali lähtepunkt ja kujunda edasi.
          </p>
        </Reveal>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(18px,2.2vw,28px)" }} className="ms-models-grid">
        {MODELS.map((m, i) => <ModelCard key={m.id} m={m} i={i} onSelect={onSelect} />)}
      </div>
    </Container>
  </section>
);

Object.assign(window, { Models });

/* Configurator — pick a model, configure finishes & extras, request a quote. */

const optName = (key, id) => {
  const g = CONFIG.find((c) => c.key === key);
  const o = g && g.options.find((x) => x.id === id);
  return o ? o.name : "";
};
const optPrice = (key, id) => {
  const g = CONFIG.find((c) => c.key === key);
  const o = g && g.options.find((x) => x.id === id);
  return o ? o.price : 0;
};
const buildSummary = (cfg) => {
  const m = MODELS.find((x) => x.id === cfg.model) || MODELS[0];
  const items = [
  { label: "Mudel", value: `${m.name} / ${m.sub}`, price: m.base, isBase: true },
  ...CONFIG.filter((g) => !g.multi && (!g.showIf || g.showIf(cfg))).map((g) => ({ label: g.label, value: optName(g.key, cfg[g.key]), price: optPrice(g.key, cfg[g.key]) }))];

  items.push({ label: "Lisad", lisad: cfg.lisad.map((id) => ({ name: optName("lisad", id), price: optPrice("lisad", id) })) });
  return { m, items };
};

/* Single-choice option card */
const OptionCard = ({ o, selected, onClick }) => {
  const sw = o.color || o.sw;
  return (
  <button onClick={onClick} className="ms-opt" style={{
    textAlign: "left", cursor: "pointer", borderRadius: "var(--r-sm)", padding: "15px 16px",
    background: selected ? "rgba(191,107,60,0.08)" : "var(--bone-2)",
    border: `1.5px solid ${selected ? "var(--ember)" : "var(--line-light)"}`,
    transition: "all .3s var(--ease)", display: "flex", flexDirection: "column", gap: 3, position: "relative"
  }}>
    <span style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
      <span className="t-body-sm" style={{ fontWeight: 600, color: "var(--ink)", display: "inline-flex", alignItems: "center", gap: 10, minWidth: 0 }}>
        {sw && <span aria-hidden="true" style={{
          width: 18, height: 18, borderRadius: "50%", flexShrink: 0, background: sw,
          border: "1.5px solid rgba(31,28,26,0.14)", boxShadow: "inset 0 1px 2.5px rgba(0,0,0,0.28)"
        }} />}
        <span>
          {o.name}
          {o.price > 0 && <span style={{ color: "var(--ember)", fontWeight: 500, marginLeft: 7, whiteSpace: "nowrap" }}>{eurDelta(o.price)}</span>}
        </span>
      </span>
      <span style={{
      width: 19, height: 19, borderRadius: "50%", flexShrink: 0,
      background: selected ? "var(--ember)" : "transparent",
      border: selected ? "none" : "1.5px solid var(--ink-faint)",
      display: "flex", alignItems: "center", justifyContent: "center"
    }}>{selected && <ICheck s={12} c="var(--on-ember)" sw={2.4} />}</span>
    </span>
    <span className="t-caption" style={{ color: "var(--ink-soft)" }}>{o.note}</span>
  </button>);
};


const OptionGroup = ({ group, value, onPick }) =>
<div style={{ marginBottom: 30 }}>
    <div className="t-label" style={{ color: "var(--ink-faint)", marginBottom: 14 }}>{group.label}</div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(165px, 1fr))", gap: 10 }}>
      {group.options.map((o) => {
      const sel = group.multi ? value.includes(o.id) : value === o.id;
      return <OptionCard key={o.id} o={o} selected={sel} onClick={() => onPick(group, o.id)} />;
    })}
    </div>
  </div>;


const SummaryPanel = ({ cfg, onRequest }) => {
  const { m, items } = buildSummary(cfg);
  return (
    <div className="ms-summary" style={{
      position: "sticky", top: 86, borderRadius: "var(--r-lg)", overflow: "hidden",
      background: "var(--night-2)", border: "1px solid var(--line-dark)", boxShadow: "var(--shadow-md)"
    }}>
      <SaunaPreview cfg={cfg} />
      <div style={{ padding: "8px 22px 22px" }}>
        {items.map((it, idx) =>
        <div key={it.label + idx} style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 16, padding: "12px 0", borderBottom: "1px solid var(--line-dark)" }}>
            <span className="t-caption" style={{ color: "var(--on-dark-faint)", whiteSpace: "nowrap" }}>{it.label}</span>
            {it.lisad ?
            <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 5, textAlign: "right" }}>
                {it.lisad.length === 0 ?
                <span className="t-body-sm" style={{ color: "var(--on-dark-faint)", fontWeight: 500 }}>&mdash;</span> :
                it.lisad.map((l, i) =>
                <span key={i} style={{ display: "flex", alignItems: "baseline", gap: 8, justifyContent: "flex-end" }}>
                    <span className="t-body-sm" style={{ color: "var(--on-dark)", fontWeight: 500 }}>{l.name}</span>
                    {l.price > 0 && <span className="t-caption" style={{ color: "var(--ember-soft)", whiteSpace: "nowrap" }}>{eurDelta(l.price)}</span>}
                  </span>
                )}
              </span> :
            <span style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 2, textAlign: "right" }}>
              <span className="t-body-sm" style={{ color: "var(--on-dark)", fontWeight: 500 }}>{it.value}</span>
              {it.isBase ?
              <span className="t-caption" style={{ color: "var(--on-dark-faint)" }}>{eur(it.price)}</span> :
              it.price > 0 ?
              <span className="t-caption" style={{ color: "var(--ember-soft)" }}>{eurDelta(it.price)}</span> : null}
            </span>}
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", padding: "18px 0 2px" }}>
          <div>
            <div className="t-label" style={{ color: "var(--ember-soft)", fontSize: 10, marginBottom: 5 }}>Orienteeruv hind</div>
            <div className="t-caption" style={{ color: "var(--on-dark-faint)" }}>alates, käibemaksuga</div>
          </div>
          <div style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 32, lineHeight: 1, color: "var(--on-dark)" }}>{eur(computePrice(cfg))}</div>
        </div>
        <Button variant="primary" onClick={onRequest} style={{ width: "100%", justifyContent: "center", marginTop: 18, padding: "15px" }}>
          Küsi pakkumist <IArrow s={17} />
        </Button>
        <p className="t-caption" style={{ color: "var(--on-dark-faint)", textAlign: "center", marginTop: 12 }}>Orienteeruv hind — täpne pakkumine päringu järel</p>
      </div>
    </div>);

};

const Configurator = ({ cfg, setCfg }) => {
  const [formOpen, setFormOpen] = useState(false);
  const m = MODELS.find((x) => x.id === cfg.model) || MODELS[0];
  const pick = (group, id) => {
    if (group.multi) {
      setCfg((c) => ({ ...c, [group.key]: c[group.key].includes(id) ? c[group.key].filter((x) => x !== id) : [...c[group.key], id] }));
    } else {
      setCfg((c) => ({ ...c, [group.key]: id }));
    }
  };

  return (
    <section id="konfigureeri" style={{ background: "var(--bone)", padding: "clamp(80px,12vh,140px) 0" }}>
      <Container>
        <div style={{ marginBottom: "clamp(36px,5vh,56px)", maxWidth: 640 }}>
          <Reveal><Eyebrow style={{ marginBottom: 22 }}>Konfigureerimistööriist</Eyebrow></Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-h1" style={{ color: "var(--ink)" }}>Kujunda oma <span className="t-italic" style={{ color: "var(--ember)" }}>saun</span>.</h2>
          </Reveal>
        </div>

        {/* Model tabs */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
          {MODELS.map((mm) => {
            const sel = mm.id === cfg.model;
            return (
              <button key={mm.id} onClick={() => setCfg((c) => ({ ...c, model: mm.id }))} style={{
                cursor: "pointer", borderRadius: "var(--r-pill)", padding: "10px 20px",
                background: sel ? "var(--ink)" : "transparent", color: sel ? "var(--bone)" : "var(--ink-soft)",
                border: `1px solid ${sel ? "var(--ink)" : "var(--line-light)"}`,
                fontFamily: "var(--font-body)", fontSize: 14.5, fontWeight: 600, transition: "all .3s var(--ease)"
              }}>{mm.name} <span style={{ opacity: 0.6, fontStyle: "italic", fontWeight: 500 }}>/ {mm.sub}</span></button>);

          })}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "clamp(28px,4vw,56px)", alignItems: "start" }} className="ms-config-grid">
          {/* Left: model info + options */}
          <div>
            <div style={{ display: "flex", gap: 22, padding: "0 0 28px", marginBottom: 30, borderBottom: "1px solid var(--line-light)" }} className="ms-modelinfo">
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 12 }}>
                  <h3 className="t-h2" style={{ color: "var(--ink)", fontSize: 34 }}>{m.name}</h3>
                  <span className="t-h3" style={{ color: "var(--ink-faint)", fontStyle: "italic", fontWeight: 500, fontSize: 22 }}>/ {m.sub}</span>
                </div>
                <div style={{ display: "flex", gap: 18, flexWrap: "wrap", marginBottom: 16 }}>
                  {[["Suurus", `${m.size} mm`], ["Pind", m.area], ["Ruumid", m.rooms]].map(([l, v]) =>
                  <div key={l}>
                      <div className="t-label" style={{ color: "var(--ink-faint)", fontSize: 10, marginBottom: 4 }}>{l}</div>
                      <div className="t-body-sm" style={{ color: "var(--ink)", fontWeight: 600 }}>{v}</div>
                    </div>
                  )}
                </div>
                <p className="t-body-sm" style={{ color: "var(--ink-soft)" }}>{m.desc}</p>
              </div>
            </div>

            {CONFIG.map((g) =>
            (!g.showIf || g.showIf(cfg)) ?
            <OptionGroup key={g.key} group={g} value={cfg[g.key]} onPick={pick} /> : null
            )}
          </div>

          {/* Right: sticky summary */}
          <SummaryPanel cfg={cfg} onRequest={() => setFormOpen(true)} />
        </div>
      </Container>

      {formOpen && <QuoteModal cfg={cfg} onClose={() => setFormOpen(false)} />}
    </section>);

};

Object.assign(window, { Configurator, buildSummary });
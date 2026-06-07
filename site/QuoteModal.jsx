/* QuoteModal — prefilled summary + contact form, with a confirmation state. */

const Field = ({ label, type = "text", value, onChange, required, placeholder, textarea }) => {
  const [focus, setFocus] = useState(false);
  const base = {
    width: "100%", fontFamily: "var(--font-body)", fontSize: 15.5, color: "var(--ink)",
    background: "var(--bone)", borderRadius: "var(--r-sm)", padding: "13px 15px",
    border: `1.5px solid ${focus ? "var(--ember)" : "var(--line-light)"}`,
    outline: "none", transition: "border-color .25s", resize: "vertical", boxSizing: "border-box",
  };
  return (
    <label style={{ display: "block" }}>
      <span className="t-label" style={{ color: "var(--ink-faint)", fontSize: 10.5, display: "block", marginBottom: 8 }}>
        {label}{required && <span style={{ color: "var(--ember)" }}> *</span>}
      </span>
      {textarea ? (
        <textarea rows={3} value={value} required={required} placeholder={placeholder}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          onChange={(e) => onChange(e.target.value)} style={base} />
      ) : (
        <input type={type} value={value} required={required} placeholder={placeholder}
          onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}
          onChange={(e) => onChange(e.target.value)} style={base} />
      )}
    </label>
  );
};

const QuoteModal = ({ cfg, onClose }) => {
  const { m, items } = buildSummary(cfg);
  const [sent, setSent] = useState(false);
  const [f, setF] = useState({ nimi: "", epost: "", tel: "", info: "" });
  const set = (k) => (v) => setF((s) => ({ ...s, [k]: v }));

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, []);

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 300, background: "rgba(9,15,13,0.62)",
      backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
      display: "flex", alignItems: "center", justifyContent: "center", padding: 20,
      animation: "ms-fade .35s var(--ease)",
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        width: "100%", maxWidth: 600, maxHeight: "90vh", overflowY: "auto",
        background: "var(--bone-2)", borderRadius: "var(--r-lg)", boxShadow: "var(--shadow-lg)",
        animation: "ms-pop .45s var(--ease)",
      }}>
        {!sent ? (
          <div style={{ padding: "clamp(26px,4vw,40px)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div>
                <Eyebrow style={{ marginBottom: 12 }}>Pakkumispäring</Eyebrow>
                <h3 className="t-h2" style={{ color: "var(--ink)", fontSize: "clamp(28px,4vw,38px)" }}>Räägime sinu saunast.</h3>
              </div>
              <button onClick={onClose} aria-label="Sulge" style={{ background: "var(--bone-3)", border: "none", borderRadius: "50%", width: 38, height: 38, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "var(--ink)", flexShrink: 0 }}><IClose s={20} /></button>
            </div>

            {/* Prefilled summary */}
            <div style={{ background: "var(--night-2)", borderRadius: "var(--r-md)", padding: "18px 20px", margin: "22px 0 26px" }}>
              <div className="t-label" style={{ color: "var(--ember-soft)", fontSize: 10, marginBottom: 14 }}>Sinu valik</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {items.flatMap((it, idx) => {
                  if (it.lisad) {
                    if (!it.lisad.length) return [];
                    return it.lisad.map((l, i) => (
                      <span key={"lisa" + i} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 13px", borderRadius: "var(--r-pill)", background: "var(--night-3)", border: "1px solid var(--line-dark)" }}>
                        {i === 0 && <span className="t-caption" style={{ color: "var(--on-dark-faint)" }}>Lisad:</span>}
                        <span className="t-caption" style={{ color: "var(--on-dark)", fontWeight: 600 }}>{l.name}</span>
                        {l.price > 0 && <span className="t-caption" style={{ color: "var(--ember-soft)" }}>{eurDelta(l.price)}</span>}
                      </span>
                    ));
                  }
                  return [(
                    <span key={it.label + idx} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "7px 13px", borderRadius: "var(--r-pill)", background: "var(--night-3)", border: "1px solid var(--line-dark)" }}>
                      {it.label !== "" && <span className="t-caption" style={{ color: "var(--on-dark-faint)" }}>{it.label}:</span>}
                      <span className="t-caption" style={{ color: "var(--on-dark)", fontWeight: 600 }}>{it.value}</span>
                      {!it.isBase && it.price > 0 && <span className="t-caption" style={{ color: "var(--ember-soft)" }}>{eurDelta(it.price)}</span>}
                    </span>
                  )];
                })}
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--line-dark)" }}>
                <span className="t-caption" style={{ color: "var(--on-dark-faint)" }}>Orienteeruv hind, alates</span>
                <span style={{ fontFamily: "var(--font-display)", fontWeight: 600, fontSize: 26, lineHeight: 1, color: "var(--on-dark)" }}>{eur(computePrice(cfg))}</span>
              </div>
            </div>

            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="ms-form-grid">
                <Field label="Nimi" value={f.nimi} onChange={set("nimi")} required placeholder="Mari Maasikas" />
                <Field label="Telefon" type="tel" value={f.tel} onChange={set("tel")} placeholder="+372 …" />
              </div>
              <div style={{ marginBottom: 16 }}>
                <Field label="E-post" type="email" value={f.epost} onChange={set("epost")} required placeholder="mari@näide.ee" />
              </div>
              <div style={{ marginBottom: 24 }}>
                <Field label="Lisainfo" textarea value={f.info} onChange={set("info")} placeholder="Krundi asukoht, soovitud tarneaeg, küsimused…" />
              </div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
                <Button type="submit" variant="primary" style={{ padding: "15px 28px" }}>Saada päring <IArrow s={17} /></Button>
                <span className="t-caption" style={{ color: "var(--ink-faint)" }}>Vastame 1 tööpäeva jooksul.</span>
              </div>
            </form>
          </div>
        ) : (
          <div style={{ padding: "clamp(40px,6vw,64px) clamp(26px,4vw,40px)", textAlign: "center" }}>
            <div style={{ width: 68, height: 68, borderRadius: "50%", background: "var(--ember)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 24px" }}>
              <ICheck s={34} c="var(--on-ember)" sw={2.2} />
            </div>
            <h3 className="t-h2" style={{ color: "var(--ink)", fontSize: "clamp(28px,4vw,40px)", marginBottom: 14 }}>Aitäh{f.nimi ? `, ${f.nimi.split(" ")[0]}` : ""}!</h3>
            <p className="t-body" style={{ color: "var(--ink-soft)", maxWidth: 380, margin: "0 auto 30px" }}>
              Sinu päring <strong style={{ color: "var(--ink)", fontWeight: 600 }}>{m.name} / {m.sub}</strong> saunamajale on kohal. Võtame ühendust 1 tööpäeva jooksul.
            </p>
            <Button variant="ghost" onClick={onClose}>Sulge</Button>
          </div>
        )}
      </div>
    </div>
  );
};

Object.assign(window, { QuoteModal });

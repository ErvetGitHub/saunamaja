/* SaunaPreview — a live, schematic front-elevation of the configured sauna.
   It re-skins itself whenever Raam / Fassaad / Värvus (and the interior materials)
   change, so the customer SEES the house update. This is a stylised CSS preview,
   not a photoreal render — real product renders should replace it for production. */

/* tiny hex shade helper: shadeHex('#c89a5e', -14) darkens, (+10) lightens */
const shadeHex = (hex, pct) => {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (n >> 16) + Math.round(255 * pct / 100)));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + Math.round(255 * pct / 100)));
  const b = Math.max(0, Math.min(255, (n & 255) + Math.round(255 * pct / 100)));
  return `rgb(${r},${g},${b})`;
};

const optOf = (key, id) => {
  const g = CONFIG.find((c) => c.key === key);
  return g ? g.options.find((o) => o.id === id) : null;
};

const SaunaPreview = ({ cfg }) => {
  const m = MODELS.find((x) => x.id === cfg.model) || MODELS[0];
  const metal = cfg.raam === "metall";
  const frame = metal ? "#3a3d41" : "#6b4f33";
  const frameLo = metal ? "#2a2c2f" : "#4f3a25";

  const varv = (optOf("varvus", cfg.varvus) || {}).color || "#c89a5e";
  const boardFacade = ["tavalaudis", "vaariespuit"].includes(cfg.fassaad);
  const glassy = ["klaas", "peegelklaas", "klaasuks"].includes(cfg.fassaad);

  // facade fill
  let facade;
  if (cfg.fassaad === "tavalaudis") {
    const lo = shadeHex(varv, -13);
    facade = `repeating-linear-gradient(90deg, ${varv} 0, ${varv} 12px, ${lo} 12px, ${lo} 14px)`;
  } else if (cfg.fassaad === "vaariespuit") {
    const hi = shadeHex(varv, 10), lo = shadeHex(varv, -12);
    facade = `repeating-linear-gradient(90deg, ${lo} 0, ${varv} 9px, ${hi} 16px, ${varv} 23px, ${lo} 30px)`;
  } else if (cfg.fassaad === "peegelklaas") {
    facade = "linear-gradient(125deg, #b7c1c5 0%, #e8eef0 36%, #93a0a5 56%, #cdd5d8 100%)";
  } else {
    // klaas / klaasuks
    facade = "linear-gradient(160deg, rgba(150,182,190,0.55), rgba(58,92,102,0.78))";
  }

  // interior warm glow (keris), stronger & warmer for wood heaters
  const kerisWarm = cfg.keris === "puu" || cfg.keris === "pidev";
  const glow = kerisWarm ? "rgba(214,138,94,0.92)" : "rgba(226,170,120,0.7)";

  const floorSw = (optOf("porand", cfg.porand) || {}).sw || "#b8b0a4";
  const lavaSw = (optOf("lava", cfg.lava) || {}).sw || "#d8c4a0";
  const wideDoor = cfg.fassaad === "klaasuks";

  return (
    <div>
      <div className="ms-preview" style={{ position: "relative", aspectRatio: "16 / 11", overflow: "hidden", background: "#16211d" }}>
        {/* nature backdrop */}
        <img src={RES("assets/photos/forest.jpg")} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5) saturate(0.85) blur(2px)", transform: "scale(1.05)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,24,21,0.35), rgba(15,24,21,0.72))" }} />

        {/* ground */}
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: "16%", background: "linear-gradient(180deg, rgba(15,24,21,0.1), rgba(9,15,13,0.9))" }} />

        {/* CABIN */}
        <div style={{ position: "absolute", left: "16%", right: "16%", top: "20%", bottom: "16%", filter: "drop-shadow(3px 8px 22px rgba(0,0,0,0.45))" }}>
          {/* roof */}
          <div style={{ position: "absolute", left: "-5%", right: "-5%", top: "-9%", height: "11%", background: `linear-gradient(180deg, ${shadeHex(frameLo, -4)}, ${frameLo})`, borderRadius: "4px 4px 2px 2px" }} />
          {/* body */}
          <div style={{ position: "absolute", inset: 0, top: "2%", borderRadius: "3px", background: facade, border: `4px solid ${frame}`, boxShadow: `inset 0 0 0 1px ${frameLo}, inset 0 -18px 30px rgba(0,0,0,0.28)`, overflow: "hidden", transition: "background .5s var(--ease), border-color .4s var(--ease)" }}>
            {/* keris glow seeping out */}
            <div style={{ position: "absolute", left: "50%", bottom: "-6%", width: "62%", height: "70%", transform: "translateX(-50%)", background: `radial-gradient(60% 70% at 50% 80%, ${glow}, transparent 72%)`, opacity: glassy ? 0.85 : 0.4, filter: "blur(2px)", transition: "opacity .5s var(--ease)" }} />

            {/* window (glass facades) */}
            {glassy && !wideDoor &&
            <div style={{ position: "absolute", left: "10%", top: "20%", width: "26%", height: "46%", borderRadius: 3, background: "linear-gradient(150deg, rgba(225,238,240,0.5), rgba(120,150,158,0.25))", border: `2px solid ${frame}`, boxShadow: "inset 0 0 14px rgba(255,255,255,0.18)" }}>
                <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 2, background: frame, opacity: 0.6 }} />
              </div>
            }

            {/* DOOR */}
            <div style={{
              position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
              width: wideDoor ? "46%" : "28%", height: "74%",
              background: glassy || wideDoor
                ? "linear-gradient(155deg, rgba(222,236,238,0.62), rgba(96,128,136,0.5))"
                : `linear-gradient(180deg, ${shadeHex(frame, 6)}, ${frameLo})`,
              border: `3px solid ${frame}`, borderBottom: "none", borderRadius: "3px 3px 0 0",
              boxShadow: "inset 0 0 16px rgba(0,0,0,0.25)", overflow: "hidden", transition: "all .45s var(--ease)",
            }}>
              {/* door glass strip for wood doors */}
              {!glassy && !wideDoor &&
              <div style={{ position: "absolute", left: "50%", top: "12%", transform: "translateX(-50%)", width: "52%", height: "44%", borderRadius: 2, background: `radial-gradient(circle at 50% 80%, ${glow}, rgba(120,140,135,0.35))`, border: `1px solid ${frameLo}` }} />
              }
              {/* handle */}
              <div style={{ position: "absolute", right: "16%", top: "44%", width: 3, height: "20%", borderRadius: 2, background: metal ? "#cfd4d6" : "#caa46f" }} />
            </div>
          </div>
        </div>

        {/* plinth / floor band */}
        <div style={{ position: "absolute", left: "13%", right: "13%", bottom: "14%", height: "4%", background: `linear-gradient(180deg, ${shadeHex(floorSw, 4)}, ${shadeHex(floorSw, -16)})`, borderRadius: 2, opacity: 0.95 }} />

        {/* model name + schematic label */}
        <div style={{ position: "absolute", left: 20, bottom: 14, right: 20, display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 12 }}>
          <div>
            <div className="t-label" style={{ color: "var(--ember-soft)", fontSize: 9.5, marginBottom: 5 }}>Sinu saun</div>
            <div className="t-h3" style={{ color: "var(--on-dark)", fontSize: 24 }}>{m.name} <span style={{ fontStyle: "italic", color: "var(--on-dark-soft)", fontWeight: 500 }}>/ {m.sub}</span></div>
          </div>
          <span className="t-label" style={{ color: "var(--on-dark-faint)", fontSize: 8.5, padding: "4px 9px", borderRadius: "var(--r-pill)", background: "var(--glass-dark)", border: "1px solid var(--glass-line)", whiteSpace: "nowrap" }}>Skemaatiline</span>
        </div>
      </div>

      {/* interior material swatches (not visible in elevation) */}
      <div style={{ display: "flex", gap: 8, padding: "12px 14px", background: "var(--night-3)", borderBottom: "1px solid var(--line-dark)" }}>
        {[["Lava", lavaSw, (optOf("lava", cfg.lava) || {}).name], ["Põrand", floorSw, (optOf("porand", cfg.porand) || {}).name], ["Keris", null, (optOf("keris", cfg.keris) || {}).name]].map(([lab, sw, val]) => (
          <div key={lab} style={{ flex: 1, display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
            {sw
              ? <span style={{ width: 18, height: 18, borderRadius: 5, background: sw, border: "1px solid var(--line-dark)", flexShrink: 0 }} />
              : <span style={{ width: 18, height: 18, borderRadius: 5, background: "radial-gradient(circle at 50% 70%, var(--ember-soft), var(--ember-deep))", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}><IFlame s={11} c="#fff" /></span>}
            <span style={{ minWidth: 0 }}>
              <span className="t-label" style={{ color: "var(--on-dark-faint)", fontSize: 8.5, display: "block" }}>{lab}</span>
              <span className="t-caption" style={{ color: "var(--on-dark)", fontSize: 11.5, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", display: "block" }}>{val}</span>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { SaunaPreview, shadeHex });

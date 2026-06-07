/* Tehtud tööd — gallery + lightbox. Real build photos are placeholders; for now, the
   Saaremaa nature that shapes every Moo Sviit sauna, honestly labelled. Click any tile to
   open the lightbox and browse with the arrows / keyboard. Captions stay on every image. */

const TILES = [
{ src: RES("assets/photos/coast-juniper-golden.webp"), cap: "Undva, rannakadakad", pos: "50% 58%" },
{ src: RES("assets/photos/forest.jpg"), cap: "Saaremaa mänd", pos: "50% 50%" },
{ src: RES("assets/photos/juniper-macro.jpg"), cap: "Kadakas lähedalt", pos: "50% 50%" },
{ src: RES("assets/photos/juniper-sea.jpg"), cap: "Vilsandi vaade", pos: "50% 60%" },
{ src: RES("assets/photos/coast-aerial.jpg"), cap: "Panga pank", pos: "50% 85%" }];


const GalleryTile = ({ t, i, onOpen }) =>
<Reveal delay={i % 3 * 0.06}>
    <div className="ms-gtile" onClick={() => onOpen(i)} style={{ position: "relative", aspectRatio: "4 / 3", borderRadius: "var(--r-md)", overflow: "hidden", cursor: "pointer" }}>
      <img src={t.src} alt={t.cap} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: t.pos }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 50%, rgba(15,24,21,0.6) 100%)" }} />
      <span className="t-label" style={{ position: "absolute", top: 14, left: 14, padding: "5px 10px", borderRadius: "var(--r-pill)", background: "var(--glass-dark)", backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)", border: "1px solid var(--glass-line)", color: "var(--on-dark-soft)", fontSize: 9.5 }}>Näidis</span>
      <span className="t-caption" style={{ position: "absolute", left: 16, bottom: 14, color: "var(--on-dark)", fontWeight: 500 }}>{t.cap}</span>
      {/* hover hint */}
      <span className="ms-gtile-zoom" style={{ position: "absolute", top: 12, right: 12, width: 34, height: 34, borderRadius: "50%", background: "var(--glass-dark)", backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)", border: "1px solid var(--glass-line)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--on-dark)" }}><IPlus s={16} /></span>
    </div>
  </Reveal>;


const Lightbox = ({ index, onClose, onPrev, onNext }) => {
  const t = TILES[index];
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft") onPrev();
      else if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose, onPrev, onNext]);

  const navBtn = {
    width: 52, height: 52, borderRadius: "50%", flexShrink: 0, cursor: "pointer",
    background: "var(--glass-dark)", backdropFilter: "var(--glass-blur)", WebkitBackdropFilter: "var(--glass-blur)",
    border: "1px solid var(--glass-line)", color: "var(--on-dark)",
    display: "flex", alignItems: "center", justifyContent: "center",
  };

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 300, background: "rgba(9,15,13,0.82)",
      backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      display: "flex", flexDirection: "column", animation: "ms-fade .3s var(--ease)",
    }}>
      {/* Top bar: counter + close */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px clamp(16px,4vw,40px)", flexShrink: 0 }}>
        <span className="t-label" style={{ color: "var(--on-dark-soft)" }}>{String(index + 1).padStart(2, "0")} / {String(TILES.length).padStart(2, "0")}</span>
        <button onClick={onClose} aria-label="Sulge" style={{ ...navBtn, width: 44, height: 44 }}><IClose s={20} /></button>
      </div>

      {/* Stage */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: "clamp(8px,2vw,28px)", padding: "0 clamp(12px,3vw,40px)", minHeight: 0 }}>
        <button className="ms-press" onClick={(e) => { e.stopPropagation(); onPrev(); }} aria-label="Eelmine" style={navBtn}><IArrow s={22} style={{ transform: "rotate(180deg)" }} /></button>

        <figure onClick={(e) => e.stopPropagation()} style={{ margin: 0, display: "flex", flexDirection: "column", alignItems: "center", maxWidth: "min(1100px, 86vw)", maxHeight: "100%", minHeight: 0 }}>
          <div style={{ position: "relative", borderRadius: "var(--r-lg)", overflow: "hidden", boxShadow: "var(--shadow-lg)", minHeight: 0 }}>
            <img key={t.src} src={t.src} alt={t.cap} style={{ display: "block", maxWidth: "100%", maxHeight: "72vh", objectFit: "contain", animation: "ms-fade .35s var(--ease)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 62%, rgba(15,24,21,0.7) 100%)", pointerEvents: "none" }} />
            {/* Caption stays ON the image */}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, padding: "20px 24px", display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 16 }}>
              <span className="t-h3" style={{ color: "var(--on-dark)", fontSize: "clamp(20px,2.4vw,28px)", fontStyle: "italic", fontWeight: 500 }}>{t.cap}</span>
              <span className="t-label" style={{ color: "var(--on-dark-soft)", fontSize: 10, padding: "5px 11px", borderRadius: "var(--r-pill)", background: "var(--glass-dark)", border: "1px solid var(--glass-line)", whiteSpace: "nowrap" }}>Näidis</span>
            </div>
          </div>
        </figure>

        <button className="ms-press" onClick={(e) => { e.stopPropagation(); onNext(); }} aria-label="Järgmine" style={navBtn}><IArrow s={22} /></button>
      </div>

      {/* Thumbnail strip */}
      <div onClick={(e) => e.stopPropagation()} style={{ display: "flex", gap: 10, justifyContent: "center", padding: "18px clamp(16px,4vw,40px) 28px", flexWrap: "wrap", flexShrink: 0 }}>
        {TILES.map((th, i) => (
          <button key={th.src} onClick={() => onNext(i)} aria-label={th.cap} style={{
            width: 64, height: 44, borderRadius: 8, overflow: "hidden", cursor: "pointer", padding: 0,
            border: i === index ? "2px solid var(--ember-soft)" : "2px solid transparent",
            opacity: i === index ? 1 : 0.5, transition: "all .3s var(--ease)",
          }}>
            <img src={th.src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: th.pos }} />
          </button>
        ))}
      </div>
    </div>
  );
};


const Gallery = () => {
  const [open, setOpen] = useState(null); // index | null
  const show = (i) => setOpen(i);
  const close = () => setOpen(null);
  const prev = () => setOpen((i) => (i + TILES.length - 1) % TILES.length);
  // onNext doubles as "jump to index" when called with a number (from thumbnails)
  const next = (i) => setOpen((cur) => (typeof i === "number" ? i : (cur + 1) % TILES.length));

  return (
    <section id="tood" style={{ background: "var(--bone)", padding: "clamp(80px,12vh,140px) 0" }}>
      <Container>
        <div style={{ maxWidth: 620, marginBottom: "clamp(36px,5vh,56px)" }}>
          <Reveal><Eyebrow style={{ marginBottom: 22 }}>Tehtud tööd</Eyebrow></Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-h1" style={{ color: "var(--ink)", marginBottom: 18 }}>Maastik, mis meid <span className="t-italic" style={{ color: "var(--ember)" }}>kujundab</span>.</h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="t-body" style={{ color: "var(--ink-soft)" }}>
              Esimesed saunamajad valmivad hooajal 2026. Seni galeriis Saaremaa ise — kadakad, mänd ja meri, mille järgi iga Moo Sviit saun oma toonid ja hinge saab. Vajuta pildile, et seda suuremalt vaadata.
            </p>
          </Reveal>
        </div>

        <div className="ms-gallery" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(12px,1.6vw,18px)" }}>
          {TILES.map((t, i) => <GalleryTile key={t.src} t={t} i={i} onOpen={show} />)}
          <Reveal delay={0.12}>
            <div style={{ height: "100%", aspectRatio: "4 / 3", borderRadius: "var(--r-md)", background: "var(--night)", padding: "26px 24px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <ILeaf s={24} c="var(--ember-soft)" />
              <div>
                <h3 className="t-h3" style={{ color: "var(--on-dark)", fontSize: 24, marginBottom: 14 }}>Sinu projekt <span style={{ fontStyle: "italic", color: "var(--ember-soft)" }}>järgmisena?</span></h3>
                <span onClick={() => scrollToId("konfigureeri")} style={{ display: "inline-flex", alignItems: "center", gap: 7, color: "var(--ember-soft)", fontWeight: 600, fontSize: 14.5, cursor: "pointer" }}>Alusta konfigureerimist <IArrow s={16} c="var(--ember-soft)" /></span>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>

      {open !== null && <Lightbox index={open} onClose={close} onPrev={prev} onNext={next} />}
    </section>
  );
};

Object.assign(window, { Gallery });

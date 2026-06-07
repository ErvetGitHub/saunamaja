/* Story — light limestone section, editorial brand statement + values. */
const VALUES = [
  { icon: ILeaf, t: "Saaremaa materjalist", d: "Termopuit ja kadakahall laudis, mis vananeb kauniks nagu rannakadakas ise." },
  { icon: IFlame, t: "Päris leil", d: "Puuküttega kerised ja läbimõeldud aurustus — leil, mis hingab ja paitab." },
  { icon: IHome, t: "Võtmed kätte", d: "Projekteerime, ehitame ja paigaldame. Sina vaid avad ukse ja astud sisse." },
];

const Story = () => (
  <section style={{ background: "var(--bone)", padding: "clamp(80px,12vh,140px) 0" }}>
    <Container>
      <div style={{ display: "grid", gridTemplateColumns: "1.05fr 0.95fr", gap: "clamp(40px,6vw,90px)", alignItems: "center" }} className="ms-story-grid">
        <div>
          <Reveal><Eyebrow style={{ marginBottom: 24 }}>Lugu</Eyebrow></Reveal>
          <Reveal delay={0.06}>
            <h2 className="t-h1" style={{ color: "var(--ink)", margin: "0 0 28px" }}>
              Eestis ehitatud.<br /><span className="t-italic" style={{ color: "var(--ember)" }}>Saaremaa</span> hingega.
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="t-body" style={{ color: "var(--ink-soft)", maxWidth: 480, marginBottom: 18 }}>
              Moo Sviit sünnib seal, kus mänd kohtub merega. Iga saunamaja ehitatakse käsitsi Saaremaa meistrite poolt — vastupidavast termopuidust, mis peab vastu tuulele, soolale ja ajale.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="t-body" style={{ color: "var(--ink-soft)", maxWidth: 480 }}>
              Me ei tee kiireid saunu. Me teeme kohti, kuhu tahad ikka ja jälle naasta — rahuks, leiliks ja vaikuseks mere ääres.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.1}>
          <div style={{ position: "relative", borderRadius: "var(--r-lg)", overflow: "hidden", aspectRatio: "4 / 5", boxShadow: "var(--shadow-md)" }}>
            <img src={RES("assets/photos/juniper-sea.jpg")} alt="Saaremaa kadakad mere ääres" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, transparent 55%, rgba(15,24,21,0.4) 100%)" }} />
            <span className="t-caption" style={{ position: "absolute", left: 18, bottom: 16, color: "var(--on-dark)", opacity: 0.9 }}>Undva rand, Saaremaa</span>
          </div>
        </Reveal>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "clamp(20px,3vw,40px)", marginTop: "clamp(56px,8vh,96px)" }} className="ms-values">
        {VALUES.map((v, i) => (
          <Reveal key={v.t} delay={i * 0.08}>
            <div style={{ borderTop: "1px solid var(--line-light)", paddingTop: 22 }}>
              <v.icon s={26} c="var(--ember)" />
              <h3 className="t-h3" style={{ color: "var(--ink)", fontSize: 23, margin: "16px 0 10px" }}>{v.t}</h3>
              <p className="t-body-sm" style={{ color: "var(--ink-soft)" }}>{v.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Container>
  </section>
);

Object.assign(window, { Story });

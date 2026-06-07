/* Footer / Kontakt — final CTA band over photo + deep contact footer. */

const Footer = () => (
  <footer id="kontakt">
    {/* CTA band over coast photo */}
    <div style={{ position: "relative", overflow: "hidden" }}>
      <img src="assets/photos/juniper-macro.jpg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(180deg, rgba(15,24,21,0.78), rgba(15,24,21,0.92))" }} />
      <Container style={{ position: "relative", zIndex: 2, padding: "clamp(72px,11vh,128px) clamp(20px,5vw,64px)", textAlign: "center" }}>
        <Reveal><Eyebrow onDark style={{ marginBottom: 22, justifyContent: "center" }}>Valmis alustama?</Eyebrow></Reveal>
        <Reveal delay={0.06}>
          <h2 className="t-h1" style={{ color: "var(--on-dark)", maxWidth: 720, margin: "0 auto 32px" }}>
            Telli leil, mis on <span className="t-italic" style={{ color: "var(--ember-soft)" }}>päriselt sinu</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.12}>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <Button variant="primary" onClick={() => scrollToId("konfigureeri")}>Konfigureeri saun <IArrow s={17} /></Button>
            <Button variant="ghost" onDark onClick={() => scrollToId("mudelid")}>Vaata mudeleid</Button>
          </div>
        </Reveal>
      </Container>
    </div>

    {/* Deep contact footer */}
    <div style={{ background: "var(--night-deep)", padding: "clamp(56px,8vh,88px) 0 36px" }}>
      <Container>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr", gap: 40, paddingBottom: 48, borderBottom: "1px solid var(--line-dark)" }} className="ms-footer-grid">
          <div>
            <Wordmark onDark size={28} />
            <p className="t-body-sm" style={{ color: "var(--on-dark-soft)", maxWidth: 300, marginTop: 18 }}>
              Premium saunamajad Saaremaalt. Eestis ehitatud, Saaremaa hingega.
            </p>
          </div>
          <div>
            <div className="t-label" style={{ color: "var(--on-dark-faint)", marginBottom: 18 }}>Kontakt</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--on-dark)", textDecoration: "none", fontSize: 15 }}><IPhone s={17} c="var(--ember-soft)" />{CONTACT.phone}</a>
              <a href={`mailto:${CONTACT.email}`} style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--on-dark)", textDecoration: "none", fontSize: 15 }}><IMail s={17} c="var(--ember-soft)" />{CONTACT.email}</a>
              <span style={{ display: "flex", alignItems: "center", gap: 10, color: "var(--on-dark-soft)", fontSize: 15 }}><IPin s={17} c="var(--ember-soft)" />{CONTACT.place}</span>
            </div>
          </div>
          <div>
            <div className="t-label" style={{ color: "var(--on-dark-faint)", marginBottom: 18 }}>Menüü</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[["mudelid", "Saunamudelid"], ["konfigureeri", "Konfigureeri"], ["tood", "Tehtud tööd"]].map(([id, l]) => (
                <span key={id} onClick={() => scrollToId(id)} style={{ color: "var(--on-dark-soft)", fontSize: 15, cursor: "pointer" }}>{l}</span>
              ))}
              <div style={{ display: "flex", gap: 12, marginTop: 8 }}>
                <a href="#" aria-label="Instagram" style={{ color: "var(--on-dark-soft)" }}><IInstagram s={20} /></a>
                <a href="#" aria-label="Facebook" style={{ color: "var(--on-dark-soft)" }}><IFacebook s={20} /></a>
              </div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingTop: 24, gap: 16, flexWrap: "wrap" }}>
          <span className="t-caption" style={{ color: "var(--on-dark-faint)" }}>© {new Date().getFullYear()} Moo Sviit · Saaremaa, Eesti</span>
          <span className="t-caption" style={{ color: "var(--on-dark-faint)", fontStyle: "italic", fontFamily: "var(--font-display)", fontSize: 15 }}>Saaremaa rahust sündinud.</span>
        </div>
      </Container>
    </div>
  </footer>
);

Object.assign(window, { Footer });

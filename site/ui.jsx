/* Shared UI primitives — buttons, eyebrows, scroll-reveal. */
const { useState, useEffect, useRef } = React;

/* Ember pill (primary) + ghost (secondary). onDark switches borders/text. */
const Button = ({ children, variant = "primary", onDark = false, onClick, style = {}, type = "button" }) => {
  const base = {
    fontFamily: "var(--font-body)", fontSize: 15, fontWeight: 600, letterSpacing: "0.01em",
    border: "none", borderRadius: "var(--r-pill)", padding: "14px 26px", cursor: "pointer",
    display: "inline-flex", alignItems: "center", gap: 9, transition: "all .35s var(--ease)",
    lineHeight: 1, ...style,
  };
  const variants = {
    primary: { background: "var(--ember)", color: "var(--on-ember)" },
    ghost: {
      background: "transparent",
      color: onDark ? "var(--on-dark)" : "var(--ink)",
      border: `1px solid ${onDark ? "var(--line-dark)" : "var(--line-light)"}`,
    },
    solid: { background: onDark ? "var(--bone)" : "var(--ink)", color: onDark ? "var(--ink)" : "var(--bone)" },
  };
  return <button type={type} className={`ms-btn ms-btn--${variant}`} onClick={onClick} style={{ ...base, ...variants[variant] }}>{children}</button>;
};

const Eyebrow = ({ children, onDark = false, style = {} }) => (
  <div className="t-eyebrow" style={{ color: onDark ? "var(--ember-soft)" : "var(--ember)", ...style }}>{children}</div>
);

/* Scroll-reveal: fades + lifts children when they enter the viewport. */
const Reveal = ({ children, delay = 0, y = 22, style = {}, as = "div" }) => {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { setShown(true); io.unobserve(el); } });
    }, { threshold: 0.14, rootMargin: "0px 0px -8% 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const Tag = as;
  return (
    <Tag ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? "none" : `translateY(${y}px)`,
      transition: `opacity .8s var(--ease) ${delay}s, transform .8s var(--ease) ${delay}s`,
      ...style,
    }}>{children}</Tag>
  );
};

/* Section wrapper with consistent gutters + max width. */
const Container = ({ children, style = {}, narrow = false }) => (
  <div style={{ width: "100%", maxWidth: narrow ? 920 : 1240, margin: "0 auto", padding: "0 clamp(20px, 5vw, 64px)", ...style }}>{children}</div>
);

/* Smooth-scroll to a section id, accounting for the fixed header. */
const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.pageYOffset - 64;
  window.scrollTo({ top, behavior: "smooth" });
};

Object.assign(window, { Button, Eyebrow, Reveal, Container, scrollToId });

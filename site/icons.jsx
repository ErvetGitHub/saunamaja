/* Line icons — thin, rounded, Lucide-style. Quiet Nordic wayfinding. */
/* Resource resolver — returns an inlined blob URL when bundled standalone,
   otherwise falls back to the plain relative path (normal preview). */
window.RES = window.RES || ((p) => (window.__resources && window.__resources[p]) || p);
const Svg = ({ s = 20, sw = 1.6, c = "currentColor", children }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c}
       strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round"
       style={{ display: "block", flexShrink: 0 }}>{children}</svg>
);
const IMenu = (p) => <Svg {...p}><line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/></Svg>;
const IClose = (p) => <Svg {...p}><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></Svg>;
const IArrow = (p) => <Svg {...p}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="13 6 19 12 13 18"/></Svg>;
const IArrowDown = (p) => <Svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><polyline points="6 13 12 19 18 13"/></Svg>;
const IPlus = (p) => <Svg {...p}><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></Svg>;
const ICheck = (p) => <Svg {...p}><polyline points="20 6 9 17 4 12"/></Svg>;
const IPin = (p) => <Svg {...p}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="2.6"/></Svg>;
const IPhone = (p) => <Svg {...p}><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6 19.8 19.8 0 0 1-3.1-8.7A2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/></Svg>;
const IMail = (p) => <Svg {...p}><rect x="2" y="4" width="20" height="16" rx="2"/><polyline points="3 6 12 13 21 6"/></Svg>;
const IRuler = (p) => <Svg {...p}><path d="M3 8h18v8H3z"/><line x1="7" y1="8" x2="7" y2="12"/><line x1="11" y1="8" x2="11" y2="11"/><line x1="15" y1="8" x2="15" y2="12"/><line x1="19" y1="8" x2="19" y2="11"/></Svg>;
const IHome = (p) => <Svg {...p}><path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M9.5 21v-6h5v6"/></Svg>;
const IFlame = (p) => <Svg {...p}><path d="M12 2c1 4-2.5 5-2.5 8a2.5 2.5 0 0 0 5 0c0-1-.5-2-.5-2 2 1.5 3.5 3.5 3.5 6a5.5 5.5 0 0 1-11 0c0-4 4-6 5.5-10z"/></Svg>;
const ILeaf = (p) => <Svg {...p}><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.85-5.4 5.08-6"/></Svg>;
const IChevron = (p) => <Svg {...p}><polyline points="6 9 12 15 18 9"/></Svg>;
const IInstagram = (p) => <Svg {...p}><rect x="2" y="2" width="20" height="20" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1" fill={p.c || "currentColor"} stroke="none"/></Svg>;
const IFacebook = (p) => <Svg {...p}><path d="M16 8.5h-2.2c-.7 0-1.3.6-1.3 1.3V12H16l-.5 3h-3v7"/><path d="M12.5 22a10 10 0 1 0-1 0z"/></Svg>;

Object.assign(window, { IMenu, IClose, IArrow, IArrowDown, IPlus, ICheck, IPin, IPhone, IMail, IRuler, IHome, IFlame, ILeaf, IChevron, IInstagram, IFacebook });

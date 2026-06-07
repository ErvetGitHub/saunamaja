/* Brand data — sauna models + configurator options + indicative pricing. Estonian (Saaremaa).
   NB: all prices are PLACEHOLDER indicative figures (näidishinnad) — replace with real numbers. */

const MODELS = [
  {
    id: "rahu", name: "Rahu", sub: "Kadaka", place: "Undva",
    size: "1400 × 1800", area: "≈ 3 m²", rooms: "Leiliruum",
    tier: "Kompaktne", base: 8900,
    blurb: "Lihtsus ja ehtne leil.",
    desc: "Kompaktne ja taskukohane saun neile, kes hindavad lihtsust ja ehtsat leili. Väike mõõt teeb selle ideaalseks suvilasse, mere äärde või väiksemasse aeda. Kõik vajalik ühe tõeliselt hea sauna jaoks.",
    photo: RES("assets/photos/juniper-macro.jpg"),
  },
  {
    id: "tuul", name: "Tuul", sub: "Loode", place: "Triigi",
    size: "3300 × 1800", area: "≈ 6 m²", rooms: "Leiliruum + eesruum",
    tier: "Hubane", base: 14500,
    blurb: "Tasakaal ruumi ja mugavuse vahel.",
    desc: "Praktiline ja hubane saunamaja väikese eesruumiga, kuhu mahub pink ja nagid riiete jaoks. Täpselt paras suurus perele või sõpradega õhtuseks saunaks. Tasakaal hinna, mugavuse ja ruumikuse vahel.",
    photo: RES("assets/photos/forest.jpg"),
  },
  {
    id: "ranna", name: "Ranna", sub: "Laid", place: "Ninase / Vilsandi",
    size: "4000 × 2500", area: "≈ 10 m²", rooms: "Leiliruum + avar eesruum",
    tier: "Avar", base: 21900,
    blurb: "Tõeline saunamaja tunne.",
    desc: "Avar eesruum loob tõelise saunamaja tunde — siia mahub juba diivan, laud või mõnus puhkenurk. Ideaalne pikemateks saunaõhtuteks ja mereäärseks puhkuseks.",
    photo: RES("assets/photos/juniper-sea.jpg"),
  },
  {
    id: "meri", name: "Meri", sub: "Rahula", place: "Kaali / Panga",
    size: "5000 × 3200", area: "≈ 16 m²", rooms: "Leiliruum + puhkeruum / kööginurk",
    tier: "Luksuslik", base: 32900,
    blurb: "Täielik puhkeelamus.",
    desc: "Moosviidu kõige avaram ja luksuslikum saunamaja. Suures eesruumis on ruumi diivanile, kööginurgale ja pikematele saunaõhtutele. Ideaalne neile, kes soovivad rohkem kui lihtsalt sauna — täielikku puhkeelamust.",
    photo: RES("assets/photos/coast-juniper-golden.webp"),
  },
];

/* Configurator option groups — mirrors the prototype's material structure.
   `showIf(cfg)` hides a group when irrelevant (Värvus only for board facades).
   `color` / `sw` carry the visual the live SaunaPreview re-skins with.
   price = € delta added to model base. ALL PRICES ARE PLACEHOLDERS. */
const CONFIG = [
  {
    key: "raam", label: "Raam", multi: false,
    options: [
      { id: "puit", name: "Puitraam", note: "Soe, traditsiooniline joon", price: 0 },
      { id: "metall", name: "Metallraam", note: "Peenem, modernne raam", price: 800 },
    ],
  },
  {
    key: "fassaad", label: "Fassaad", multi: false,
    options: [
      { id: "tavalaudis", name: "Tavalaudis", note: "Klassikaline püstlaudis", price: 0 },
      { id: "vaariespuit", name: "Väärispuit", note: "Rikkalik, õlitatud süü", price: 2200 },
      { id: "klaas", name: "Klaasfassaad", note: "Avar vaade loodusele", price: 2800 },
      { id: "peegelklaas", name: "Peegelklaas", note: "Peegeldab maastikku", price: 3400 },
      { id: "klaasuks", name: "Klaasuksega sein", note: "Suur klaasuks + puit", price: 1900 },
    ],
  },
  {
    key: "varvus", label: "Värvus", multi: false,
    showIf: (c) => ["tavalaudis", "vaariespuit"].includes(c.fassaad),
    options: [
      { id: "naturaalne", name: "Naturaalne", note: "Õlitatud mänd", price: 0, color: "#c89a5e" },
      { id: "korbenud", name: "Kõrbenud must", note: "Shou Sugi Ban", price: 600, color: "#2f2a26" },
      { id: "kadakahall", name: "Kadakahall", note: "Mereilmastunud hõbe", price: 600, color: "#9a9a8e" },
      { id: "syvaroheline", name: "Süvaroheline", note: "Kadakatoon", price: 700, color: "#46543f" },
    ],
  },
  {
    key: "lava", label: "Lava", multi: false,
    options: [
      { id: "tavalaud", name: "Tavalaud", note: "Soe haab", price: 0, sw: "#d8c4a0" },
      { id: "termopuit", name: "Termopuit", note: "Tumedam, vastupidav", price: 900, sw: "#9c6b42" },
    ],
  },
  {
    key: "porand", label: "Põrand", multi: false,
    options: [
      { id: "vinyyl", name: "Vinüül", note: "Soe ja vaikne", price: 0, sw: "#b8b0a4" },
      { id: "plaat", name: "Plaat", note: "Klassikaline keraamika", price: 700, sw: "#8c8780" },
      { id: "mikrotsement", name: "Mikrotsement", note: "Õmblusteta, modernne", price: 1400, sw: "#a59f95" },
    ],
  },
  {
    key: "keris", label: "Keris", multi: false,
    options: [
      { id: "puu", name: "Puuküttega keris", note: "Ehtne leil ja praginad", price: 0 },
      { id: "elekter", name: "Elektrikeris", note: "Mugav, kiire soojenemine", price: 600 },
      { id: "hybriid", name: "Hübriidkeris", note: "Puu + elekter", price: 1500 },
      { id: "pidev", name: "Pidevküttega keris", note: "Suurtele saunadele", price: 2200 },
    ],
  },
  {
    key: "transport", label: "Transport ja paigaldus", multi: false,
    options: [
      { id: "jarele", name: "Tehasest järele", note: "Kuressaare — tuled ise", price: 0 },
      { id: "saaremaa", name: "Saaremaa & Muhu", note: "Vedu + paigaldus saarel", price: 500 },
      { id: "laane", name: "Lääne-Eesti", note: "Pärnu, Haapsalu, Lihula", price: 1200 },
      { id: "pohja", name: "Põhja-Eesti", note: "Tallinn, Harjumaa", price: 1600 },
      { id: "louna", name: "Lõuna- ja Ida-Eesti", note: "Tartu, Narva, Võru", price: 1900 },
    ],
  },
  {
    key: "lisad", label: "Lisad", multi: true,
    options: [
      { id: "terrass", name: "Välisterrass", note: "Termopuit, integreeritud", price: 3200 },
      { id: "led", name: "LED-valgustus", note: "Hämardatav, soe valgus", price: 650 },
      { id: "vihtlemine", name: "Vihtlemisnurk", note: "Saaremaa kasevihad", price: 180 },
      { id: "aknad", name: "Akende pakett", note: "Lisavalgus eesruumi", price: 1100 },
      { id: "vesi", name: "Veepaak & duš", note: "Soe vesi mere ääres", price: 1500 },
    ],
  },
];

const DEFAULTS = { raam: "puit", fassaad: "tavalaudis", varvus: "naturaalne", lava: "tavalaud", porand: "vinyyl", keris: "puu", transport: "jarele", lisad: [] };

/* Indicative total = model base + selected option deltas. Hidden groups are skipped. */
const computePrice = (cfg) => {
  const m = MODELS.find((x) => x.id === cfg.model) || MODELS[0];
  let total = m.base;
  CONFIG.forEach((g) => {
    if (g.showIf && !g.showIf(cfg)) return;
    if (g.multi) {
      cfg[g.key].forEach((id) => { const o = g.options.find((x) => x.id === id); if (o) total += o.price; });
    } else {
      const o = g.options.find((x) => x.id === cfg[g.key]); if (o) total += o.price;
    }
  });
  return total;
};

/* Format euros with a thin-space thousands separator: 21900 -> "21 900 €" */
const eur = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00A0") + "\u00A0€";

/* "+900 €" — surcharge delta shown on non-default options */
const eurDelta = (n) => "+\u2009" + eur(n);

const CONTACT = {
  phone: "+372 5xx xx xxx",
  email: "tere@moosviit.ee",
  place: "Kuressaare · Saaremaa · Eesti",
};

Object.assign(window, { MODELS, CONFIG, DEFAULTS, computePrice, eur, eurDelta, CONTACT });

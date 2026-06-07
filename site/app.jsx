/* App — assembles the page and owns the configurator state so model cards can drive it. */
const App = () => {
  const [cfg, setCfg] = useState({ model: "tuul", ...DEFAULTS });

  const selectModel = (id) => {
    setCfg((c) => ({ ...c, model: id }));
    setTimeout(() => scrollToId("konfigureeri"), 60);
  };

  return (
    <div className="ms">
      <Header />
      <Hero />
      <Story />
      <Models onSelect={selectModel} />
      <Configurator cfg={cfg} setCfg={setCfg} />
      <Gallery />
      <Footer />
    </div>);

};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
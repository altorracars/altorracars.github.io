// ============================================================
// ALTORRA · Cinematic SIMULATOR · v2 (mirror del repo real)
// Bancos reales: SUFI · OCCIDENTE · FINANDINA · FINANZAUTO · MOBILIZE
// 3 modalidades: Tradicional · Con extras · Leasing
// Grupos de riesgo G1 / G2 / G3 / G4
// ============================================================
(function () {
  const { useState, useEffect, useMemo } = React;
  const data = window.AltorraData;
  const fmtP = (n) => typeof n === 'number' ? '$' + Number(Math.round(n)).toLocaleString('es-CO') : n;

  // Bancos con tasas estimadas (referencial — la simulación real del repo usa una matriz por grupo de riesgo)
  const BANKS = [
    { id: 'SUFI',       name: 'Bancolombia · SUFI',         rates: { G1: 0.0096, G2: 0.0102, G3: 0.0108, G4: 0.0114 }, maxPlazo: 84, minCredito: 30000000, supportsLeasing: true,  supportsExtras: true,  topeFactor: 0.062 },
    { id: 'OCCIDENTE',  name: 'Banco de Occidente',         rates: { G1: 0.0097, G2: 0.0103, G3: 0.0109, G4: 0.0115 }, maxPlazo: 72, minCredito: 25000000, supportsLeasing: true,  supportsExtras: true,  topeFactor: 0.047 },
    { id: 'FINANDINA',  name: 'Finandina',                   rates: { G1: 0.0096, G2: 0.0102, G3: 0.0108, G4: 0.0118 }, maxPlazo: 84, minCredito: 20000000, supportsLeasing: true,  supportsExtras: true,  topeFactor: 0.020 },
    { id: 'FINANZAUTO', name: 'Finanzauto',                  rates: { G1: 0.0103, G2: 0.0110, G3: 0.0117, G4: 0.0124 }, maxPlazo: 84, minCredito: 30000000, supportsLeasing: false, supportsExtras: true,  topeFactor: 0.082 },
    { id: 'MOBILIZE',   name: 'Mobilize (Renault Bank)',     rates: { G1: 0.0106, G2: 0.0114, G3: 0.0122, G4: null  }, maxPlazo: 48, minCredito: 25000000, supportsLeasing: false, supportsExtras: false, topeFactor: 0.060 },
  ];

  const RISKS = [
    { id: 'G1', label: 'G1 · Score 700+',   desc: 'Excelente perfil — sin reportes' },
    { id: 'G2', label: 'G2 · Score 600–699', desc: 'Buen perfil — historial estable' },
    { id: 'G3', label: 'G3 · Score 500–599', desc: 'Perfil intermedio' },
    { id: 'G4', label: 'G4 · Score <500',     desc: 'Perfil con observaciones' },
  ];

  function cuota(principal, rateMV, n) {
    if (!principal || !rateMV || !n) return 0;
    return principal * rateMV / (1 - Math.pow(1 + rateMV, -n));
  }

  function Simulator() {
    const params = new URL(window.location.href).searchParams;
    const initialId = params.get('id') || data.VEHICLES[0].id;
    const [vehicleId, setVehicleId] = useState(initialId);
    const v = useMemo(() => data.VEHICLES.find(x => x.id === vehicleId) || data.VEHICLES[0], [vehicleId]);

    const [price, setPrice] = useState(v.price);
    const [down, setDown] = useState(Math.round(v.price * 0.30));
    const [months, setMonths] = useState(+params.get('months') || 60);
    const [risk, setRisk] = useState('G2');
    const [extraCuota, setExtraCuota] = useState(0);
    const [opcionCompra, setOpcionCompra] = useState(0.01);

    useEffect(() => { setPrice(v.price); setDown(Math.round(v.price * 0.30)); }, [v]);

    const principal = Math.max(0, price - down);
    const downPct = ((down / price) * 100).toFixed(1);

    const results = BANKS.map(b => {
      const rate = b.rates[risk];
      const usedMonths = Math.min(months, b.maxPlazo);

      // Validaciones especiales (mirror del repo)
      let tradMsg = null, extrasMsg = null, leasingMsg = null;

      if (principal < b.minCredito) {
        tradMsg = extrasMsg = leasingMsg = `Crédito mínimo ${fmtP(b.minCredito)}`;
      }
      if (rate === null) {
        tradMsg = extrasMsg = leasingMsg = 'NO APLICA · grupo de riesgo';
      }
      if (months > b.maxPlazo) {
        if (b.id === 'MOBILIZE') tradMsg = `Plazo 12 a ${b.maxPlazo}`;
      }

      const trad = tradMsg || cuota(principal, rate, usedMonths);
      const extras = !b.supportsExtras ? 'NO APLICA' :
        (extrasMsg || cuota(Math.max(0, principal - (extraCuota * 12)), rate, usedMonths));
      const leasing = !b.supportsLeasing ? 'NO APLICA' :
        (leasingMsg || cuota(principal * (1 - opcionCompra), rate, usedMonths));

      const tope = Math.round(b.topeFactor * 50000000); // referencial
      const ea = rate ? (Math.pow(1 + rate, 12) - 1) * 100 : null;

      return { ...b, rate, ea, usedMonths, trad, extras, leasing, tope };
    });

    const bestId = useMemo(() => {
      const nums = results.filter(r => typeof r.trad === 'number');
      if (!nums.length) return null;
      return nums.reduce((a, b) => a.trad < b.trad ? a : b).id;
    }, [results]);

    return (
      <main className="sim-page" data-screen-label="Simulador">
        <section className="sim-hero">
          <a href="catalog.html" className="cmp-back">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 18l-6-6 6-6"/></svg>
            Volver al catálogo
          </a>
          <span className="cin-eyebrow">Simulador · 5 bancos aliados</span>
          <h1 className="sim-h">
            Tu cuota mensual,<br/>
            <span className="sim-h-accent">comparada al instante.</span>
          </h1>
          <p className="sim-sub">
            Simulamos con SUFI, Occidente, Finandina, Finanzauto y Mobilize. Resultado referencial —
            cada banco confirma con la solicitud formal de pre-aprobación.
          </p>
        </section>

        <section className="sim-grid">
          <div className="sim-controls">
            <label className="sim-control">
              <span className="sim-label">Vehículo</span>
              <select value={vehicleId} onChange={(e) => setVehicleId(e.target.value)} className="sim-select">
                {data.VEHICLES.map(x => <option key={x.id} value={x.id}>{x.brandName} {x.model} · {x.year}</option>)}
              </select>
            </label>

            <label className="sim-control">
              <span className="sim-label">Precio del vehículo</span>
              <input type="number" className="sim-input" value={price} onChange={(e) => setPrice(+e.target.value || 0)}/>
              <span className="sim-range-meta"><span>{fmtP(price)}</span></span>
            </label>

            <label className="sim-control">
              <span className="sim-label">
                Cuota inicial · <strong>{fmtP(down)}</strong> <em>({downPct}%)</em>
              </span>
              <input type="range" className="sim-range" min={Math.round(price * 0.15)} max={Math.round(price * 0.7)} step={500000} value={down} onChange={(e) => setDown(+e.target.value)}/>
              <span className="sim-range-meta"><span>15%</span><span>70%</span></span>
            </label>

            <label className="sim-control">
              <span className="sim-label">Plazo · <strong>{months} meses</strong></span>
              <input type="range" className="sim-range" min={12} max={84} step={6} value={months} onChange={(e) => setMonths(+e.target.value)}/>
              <span className="sim-range-meta"><span>12m</span><span>84m</span></span>
            </label>

            <label className="sim-control">
              <span className="sim-label">Grupo de riesgo</span>
              <div className="sim-bank-pills">
                {RISKS.map(r => (
                  <button key={r.id} type="button" className={`sim-bank-pill ${risk === r.id ? 'is-on' : ''}`} onClick={() => setRisk(r.id)}>
                    {r.label}
                    <small>{r.desc}</small>
                  </button>
                ))}
              </div>
            </label>

            <label className="sim-control">
              <span className="sim-label">Cuota extra anual (modalidad Con Extras)</span>
              <input type="number" className="sim-input" value={extraCuota} onChange={(e) => setExtraCuota(+e.target.value || 0)} placeholder="0"/>
              <small className="sim-help">Pago adicional una vez al año para reducir tu cuota mensual.</small>
            </label>

            <label className="sim-control">
              <span className="sim-label">Opción de compra · Leasing</span>
              <select className="sim-select" value={opcionCompra} onChange={(e) => setOpcionCompra(+e.target.value)}>
                <option value={0.01}>1% (mínimo)</option>
                <option value={0.10}>10%</option>
                <option value={0.20}>20%</option>
                <option value={0.30}>30%</option>
              </select>
            </label>
          </div>

          <div className="sim-result">
            <span className="cin-eyebrow">Resumen</span>
            <div className="sim-result-grid">
              <div><span>Precio</span><strong>{fmtP(price)}</strong></div>
              <div><span>Cuota inicial</span><strong>{fmtP(down)} ({downPct}%)</strong></div>
              <div><span>A financiar</span><strong>{fmtP(principal)}</strong></div>
              <div><span>Plazo</span><strong>{months} meses</strong></div>
              <div><span>Riesgo</span><strong>{risk}</strong></div>
            </div>
            <div className="sim-result-actions">
              <button type="button" className="sim-cta" data-altorra-open="finance" data-vehiculo={`${v.brandName} ${v.model} ${v.year}`}>
                Solicitar pre-aprobación
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>
              <a href={`detail.html?id=${v.id}`} className="sim-cta sim-cta--alt">Ver vehículo</a>
            </div>
          </div>
        </section>

        {/* Tabla comparativa de los 5 bancos × 3 modalidades */}
        <section className="sim-banks-section">
          <div className="sim-banks-head">
            <span className="cin-eyebrow">5 bancos · 3 modalidades</span>
            <h2 className="sim-section-h">Cuál te conviene</h2>
            <p style={{ fontSize: 13, color: 'var(--cin-ink-soft)', margin: '8px 0 0', maxWidth: 580 }}>
              <strong>Tradicional</strong>: cuota fija. <strong>Con Extras</strong>: pagas un extra al año y bajas la cuota mensual. <strong>Leasing</strong>: pagas más bajo, pero al final eliges si compras el carro.
            </p>
          </div>
          <div className="sim-banks-grid">
            <div className="sim-banks-head-row">
              <span>Banco</span>
              <span>Tradicional</span>
              <span>Con Extras</span>
              <span>Leasing</span>
              <span>Tasa EA</span>
            </div>
            {results.map(r => (
              <div key={r.id} className={`sim-bank-row ${r.id === bestId ? 'is-best' : ''}`}>
                <span className="sim-bank-name">
                  {r.name}
                  {r.id === bestId && <em>· mejor opción</em>}
                </span>
                <span className={`sim-bank-quota ${typeof r.trad === 'number' ? '' : 'is-na'}`}>
                  {typeof r.trad === 'number' ? <>{fmtP(r.trad)}<small>/mes</small></> : r.trad}
                </span>
                <span className={`sim-bank-quota ${typeof r.extras === 'number' ? '' : 'is-na'}`}>
                  {typeof r.extras === 'number' ? <>{fmtP(r.extras)}<small>/mes</small></> : r.extras}
                </span>
                <span className={`sim-bank-quota ${typeof r.leasing === 'number' ? '' : 'is-na'}`}>
                  {typeof r.leasing === 'number' ? <>{fmtP(r.leasing)}<small>/mes</small></> : r.leasing}
                </span>
                <span className="sim-bank-rate">{r.ea ? r.ea.toFixed(2) + '%' : '—'}</span>
              </div>
            ))}
          </div>
          <p className="sim-disclaimer">
            * Simulación referencial sin verificar perfil crediticio. Tasas calculadas según grupo de riesgo seleccionado.
            El banco aliado confirma condiciones finales con tu solicitud formal. "NO APLICA" indica que la modalidad o
            plazo no está disponible en ese banco.
          </p>
        </section>
      </main>
    );
  }

  (function safeMount(fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); })(() => {
    document.body.setAttribute('data-cin', 'on');
    const m = document.getElementById('simulator-root');
    if (m) ReactDOM.createRoot(m).render(<Simulator/>);
  });
})();
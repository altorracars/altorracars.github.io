// ============================================================
// ALTORRA · Cinematic COMPARE · /compare.html?a=v01&b=v02
// Two-vehicle side-by-side with diff highlighting
// ============================================================
(function () {
  const { useState, useEffect, useMemo } = React;
  const data = window.AltorraData;

  const fmtPrice = (n) => '$' + Number(n).toLocaleString('es-CO');
  const fmtKm    = (n) => Number(n).toLocaleString('es-CO') + ' km';

  function getIds() {
    const u = new URL(window.location.href);
    const a = u.searchParams.get('a');
    const b = u.searchParams.get('b');
    let arr = [];
    if (a) arr.push(a);
    if (b) arr.push(b);
    if (!arr.length) {
      try { arr = JSON.parse(localStorage.getItem('alt-cmp') || '[]').slice(0, 2); } catch {}
    }
    return arr.slice(0, 2);
  }

  // ---------- Picker (when a slot is empty) ----------
  function VehiclePicker({ excludeId, onPick, onClose }) {
    const [q, setQ] = useState('');
    const list = useMemo(() => {
      const s = q.trim().toLowerCase();
      return data.VEHICLES.filter(v => {
        if (v.id === excludeId) return false;
        if (!s) return true;
        const hay = (v.brandName + ' ' + v.model + ' ' + v.year).toLowerCase();
        return hay.includes(s);
      }).slice(0, 30);
    }, [q, excludeId]);

    useEffect(() => {
      const onKey = (e) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    return (
      <div className="cmp-picker" onClick={onClose} role="dialog" aria-label="Elegir vehículo">
        <div className="cmp-picker-panel" onClick={(e) => e.stopPropagation()}>
          <div className="cmp-picker-head">
            <h3>Elige un vehículo</h3>
            <button type="button" className="cmp-picker-close" onClick={onClose} aria-label="Cerrar">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 6 18 18M6 18 18 6"/></svg>
            </button>
          </div>
          <div className="cmp-picker-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            <input autoFocus type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Marca, modelo, año…"/>
          </div>
          <div className="cmp-picker-list">
            {list.map((v) => (
              <button key={v.id} className="cmp-picker-item" onClick={() => onPick(v.id)}>
                <span className="cmp-picker-thumb" style={{ background: v.images[0].bg }}/>
                <span className="cmp-picker-info">
                  <span className="cmp-picker-brand">{v.brandName}</span>
                  <span className="cmp-picker-model">{v.model} · {v.year}</span>
                </span>
                <span className="cmp-picker-price">{fmtPrice(v.price)}</span>
              </button>
            ))}
            {list.length === 0 && (
              <div className="cmp-picker-empty">Sin resultados para «{q}»</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // ---------- Slot ----------
  function VehicleSlot({ v, onPick, onRemove, otherV, side }) {
    if (!v) {
      return (
        <button type="button" className="cmp-slot is-empty" onClick={onPick}>
          <span className="cmp-slot-empty-icon">
            <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M12 5v14M5 12h14"/></svg>
          </span>
          <span className="cmp-slot-empty-title">Agregar vehículo {side}</span>
          <span className="cmp-slot-empty-sub">Elige cualquiera del catálogo</span>
        </button>
      );
    }
    return (
      <div className="cmp-slot is-filled">
        <div className="cmp-slot-media" style={{ background: v.images[0].bg }}>
          <button type="button" className="cmp-slot-remove" onClick={onRemove} aria-label="Quitar">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 6 18 18M6 18 18 6"/></svg>
          </button>
          <span className="cmp-slot-brand-mark">
            <img src={data.BRANDS.find(b => b.slug === v.brand)?.logo} alt={v.brandName}/>
          </span>
          <svg className="cmp-slot-svg" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet">
            <ellipse cx="200" cy="208" rx="170" ry="6" fill="rgba(0,0,0,0.5)"/>
            <path d="M55 178 Q70 110 130 100 L195 90 Q260 90 320 102 Q355 112 360 178 L355 188 Q200 200 55 188 Z"
                  fill="rgba(244,238,222,0.10)" stroke="rgba(244,238,222,0.4)" strokeWidth="1.2"/>
            <path d="M120 100 Q140 70 200 68 Q260 70 290 100 L260 110 Q200 102 140 110 Z"
                  fill="rgba(180,220,255,0.16)" stroke="rgba(244,238,222,0.32)" strokeWidth="0.8"/>
            <circle cx="115" cy="180" r="22" fill="#08070A" stroke="rgba(244,238,222,0.5)" strokeWidth="1.5"/>
            <circle cx="115" cy="180" r="9" fill="rgba(212,168,90,0.85)"/>
            <circle cx="290" cy="180" r="22" fill="#08070A" stroke="rgba(244,238,222,0.5)" strokeWidth="1.5"/>
            <circle cx="290" cy="180" r="9" fill="rgba(212,168,90,0.85)"/>
          </svg>
        </div>
        <div className="cmp-slot-info">
          <span className="cmp-slot-brand">{v.brandName}</span>
          <h3 className="cmp-slot-model">{v.model}</h3>
          <span className="cmp-slot-year">{v.year} · {data.CATEGORIES.find(c => c.slug === v.cat)?.name || v.cat}</span>
          <span className="cmp-slot-price">{fmtPrice(v.price)}</span>
          <a href={`detail.html?id=${v.id}`} className="cmp-slot-link">
            Ver ficha
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
          </a>
        </div>
      </div>
    );
  }

  // ---------- Diff row ----------
  function diffWinner(rowDef, a, b) {
    if (!a || !b) return null;
    const va = rowDef.get(a);
    const vb = rowDef.get(b);
    if (typeof va !== 'number' || typeof vb !== 'number') return null;
    if (va === vb) return null;
    // For "better" semantics: lowerIsBetter or higherIsBetter
    const lower = rowDef.lowerIsBetter;
    const aBetter = lower ? va < vb : va > vb;
    return aBetter ? 'a' : 'b';
  }

    function CompareTable({ a, b }) {
    const GROUPS = [
      { title: 'Información General', rows: [
        { label: 'Año',          get: v => v?.year,                              fmt: x => x,                              lowerIsBetter: false },
        { label: 'Carrocería',   get: v => data.CATEGORIES.find(c => c.slug === v?.cat)?.name || v?.cat, fmt: x => x },
        { label: 'Color',        get: v => v?.color,                             fmt: x => x },
        { label: 'Condición',    get: v => v?.condition,                         fmt: x => x === 'nuevo' ? '0 KM · Estreno' : 'Usado verificado' },
      ]},
      { title: 'Motor y rendimiento', rows: [
        { label: 'Cilindrada',   get: v => v?.cc,                                fmt: x => x },
        { label: 'Potencia',     get: v => parseInt((v?.power || '').replace(/\D/g, ''), 10), fmt: (x, v) => v?.power || '—', lowerIsBetter: false },
        { label: 'Combustible',  get: v => v?.fuel,                              fmt: x => x },
        { label: 'Transmisión',  get: v => v?.trans,                             fmt: x => x },
        { label: 'Tracción',     get: v => v?.cat === 'pickup' ? '4x4' : (v?.cat === 'suv' ? '4x2/4x4' : 'Delantera'), fmt: x => x },
      ]},
      { title: 'Comercial', rows: [
        { label: 'Precio',       get: v => v?.price,                             fmt: x => fmtPrice(x),                    lowerIsBetter: true },
        { label: 'Cuota desde',  get: v => v?.cuotaDesde,                        fmt: x => fmtPrice(x) + '/mes',           lowerIsBetter: true },
      ]},
      { title: 'Estado y documentación', rows: [
        { label: 'Kilometraje',  get: v => v?.km,                                fmt: x => fmtKm(x),                       lowerIsBetter: true },
        { label: 'Año modelo',   get: v => v?.year,                              fmt: x => x,                              lowerIsBetter: false },
        { label: 'Único dueño',  get: v => v?.km < 30000 ? 'Sí' : 'A confirmar', fmt: x => x },
        { label: 'Tecnomecánica', get: v => 'Vigente',                           fmt: x => x },
        { label: 'Ubicación',    get: v => v?.city,                              fmt: x => x },
      ]},
    ];

    return (
      <div className="cmp-table">
        {GROUPS.map((g) => (
          <div key={g.title} className="cmp-group">
            <h3 className="cmp-group-title">{g.title}</h3>
            <div className="cmp-rows">
              {g.rows.map((row) => {
                const va = a ? row.get(a) : null;
                const vb = b ? row.get(b) : null;
                const winner = diffWinner(row, a, b);
                return (
                  <div className="cmp-row" key={row.label}>
                    <span className="cmp-row-label">{row.label}</span>
                    <span className={`cmp-row-cell ${winner === 'a' ? 'is-win' : (a && b && winner === 'b' ? 'is-lose' : '')}`}>
                      {a ? row.fmt(va, a) : '—'}
                    </span>
                    <span className={`cmp-row-cell ${winner === 'b' ? 'is-win' : (a && b && winner === 'a' ? 'is-lose' : '')}`}>
                      {b ? row.fmt(vb, b) : '—'}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // ---------- Compare root ----------
  function Compare() {
    const [ids, setIds] = useState(getIds());
    const [pickerSide, setPickerSide] = useState(null); // 'a' | 'b' | null

    useEffect(() => {
      const u = new URL(window.location.href);
      if (ids[0]) u.searchParams.set('a', ids[0]); else u.searchParams.delete('a');
      if (ids[1]) u.searchParams.set('b', ids[1]); else u.searchParams.delete('b');
      window.history.replaceState({}, '', u);
      localStorage.setItem('alt-cmp', JSON.stringify(ids));
    }, [ids]);

    const a = ids[0] ? data.VEHICLES.find(v => v.id === ids[0]) : null;
    const b = ids[1] ? data.VEHICLES.find(v => v.id === ids[1]) : null;

    const pick = (id) => {
      const next = [...ids];
      if (pickerSide === 'a') next[0] = id;
      else if (pickerSide === 'b') next[1] = id;
      setIds(next.filter(Boolean));
      setPickerSide(null);
    };
    const remove = (side) => {
      const next = [...ids];
      if (side === 'a') next[0] = undefined;
      else next[1] = undefined;
      setIds(next.filter(Boolean));
    };

    return (
      <main className="cmp-page" data-screen-label="Comparar">
        <section className="cmp-hero">
          <a href="catalog.html" className="cmp-back">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 18l-6-6 6-6"/></svg>
            Volver al catálogo
          </a>
          <span className="cin-eyebrow">Comparador · máx 2</span>
          <h1 className="cmp-h">Pon dos vehículos <span className="cmp-h-accent">lado a lado.</span></h1>
          <p className="cmp-sub">Las diferencias se resaltan automáticamente. Lo mejor de cada uno te lo señalamos en dorado.</p>
        </section>

        <section className="cmp-slots-section">
          <div className="cmp-slots">
            <VehicleSlot v={a} otherV={b} side="A"
                         onPick={() => setPickerSide('a')}
                         onRemove={() => remove('a')}/>
            <span className="cmp-vs">VS</span>
            <VehicleSlot v={b} otherV={a} side="B"
                         onPick={() => setPickerSide('b')}
                         onRemove={() => remove('b')}/>
          </div>
        </section>

        {(a || b) && (
          <section className="cmp-table-section">
            <CompareTable a={a} b={b}/>

            {a && b && (
              <div className="cmp-verdict">
                <span className="cin-eyebrow">Veredicto</span>
                <h3 className="cmp-verdict-h">
                  {a.price < b.price
                    ? <>El <em>{a.brandName} {a.model}</em> ofrece mejor precio.</>
                    : a.price > b.price
                      ? <>El <em>{b.brandName} {b.model}</em> ofrece mejor precio.</>
                      : <>Ambos están al mismo precio — la decisión está en los detalles.</>}
                </h3>
                <div className="cmp-verdict-actions">
                  <a href={`detail.html?id=${a.id}`} className="cmp-verdict-cta">Ver ${a.brandName}</a>
                  <a href={`detail.html?id=${b.id}`} className="cmp-verdict-cta">Ver ${b.brandName}</a>
                  <a
                    href={`https://wa.me/573235016747?text=${encodeURIComponent(
                      `Hola Altorra, estoy comparando:\n• ${a.brandName} ${a.model} ${a.year} — ${fmtPrice(a.price)}\n• ${b.brandName} ${b.model} ${b.year} — ${fmtPrice(b.price)}\n\nNecesito asesoría para decidir.\nComparación: ${window.location.href}`
                    )}`}
                    target="_blank" rel="noopener"
                    className="cmp-verdict-cta cmp-verdict-cta--wa">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 .9-1 2.3 0 1.3 1 2.6 1.1 2.8.1.2 2 3 4.8 4.2 2 .9 2.4 1 3.2.9.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.4zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l5.1-1.4c1.5.8 3.2 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
                    Consultar por WhatsApp
                  </a>
                </div>
              </div>
            )}
          </section>
        )}

        {!a && !b && (
          <section className="cmp-empty-section">
            <div className="cmp-empty">
              <span className="cmp-empty-mark">
                <svg viewBox="0 0 100 100" fill="none">
                  <rect x="20" y="20" width="25" height="60" stroke="currentColor" strokeWidth="0.8" opacity="0.4" strokeDasharray="3 4"/>
                  <rect x="55" y="20" width="25" height="60" stroke="currentColor" strokeWidth="0.8" opacity="0.4" strokeDasharray="3 4"/>
                  <path d="M48 50h4" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                </svg>
              </span>
              <h3>Empieza eligiendo dos vehículos</h3>
              <p>Selecciónalos del catálogo o desde la ficha individual con el botón «Comparar».</p>
              <a href="catalog.html" className="cmp-empty-cta">Ir al catálogo</a>
            </div>
          </section>
        )}

        {pickerSide && (
          <VehiclePicker
            excludeId={pickerSide === 'a' ? ids[1] : ids[0]}
            onPick={pick}
            onClose={() => setPickerSide(null)}
          />
        )}
      </main>
    );
  }

  (function safeMount(fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); })(() => {
    document.body.setAttribute('data-cin', 'on');
    const mount = document.getElementById('compare-root');
    if (mount) ReactDOM.createRoot(mount).render(<Compare/>);
  });
})();
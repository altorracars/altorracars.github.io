// ============================================================
// ALTORRA · ALTOR — Concierge AI bot (floating, vanilla React)
// Mirror del concierge.js del repo: chat flotante con respuestas
// guiadas, intent detection ligero y CTAs que abren modales.
// ============================================================
(function () {
  const { useState, useEffect, useRef, useMemo } = React;
  const data = window.AltorraData;

  // ---------- Knowledge base (mirror simplificado del repo) ----------
  const KB = {
    // intent keywords → response
    'vender|consignar|consigna|avaluo|avalúo|pongo en venta|cuanto vale mi|comprar mi': {
      text: 'Para vender tu auto en consignación: hacemos avalúo gratis, peritaje técnico, fotos profesionales y publicamos en nuestros canales. Solo facturamos cuando el carro se vende.',
      cta: { label: '🚗 Publica tu vehículo', action: 'sell' },
    },
    'financiar|financiacion|financiación|credito|crédito|cuota|tasa|simular': {
      text: 'Trabajamos con 5 bancos aliados (SUFI, Occidente, Finandina, Finanzauto y Mobilize). Te pre-aprobamos en 24 horas con la mejor tasa para tu perfil.',
      cta: { label: '💰 Simular crédito', action: '/simulator.html' },
    },
    'cita|visita|conocer|ver el carro|prueba de manejo|test drive|agendar': {
      text: 'Puedes agendar una visita presencial con el aliado o una videollamada para conocer el carro a distancia. Coordinamos según tu ciudad.',
      cta: { label: '📅 Agendar visita', action: 'appointment' },
    },
    'permuta|cambio|parte de pago|recibir mi': {
      text: 'Aceptamos tu carro actual como parte de pago. Hacemos avalúo gratuito y completas la diferencia con efectivo o financiación.',
      cta: { label: '🔄 Permutar mi carro', action: 'sell' },
    },
    'peritaje|inspeccion|inspección|revision|revisión|estado mecanico': {
      text: 'Cada aliado realiza peritaje técnico antes de publicar. Si quieres ver el informe específico de un vehículo, el asesor te lo envía cuando lo solicitas.',
      cta: { label: '📋 Ver catálogo', action: '/catalog.html' },
    },
    'donde estan|donde están|ubicacion|ubicación|showroom|direccion|sede': {
      text: 'Somos un marketplace digital, no concesionario físico. Conectamos compradores con aliados verificados en toda Colombia. Te decimos qué aliado tiene cada carro y coordinas con él.',
    },
    'whatsapp|chat directo|hablar con alguien|asesor humano|persona real': {
      text: '¿Prefieres hablar con un asesor humano? Te conecto por WhatsApp.',
      cta: { label: '💬 Abrir WhatsApp', action: 'https://wa.me/573235016747' },
    },
    'horario|atencion|cuando atienden|abren': {
      text: 'Atendemos: Lun–Vie 8am–6pm y Sáb 9am–2pm. WhatsApp 7 días a la semana — respuesta en menos de 2 horas en horario hábil.',
    },
    'precio|cuanto cuesta|mas barato|mas economico|economico': {
      text: 'Tenemos vehículos desde unos $40 millones (usados) hasta autos premium superiores a $300 millones. ¿Tienes un presupuesto en mente?',
      cta: { label: '🔍 Ver catálogo', action: '/catalog.html' },
    },
  };

  const SUGGEST = [
    '¿Tienen el {modelo}?',
    '¿Aceptan permuta?',
    '¿Cuánto sería la cuota?',
    'Quiero vender mi auto',
    'Agendar una visita',
  ];

  const RANDOM_MODELS = ['Mazda 3', 'Toyota Prado', 'Corolla Cross', 'Renault Duster'];

  function findResponse(text) {
    const t = text.toLowerCase().trim();
    for (const [pattern, resp] of Object.entries(KB)) {
      const re = new RegExp('\\b(' + pattern + ')\\b', 'i');
      if (re.test(t)) return resp;
    }
    return null;
  }

  // ---------- Altor concierge ----------
  function Altor() {
    const [open, setOpen] = useState(false);
    const [messages, setMessages] = useState([]);
    const [typing, setTyping] = useState(false);
    const [input, setInput] = useState('');
    const [hasNew, setHasNew] = useState(true);
    const [espavila, setEspavila] = useState(false);    // shake/wave animation
    const [thought, setThought] = useState(null);       // floating message bubble
    const scrollRef = useRef(null);

    // ─── Vida: blinks frecuentes + susurros con burbujas de pensamiento
    // Mientras el chat está cerrado el bot parpadea cada 3–7s y a veces
    // muestra un thought bubble. NADA de saltos bruscos.
    useEffect(() => {
      if (open) { setThought(null); return; }
      const THOUGHTS = [
        '👋 ¡Hola!',
        '🚗 ¿Te ayudo?',
        '💬 Pregúntame',
        '✨ ¿Tu próximo carro?',
        '🤔 ¿Qué buscas hoy?',
      ];
      let thoughtTimer;
      const tickThought = () => {
        if (Math.random() < 0.5) {
          const msg = THOUGHTS[Math.floor(Math.random() * THOUGHTS.length)];
          setThought(msg);
          setTimeout(() => setThought(null), 4500);
        }
        thoughtTimer = setTimeout(tickThought, 18000 + Math.random() * 14000);
      };
      thoughtTimer = setTimeout(tickThought, 10000);
      return () => clearTimeout(thoughtTimer);
    }, [open]);

    // First open → greeting
    useEffect(() => {
      if (open && messages.length === 0) {
        setTyping(true);
        setTimeout(() => {
          setTyping(false);
          setMessages([
            { from: 'bot', text: '👋 Hola, soy <strong>ALTOR</strong>, el asistente de Altorra.' },
            { from: 'bot', text: 'Te ayudo a encontrar tu próximo carro, vender el actual, simular crédito o agendar una visita. ¿Por dónde empezamos?', suggest: true },
          ]);
        }, 600);
        setHasNew(false);
      }
      if (open) setHasNew(false);
    }, [open, messages.length]);

    // Auto-scroll
    useEffect(() => {
      if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }, [messages, typing]);

    const sendMessage = (text) => {
      if (!text.trim()) return;
      setMessages(m => [...m, { from: 'user', text }]);
      setInput('');
      setTyping(true);
      setTimeout(() => {
        const resp = findResponse(text);
        setTyping(false);
        if (resp) {
          setMessages(m => [...m, { from: 'bot', text: resp.text, cta: resp.cta }]);
        } else {
          setMessages(m => [...m, {
            from: 'bot',
            text: 'Buena pregunta. Te conecto con un asesor humano por WhatsApp para que te responda en detalle.',
            cta: { label: '💬 Hablar con un asesor', action: 'https://wa.me/573235016747?text=' + encodeURIComponent('Hola, vengo del chat de ALTOR: ' + text) },
          }]);
        }
      }, 700 + Math.random() * 600);
    };

    const handleCTA = (cta) => {
      if (!cta) return;
      if (cta.action?.startsWith('http')) {
        window.open(cta.action, '_blank', 'noopener');
      } else if (cta.action?.startsWith('/')) {
        window.location.href = cta.action.slice(1);
      } else if (window.AltorraModals && ['sell','finance','auth','appointment','ask'].includes(cta.action)) {
        window.AltorraModals.open(cta.action);
        setOpen(false);
      }
    };

    const renderSuggestions = (msg) => msg.suggest ? (
      <div className="alt-bot-suggest">
        {SUGGEST.map((s, i) => {
          const txt = s.replace('{modelo}', RANDOM_MODELS[i % RANDOM_MODELS.length]);
          return <button key={i} onClick={() => sendMessage(txt)}>{txt}</button>;
        })}
      </div>
    ) : null;

    return (
      <>
        {/* Floating mascot — tire ring + ALTOR face */}
        <button
          type="button"
          className={`alt-bot-fab ${open ? 'is-open' : ''}`}
          onClick={() => setOpen(o => !o)}
          aria-label="Chat con ALTOR"
        >
          {open ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 6 18 18M6 18 18 6"/></svg>
          ) : (
            <span className="alt-bot-mascot" aria-hidden="true">
              <img src="altor-mascot.png" alt="" className="alt-bot-mascot-img"/>
              <span className="alt-bot-mascot-glow" aria-hidden="true"/>
            </span>
          )}
          {!open && <span className="alt-bot-fab-label">ALTOR</span>}
          {!open && hasNew && <span className="alt-bot-fab-pulse" aria-hidden="true"/>}
        </button>

        {/* Floating thought bubble — appears at random intervals */}
        {!open && thought && (
          <div className="alt-bot-thought" role="status" aria-live="polite" onClick={() => setOpen(true)}>
            {thought}
            <button type="button" className="alt-bot-thought-close" onClick={(e) => { e.stopPropagation(); setThought(null); }} aria-label="Cerrar">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6"><path d="M6 6 18 18M6 18 18 6"/></svg>
            </button>
          </div>
        )}

        {/* Chat panel */}
        {open && (
          <div className="alt-bot-panel" role="dialog" aria-label="Chat con ALTOR">
            <header className="alt-bot-head">
              <div className="alt-bot-avatar">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                  <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
                </svg>
              </div>
              <div className="alt-bot-head-info">
                <strong>ALTOR</strong>
                <span><span className="alt-bot-dot"/> Asistente · respuesta inmediata</span>
              </div>
              <button type="button" className="alt-bot-min" onClick={() => setOpen(false)} aria-label="Minimizar">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M19 13H5"/></svg>
              </button>
            </header>

            <div className="alt-bot-body" ref={scrollRef}>
              {messages.map((m, i) => (
                <div key={i} className={`alt-bot-msg alt-bot-msg--${m.from}`}>
                  <span className="alt-bot-msg-text" dangerouslySetInnerHTML={{ __html: m.text }}/>
                  {m.cta && (
                    <button type="button" className="alt-bot-msg-cta" onClick={() => handleCTA(m.cta)}>
                      {m.cta.label}
                    </button>
                  )}
                  {renderSuggestions(m)}
                </div>
              ))}
              {typing && (
                <div className="alt-bot-msg alt-bot-msg--bot">
                  <span className="alt-bot-typing"><span/><span/><span/></span>
                </div>
              )}
            </div>

            <form className="alt-bot-input" onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribe tu pregunta…"
                autoFocus
              />
              <button type="submit" aria-label="Enviar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </button>
            </form>

            <span className="alt-bot-fine">
              ALTOR es un asistente automatizado. Para casos específicos te conecta con un asesor humano.
            </span>
          </div>
        )}
      </>
    );
  }

  // ---------- Auto-mount ----------
  function mount() {
    let host = document.getElementById('altor-root');
    if (!host) {
      host = document.createElement('div');
      host.id = 'altor-root';
      document.body.appendChild(host);
    }
    ReactDOM.createRoot(host).render(<Altor/>);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();

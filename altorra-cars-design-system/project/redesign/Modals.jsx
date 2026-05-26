// ============================================================
// ALTORRA · Cinematic MODALS · v2 (mirror del repo real)
// Auth · Vende tu Auto (wizard 3 pasos) · Financiación (form completo)
// ============================================================
(function () {
  const { useState, useEffect, useRef, useCallback, useMemo } = React;

  // ---------- Shell ----------
  function Shell({ open, onClose, label, size = 'md', children }) {
    useEffect(() => {
      if (!open) return;
      const onKey = (e) => { if (e.key === 'Escape') onClose(); };
      window.addEventListener('keydown', onKey);
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        window.removeEventListener('keydown', onKey);
        document.body.style.overflow = prev;
      };
    }, [open, onClose]);
    if (!open) return null;
    return (
      <div className="mdx-back" role="dialog" aria-modal="true" aria-label={label} onClick={onClose}>
        <div className={`mdx-panel mdx-panel--${size}`} onClick={(e) => e.stopPropagation()}>
          <button type="button" className="mdx-close" onClick={onClose} aria-label="Cerrar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 6 18 18M6 18 18 6"/></svg>
          </button>
          {children}
        </div>
      </div>
    );
  }

  // ---------- Country prefixes (same as real repo) ----------
  const COUNTRIES = [
    { v: '+57', l: '🇨🇴 +57' },
    { v: '+58', l: '🇻🇪 +58' },
    { v: '+593', l: '🇪🇨 +593' },
    { v: '+507', l: '🇵🇦 +507' },
    { v: '+52', l: '🇲🇽 +52' },
    { v: '+1',  l: '🇺🇸 +1' },
    { v: '+51', l: '🇵🇪 +51' },
    { v: '+56', l: '🇨🇱 +56' },
    { v: '+54', l: '🇦🇷 +54' },
    { v: '+34', l: '🇪🇸 +34' },
  ];

  // ---------- Auth ----------
    function AuthModal({ open, onClose }) {
    const [mode, setMode] = useState('login');
    const [form, setForm] = useState({
      name: '', email: '', tel: '', cedula: '',
      pwd: '', pwdConfirm: '',
      remember: true, terms: false,
      pais: '+57', showPwd: false, showConfirm: false,
    });
    const [done, setDone] = useState(false);
    const [errors, setErrors] = useState({});
    useEffect(() => { if (open) { setDone(false); setMode('login'); setErrors({}); } }, [open]);

    // Password strength score: 0-4
    const pwdStrength = (p) => {
      if (!p) return { score: 0, label: '', class: '' };
      let s = 0;
      if (p.length >= 8) s++;
      if (/[A-Z]/.test(p)) s++;
      if (/[0-9]/.test(p)) s++;
      if (/[^A-Za-z0-9]/.test(p)) s++;
      const labels = ['Muy débil', 'Débil', 'Regular', 'Buena', 'Fuerte'];
      const classes = ['mdx-pwd--vweak', 'mdx-pwd--weak', 'mdx-pwd--mid', 'mdx-pwd--good', 'mdx-pwd--strong'];
      return { score: s, label: labels[s], class: classes[s] };
    };
    const strength = pwdStrength(form.pwd);

    const submit = (e) => {
      e.preventDefault();
      const err = {};
      if (mode === 'register') {
        if (!form.name.trim()) err.name = 'Nombre requerido';
        if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Email válido';
        if (!form.tel.trim()) err.tel = 'Teléfono requerido';
        if (!/^\d{5,12}$/.test(form.cedula)) err.cedula = 'Cédula (solo números, 5–12 dígitos)';
        if (form.pwd.length < 6) err.pwd = 'Mínimo 6 caracteres';
        if (form.pwd !== form.pwdConfirm) err.pwdConfirm = 'No coincide';
        if (!form.terms) err.terms = 'Acepta términos para continuar';
      } else if (mode === 'login') {
        if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Email válido';
        if (!form.pwd) err.pwd = 'Contraseña requerida';
      } else if (mode === 'forgot') {
        if (!/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Email válido';
      }
      setErrors(err);
      if (Object.keys(err).length > 0) return;
      try {
        localStorage.setItem('altorra_auth_hint', 'authenticated');
        localStorage.setItem('altorra_auth_user_snap', JSON.stringify({
          name: form.name || form.email.split('@')[0],
          email: form.email, cedula: form.cedula, tel: form.pais + form.tel,
        }));
      } catch {}
      setDone(true);
    };

    return (
      <Shell open={open} onClose={onClose} label="Acceso" size="sm">
        {done ? (
          <div className="mdx-success">
            <span className="mdx-success-mark">✓</span>
            <h3>{mode === 'register' ? '¡Cuenta creada!' : mode === 'forgot' ? 'Enlace enviado' : '¡Bienvenido!'}</h3>
            <p>{mode === 'forgot' ? 'Revisa tu email para restablecer la contraseña.' : 'Tu sesión está activa. Tus favoritos y comparador se guardan en tu cuenta.'}</p>
            <button className="mdx-cta-primary" onClick={onClose}>Continuar</button>
          </div>
        ) : (
          <>
            {/* Tabs Ingresar / Registrarse — mirror del repo */}
            {mode !== 'forgot' && (
              <div className="auth-tabs" role="tablist">
                <button type="button" className={`auth-tab ${mode === 'login' ? 'is-on' : ''}`} onClick={() => { setMode('login'); setErrors({}); }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3"/></svg>
                  Ingresar
                </button>
                <button type="button" className={`auth-tab ${mode === 'register' ? 'is-on' : ''}`} onClick={() => { setMode('register'); setErrors({}); }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M19 8v6M22 11h-6"/><circle cx="8.5" cy="7" r="4"/></svg>
                  Registrarse
                </button>
              </div>
            )}

            {mode === 'forgot' && (
              <button type="button" className="auth-back-btn" onClick={() => { setMode('login'); setErrors({}); }}>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
                Volver
              </button>
            )}

            <span className="mdx-eyebrow" style={{ marginTop: 6 }}>
              {mode === 'login' && 'Tu próximo vehículo te espera'}
              {mode === 'register' && 'Crea tu cuenta gratis'}
              {mode === 'forgot' && 'Recuperar contraseña'}
            </span>
            <h2 className="mdx-h">
              {mode === 'login' && <>Bienvenido <em>de vuelta</em>.</>}
              {mode === 'register' && <>Crea tu <em>cuenta</em>.</>}
              {mode === 'forgot' && <>Recuperemos tu <em>acceso</em>.</>}
            </h2>

            {mode === 'login' && (
              <form onSubmit={submit} className="mdx-form">
                <label className="mdx-field">
                  <span>Correo electrónico</span>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tu@correo.com" autoComplete="email"/>
                  {errors.email && <small className="mdx-error">{errors.email}</small>}
                </label>
                <label className="mdx-field">
                  <span>Contraseña</span>
                  <div className="mdx-input-pwd">
                    <input type={form.showPwd ? 'text' : 'password'} required value={form.pwd} onChange={(e) => setForm({ ...form, pwd: e.target.value })} placeholder="Tu contraseña" autoComplete="current-password"/>
                    <button type="button" className="mdx-pwd-toggle" onClick={() => setForm(f => ({ ...f, showPwd: !f.showPwd }))} aria-label="Mostrar contraseña">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">{form.showPwd ? <><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></> : <><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></>}</svg>
                    </button>
                  </div>
                  {errors.pwd && <small className="mdx-error">{errors.pwd}</small>}
                </label>
                <div className="mdx-row-between">
                  <label className="mdx-check">
                    <input type="checkbox" checked={form.remember} onChange={(e) => setForm({ ...form, remember: e.target.checked })}/>
                    <span>Recordarme</span>
                  </label>
                  <button type="button" className="mdx-link" onClick={() => { setMode('forgot'); setErrors({}); }}>¿Olvidaste tu clave?</button>
                </div>
                <button type="submit" className="mdx-cta-primary">Ingresar</button>
                <div className="mdx-divider"><span>o</span></div>
                <button type="button" className="mdx-cta-google">
                  <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Continuar con Google
                </button>
                <span className="mdx-foot">¿No tienes cuenta? <button type="button" onClick={() => { setMode('register'); setErrors({}); }}>Regístrate gratis</button></span>
              </form>
            )}

            {mode === 'register' && (
              <form onSubmit={submit} className="mdx-form">
                <label className="mdx-field">
                  <span>Nombre completo</span>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ej: Carlos Pérez" autoComplete="name"/>
                  {errors.name && <small className="mdx-error">{errors.name}</small>}
                </label>
                <label className="mdx-field">
                  <span>Correo electrónico</span>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tu@correo.com" autoComplete="email"/>
                  {errors.email && <small className="mdx-error">{errors.email}</small>}
                </label>
                <div className="mdx-field-row mdx-field-row--tel">
                  <label className="mdx-field mdx-field--tel-prefix">
                    <span>País</span>
                    <select value={form.pais} onChange={(e) => setForm({ ...form, pais: e.target.value })}>
                      {COUNTRIES.map(c => <option key={c.v} value={c.v}>{c.l}</option>)}
                    </select>
                  </label>
                  <label className="mdx-field">
                    <span>Teléfono *</span>
                    <input type="tel" required value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })} placeholder="3001234567" autoComplete="tel"/>
                    {errors.tel && <small className="mdx-error">{errors.tel}</small>}
                  </label>
                </div>
                <label className="mdx-field">
                  <span>Cédula *</span>
                  <input type="tel" required inputMode="numeric" pattern="[0-9]{5,12}" value={form.cedula} onChange={(e) => setForm({ ...form, cedula: e.target.value.replace(/\D/g, '') })} placeholder="Solo números (sin puntos)"/>
                  <small className="mdx-hint">Necesaria para procesos de financiación, peritaje y consignación.</small>
                  {errors.cedula && <small className="mdx-error">{errors.cedula}</small>}
                </label>
                <label className="mdx-field">
                  <span>Contraseña *</span>
                  <div className="mdx-input-pwd">
                    <input type={form.showPwd ? 'text' : 'password'} required minLength={6} value={form.pwd} onChange={(e) => setForm({ ...form, pwd: e.target.value })} placeholder="Mínimo 6 caracteres" autoComplete="new-password"/>
                    <button type="button" className="mdx-pwd-toggle" onClick={() => setForm(f => ({ ...f, showPwd: !f.showPwd }))} aria-label="Mostrar contraseña">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </div>
                  {form.pwd && (
                    <>
                      <div className={`mdx-pwd-bar ${strength.class}`}><span style={{ width: (strength.score * 25) + '%' }}/></div>
                      <small className="mdx-pwd-label">{strength.label}</small>
                    </>
                  )}
                  {errors.pwd && <small className="mdx-error">{errors.pwd}</small>}
                </label>
                <label className="mdx-field">
                  <span>Confirmar contraseña *</span>
                  <div className="mdx-input-pwd">
                    <input type={form.showConfirm ? 'text' : 'password'} required value={form.pwdConfirm} onChange={(e) => setForm({ ...form, pwdConfirm: e.target.value })} placeholder="Repite tu contraseña"/>
                    <button type="button" className="mdx-pwd-toggle" onClick={() => setForm(f => ({ ...f, showConfirm: !f.showConfirm }))} aria-label="Mostrar contraseña">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                    </button>
                  </div>
                  {errors.pwdConfirm && <small className="mdx-error">{errors.pwdConfirm}</small>}
                </label>
                <label className="mdx-check mdx-check--terms">
                  <input type="checkbox" required checked={form.terms} onChange={(e) => setForm({ ...form, terms: e.target.checked })}/>
                  <span>Acepto los <a href="terms.html" target="_blank" rel="noopener">términos y condiciones</a> y la <a href="privacy.html" target="_blank" rel="noopener">política de privacidad</a></span>
                </label>
                {errors.terms && <small className="mdx-error">{errors.terms}</small>}
                <button type="submit" className="mdx-cta-primary">Crear mi cuenta</button>
                <div className="mdx-divider"><span>o</span></div>
                <button type="button" className="mdx-cta-google">
                  <svg width="14" height="14" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                  Registrarse con Google
                </button>
                <span className="mdx-foot">¿Ya tienes cuenta? <button type="button" onClick={() => { setMode('login'); setErrors({}); }}>Ingresa aquí</button></span>
              </form>
            )}

            {mode === 'forgot' && (
              <form onSubmit={submit} className="mdx-form">
                <p className="mdx-sub">Te enviaremos un enlace para crear una contraseña nueva.</p>
                <label className="mdx-field">
                  <span>Correo electrónico</span>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tu@correo.com"/>
                  {errors.email && <small className="mdx-error">{errors.email}</small>}
                </label>
                <button type="submit" className="mdx-cta-primary">Enviar enlace</button>
              </form>
            )}
          </>
        )}
      </Shell>
    );
  }

  // ============================================================
  // SELL · Wizard 3 pasos (mirror del repo real, estilo cinematic)
  // Paso 1: Contacto · Paso 2: Vehículo · Paso 3: Oferta
  // ============================================================
  function SellModal({ open, onClose }) {
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
      nombre: '', pais: '+57', telefono: '', email: '',
      marca: '', modelo: '', year: '', kilometraje: '',
      precio: '', comentarios: '',
    });
    const [errors, setErrors] = useState({});
    const [done, setDone] = useState(false);

    useEffect(() => {
      if (open) {
        setStep(1); setDone(false); setErrors({});
        setForm({ nombre: '', pais: '+57', telefono: '', email: '', marca: '', modelo: '', year: '', kilometraje: '', precio: '', comentarios: '' });
      }
    }, [open]);

    const validateStep = (s) => {
      const e = {};
      if (s === 1) {
        if (!form.nombre.trim()) e.nombre = 'Tu nombre completo';
        if (!form.telefono.trim()) e.telefono = 'Teléfono requerido';
        if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) e.email = 'Email válido';
      } else if (s === 2) {
        if (!form.marca.trim()) e.marca = 'Marca requerida';
        if (!form.modelo.trim()) e.modelo = 'Modelo requerido';
        if (!form.year || +form.year < 1990 || +form.year > 2026) e.year = 'Año entre 1990 y 2026';
        if (!form.kilometraje) e.kilometraje = 'Kilometraje requerido';
      } else if (s === 3) {
        if (!form.precio.trim()) e.precio = 'Precio esperado';
      }
      setErrors(e);
      return Object.keys(e).length === 0;
    };

    const next = () => { if (validateStep(step)) setStep(s => s + 1); };
    const back = () => setStep(s => s - 1);
    const submit = (ev) => { ev.preventDefault(); if (validateStep(3)) setDone(true); };

    const progress = (step / 3) * 100;
    const subtitle = step === 1 ? 'Paso 1 de 3 — Datos de contacto'
                   : step === 2 ? 'Paso 2 de 3 — Tu vehículo'
                   : 'Paso 3 de 3 — Precio y comentarios';

    return (
      <Shell open={open} onClose={onClose} label="Vende tu auto" size="lg">
        {done ? (
          <div className="mdx-success">
            <span className="mdx-success-mark">✓</span>
            <h3>¡Listo, {form.nombre.split(' ')[0]}!</h3>
            <p>Recibimos tu solicitud de avalúo. Un asesor te contacta en menos de 24h con la mejor oferta del mercado.</p>
            <div className="mdx-cta-row">
              <a className="mdx-cta-primary" href={`https://wa.me/573235016747?text=${encodeURIComponent(`Hola, acabo de enviar la solicitud para vender mi ${form.marca} ${form.modelo} ${form.year}`)}`} target="_blank" rel="noopener">
                Continuar por WhatsApp
              </a>
              <button className="mdx-cta-ghost" onClick={onClose}>Cerrar</button>
            </div>
          </div>
        ) : (
          <>
            <span className="mdx-eyebrow">Vende con Altorra</span>
            <h2 className="mdx-h">Pide tu <em>avalúo gratis</em>.</h2>
            <p className="mdx-sub">{subtitle}</p>

            {/* Progress bar + steps */}
            <div className="wiz-progress">
              <div className="wiz-track"><span style={{ width: progress + '%' }}/></div>
              <div className="wiz-steps">
                {[1,2,3].map(s => (
                  <div key={s} className={`wiz-step ${step === s ? 'is-on' : ''} ${step > s ? 'is-done' : ''}`}>
                    <span className="wiz-step-dot">{step > s ? '✓' : s}</span>
                    <span className="wiz-step-label">{s === 1 ? 'Contacto' : s === 2 ? 'Vehículo' : 'Oferta'}</span>
                  </div>
                ))}
              </div>
            </div>

            <form onSubmit={submit} className="mdx-form" style={{ marginTop: 20 }}>
              {step === 1 && (
                <>
                  <label className="mdx-field">
                    <span>Nombre completo *</span>
                    <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Ej. Juan Pérez"/>
                    {errors.nombre && <small className="mdx-error">{errors.nombre}</small>}
                  </label>
                  <div className="mdx-field-row mdx-field-row--tel">
                    <label className="mdx-field mdx-field--tel-prefix">
                      <span>País *</span>
                      <select value={form.pais} onChange={(e) => setForm({ ...form, pais: e.target.value })}>
                        {COUNTRIES.map(c => <option key={c.v} value={c.v}>{c.l}</option>)}
                      </select>
                    </label>
                    <label className="mdx-field">
                      <span>Teléfono *</span>
                      <input type="tel" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="3001234567"/>
                      {errors.telefono && <small className="mdx-error">{errors.telefono}</small>}
                    </label>
                  </div>
                  <label className="mdx-field">
                    <span>Email *</span>
                    <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tu@email.com"/>
                    {errors.email && <small className="mdx-error">{errors.email}</small>}
                  </label>
                  <div className="wiz-nav">
                    <span className="wiz-trust">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                      Tus datos están protegidos
                    </span>
                    <button type="button" className="mdx-cta-primary" onClick={next}>Siguiente <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg></button>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="mdx-row-2">
                    <label className="mdx-field">
                      <span>Marca *</span>
                      <input value={form.marca} onChange={(e) => setForm({ ...form, marca: e.target.value })} placeholder="Toyota, Mazda…"/>
                      {errors.marca && <small className="mdx-error">{errors.marca}</small>}
                    </label>
                    <label className="mdx-field">
                      <span>Modelo *</span>
                      <input value={form.modelo} onChange={(e) => setForm({ ...form, modelo: e.target.value })} placeholder="Corolla, CX-5…"/>
                      {errors.modelo && <small className="mdx-error">{errors.modelo}</small>}
                    </label>
                  </div>
                  <div className="mdx-row-2">
                    <label className="mdx-field">
                      <span>Año *</span>
                      <input type="number" min="1990" max="2026" value={form.year} onChange={(e) => setForm({ ...form, year: e.target.value })} placeholder="2020"/>
                      {errors.year && <small className="mdx-error">{errors.year}</small>}
                    </label>
                    <label className="mdx-field">
                      <span>Kilometraje *</span>
                      <input type="number" value={form.kilometraje} onChange={(e) => setForm({ ...form, kilometraje: e.target.value })} placeholder="45000"/>
                      {errors.kilometraje && <small className="mdx-error">{errors.kilometraje}</small>}
                    </label>
                  </div>
                  <div className="wiz-nav">
                    <button type="button" className="mdx-cta-ghost" onClick={back}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
                      Atrás
                    </button>
                    <button type="button" className="mdx-cta-primary" onClick={next}>Siguiente <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg></button>
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <label className="mdx-field">
                    <span>Precio esperado *</span>
                    <input value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} placeholder="$ 50.000.000"/>
                    {errors.precio && <small className="mdx-error">{errors.precio}</small>}
                  </label>
                  <label className="mdx-field">
                    <span>Comentarios adicionales</span>
                    <textarea rows={3} value={form.comentarios} onChange={(e) => setForm({ ...form, comentarios: e.target.value })} placeholder="Estado, extras, historial de mantenimiento…"/>
                  </label>
                  <div className="wiz-trust-box">
                    <span>⚡ Respuesta &lt; 24h</span>
                    <span>🤝 Sin compromiso</span>
                    <span>💰 Precio del mercado</span>
                  </div>
                  <div className="wiz-nav">
                    <button type="button" className="mdx-cta-ghost" onClick={back}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
                      Atrás
                    </button>
                    <button type="submit" className="mdx-cta-primary">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                      Enviar solicitud
                    </button>
                  </div>
                </>
              )}
            </form>
          </>
        )}
      </Shell>
    );
  }

  // ============================================================
  // FINANCE · Form completo (mirror del repo real)
  // ============================================================
  function FinanceModal({ open, onClose, vehiculo }) {
    const [form, setForm] = useState({
      nombre: '', pais: '+57', telefono: '', email: '',
      vehiculo: '', precio: '', cuota: '', plazo: '60 meses',
      ingresos: '', situacion: 'Empleado', ciudad: 'Cartagena', comentarios: '',
    });
    const [errors, setErrors] = useState({});
    const [done, setDone] = useState(false);

    useEffect(() => {
      if (open) {
        setDone(false); setErrors({});
        setForm(f => ({ ...f, vehiculo: vehiculo || '' }));
      }
    }, [open, vehiculo]);

    const submit = (e) => {
      e.preventDefault();
      const err = {};
      if (!form.nombre.trim()) err.nombre = 'Requerido';
      if (!form.telefono.trim()) err.telefono = 'Requerido';
      if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) err.email = 'Email válido';
      if (!form.vehiculo.trim()) err.vehiculo = 'Indica el vehículo de interés';
      if (!form.precio.trim()) err.precio = 'Requerido';
      if (!form.cuota.trim()) err.cuota = 'Requerido';
      if (!form.ingresos.trim()) err.ingresos = 'Requerido';
      setErrors(err);
      if (Object.keys(err).length === 0) setDone(true);
    };

    return (
      <Shell open={open} onClose={onClose} label="Financiación" size="lg">
        {done ? (
          <div className="mdx-success">
            <span className="mdx-success-mark">✓</span>
            <h3>¡Solicitud recibida!</h3>
            <p>Un asesor revisa tu solicitud y te contacta en menos de 4 horas hábiles con opciones de los bancos aliados.</p>
            <button className="mdx-cta-primary" onClick={onClose}>Cerrar</button>
          </div>
        ) : (
          <>
            <span className="mdx-eyebrow">Solicitud de financiación</span>
            <h2 className="mdx-h">Te ayudamos a <em>conseguir el mejor crédito</em>.</h2>
            <p className="mdx-sub">Aprobamos en 24 horas. Trabajamos con 5 bancos aliados — recibes la mejor opción para tu perfil.</p>

            <form onSubmit={submit} className="mdx-form" style={{ marginTop: 18 }}>
              <label className="mdx-field">
                <span>Nombre completo *</span>
                <input value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })} placeholder="Juan Pérez"/>
                {errors.nombre && <small className="mdx-error">{errors.nombre}</small>}
              </label>
              <div className="mdx-field-row mdx-field-row--tel">
                <label className="mdx-field mdx-field--tel-prefix">
                  <span>País *</span>
                  <select value={form.pais} onChange={(e) => setForm({ ...form, pais: e.target.value })}>
                    {COUNTRIES.map(c => <option key={c.v} value={c.v}>{c.l}</option>)}
                  </select>
                </label>
                <label className="mdx-field">
                  <span>Teléfono *</span>
                  <input type="tel" value={form.telefono} onChange={(e) => setForm({ ...form, telefono: e.target.value })} placeholder="3001234567"/>
                  {errors.telefono && <small className="mdx-error">{errors.telefono}</small>}
                </label>
                <label className="mdx-field">
                  <span>Email *</span>
                  <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tu@email.com"/>
                  {errors.email && <small className="mdx-error">{errors.email}</small>}
                </label>
              </div>

              <label className="mdx-field">
                <span>Vehículo de interés *</span>
                <input value={form.vehiculo} onChange={(e) => setForm({ ...form, vehiculo: e.target.value })} placeholder="Toyota Corolla 2024…"/>
                {errors.vehiculo && <small className="mdx-error">{errors.vehiculo}</small>}
              </label>

              <div className="mdx-row-2">
                <label className="mdx-field">
                  <span>Precio del vehículo *</span>
                  <input value={form.precio} onChange={(e) => setForm({ ...form, precio: e.target.value })} placeholder="$ 80.000.000"/>
                  {errors.precio && <small className="mdx-error">{errors.precio}</small>}
                </label>
                <label className="mdx-field">
                  <span>Cuota inicial *</span>
                  <input value={form.cuota} onChange={(e) => setForm({ ...form, cuota: e.target.value })} placeholder="$ 20.000.000"/>
                  {errors.cuota && <small className="mdx-error">{errors.cuota}</small>}
                </label>
              </div>

              <div className="mdx-row-2">
                <label className="mdx-field">
                  <span>Plazo deseado *</span>
                  <select value={form.plazo} onChange={(e) => setForm({ ...form, plazo: e.target.value })}>
                    {['12 meses','24 meses','36 meses','48 meses','60 meses','72 meses','84 meses'].map(p => <option key={p} value={p}>{p}</option>)}
                  </select>
                </label>
                <label className="mdx-field">
                  <span>Ingresos mensuales *</span>
                  <input value={form.ingresos} onChange={(e) => setForm({ ...form, ingresos: e.target.value })} placeholder="$ 3.000.000"/>
                  {errors.ingresos && <small className="mdx-error">{errors.ingresos}</small>}
                </label>
              </div>

              <div className="mdx-row-2">
                <label className="mdx-field">
                  <span>Situación laboral *</span>
                  <select value={form.situacion} onChange={(e) => setForm({ ...form, situacion: e.target.value })}>
                    <option value="Empleado">Empleado</option>
                    <option value="Independiente">Independiente / Freelance</option>
                    <option value="Empresario">Empresario / Propietario</option>
                    <option value="Pensionado">Pensionado</option>
                  </select>
                </label>
                <label className="mdx-field">
                  <span>Ciudad</span>
                  <input value={form.ciudad} onChange={(e) => setForm({ ...form, ciudad: e.target.value })} placeholder="Cartagena"/>
                </label>
              </div>

              <label className="mdx-field">
                <span>Comentarios adicionales</span>
                <textarea rows={2} value={form.comentarios} onChange={(e) => setForm({ ...form, comentarios: e.target.value })}/>
              </label>

              <button type="submit" className="mdx-cta-primary">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
                Enviar solicitud
              </button>
              <span className="mdx-fine">No consultamos centrales de riesgo sin tu autorización. Solo conectamos tu solicitud con un asesor del banco.</span>
            </form>
          </>
        )}
      </Shell>
    );
  }

  // ============================================================
  // APPOINTMENT · Agendar visita (mirror citas.css del repo)
  // ============================================================
  function AppointmentModal({ open, onClose, vehiculo }) {
    const [form, setForm] = useState({ nombre: '', email: '', tel: '', fecha: '', hora: '10:00', tipo: 'presencial', comentarios: '' });
    const [done, setDone] = useState(false);
    const minDate = useMemo(() => new Date(Date.now() + 24*60*60*1000).toISOString().split('T')[0], []);
    useEffect(() => { if (open) setDone(false); }, [open]);

    const submit = (e) => { e.preventDefault(); if (form.nombre && form.email && form.tel && form.fecha) setDone(true); };

    return (
      <Shell open={open} onClose={onClose} label="Agendar visita" size="md">
        {done ? (
          <div className="mdx-success">
            <span className="mdx-success-mark">✓</span>
            <h3>¡Visita agendada!</h3>
            <p>El {form.fecha} a las {form.hora} {form.tipo === 'presencial' ? 'te esperamos en el showroom del aliado' : 'te llamamos para hacer videollamada'}. Confirmamos por WhatsApp.</p>
            <button className="mdx-cta-primary" onClick={onClose}>Cerrar</button>
          </div>
        ) : (
          <>
            <span className="mdx-eyebrow">Agendar visita</span>
            <h2 className="mdx-h">Conoce el carro <em>antes de decidir</em>.</h2>
            {vehiculo && <p className="mdx-sub">Vehículo: <strong>{vehiculo}</strong></p>}
            <form onSubmit={submit} className="mdx-form" style={{ marginTop: 18 }}>
              <label className="mdx-field">
                <span>Nombre *</span>
                <input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}/>
              </label>
              <div className="mdx-row-2">
                <label className="mdx-field"><span>Email *</span><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}/></label>
                <label className="mdx-field"><span>Teléfono *</span><input type="tel" required value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })}/></label>
              </div>
              <div className="mdx-row-2">
                <label className="mdx-field">
                  <span>Fecha *</span>
                  <input type="date" required min={minDate} value={form.fecha} onChange={(e) => setForm({ ...form, fecha: e.target.value })}/>
                </label>
                <label className="mdx-field">
                  <span>Hora</span>
                  <select value={form.hora} onChange={(e) => setForm({ ...form, hora: e.target.value })}>
                    {['09:00','10:00','11:00','14:00','15:00','16:00','17:00'].map(h => <option key={h} value={h}>{h}</option>)}
                  </select>
                </label>
              </div>
              <label className="mdx-field">
                <span>Modalidad</span>
                <div className="mdx-pills">
                  <button type="button" className={`mdx-pill ${form.tipo === 'presencial' ? 'is-on' : ''}`} onClick={() => setForm({ ...form, tipo: 'presencial' })}>Presencial</button>
                  <button type="button" className={`mdx-pill ${form.tipo === 'video' ? 'is-on' : ''}`} onClick={() => setForm({ ...form, tipo: 'video' })}>Videollamada</button>
                </div>
              </label>
              <label className="mdx-field">
                <span>Comentarios</span>
                <textarea rows={2} value={form.comentarios} onChange={(e) => setForm({ ...form, comentarios: e.target.value })} placeholder="¿Algo específico que quieras revisar?"/>
              </label>
              <button type="submit" className="mdx-cta-primary">Agendar visita</button>
            </form>
          </>
        )}
      </Shell>
    );
  }

  // ============================================================
  // ASK · Pregunta sobre un vehículo
  // ============================================================
  function AskModal({ open, onClose, vehiculo }) {
    const [form, setForm] = useState({ nombre: '', email: '', pregunta: '' });
    const [done, setDone] = useState(false);
    useEffect(() => { if (open) setDone(false); }, [open]);
    const submit = (e) => { e.preventDefault(); if (form.nombre && form.email && form.pregunta) setDone(true); };

    return (
      <Shell open={open} onClose={onClose} label="Hacer una pregunta" size="sm">
        {done ? (
          <div className="mdx-success">
            <span className="mdx-success-mark">✓</span>
            <h3>¡Pregunta enviada!</h3>
            <p>El asesor del aliado te responde a {form.email} en menos de 2 horas.</p>
            <button className="mdx-cta-primary" onClick={onClose}>Cerrar</button>
          </div>
        ) : (
          <>
            <span className="mdx-eyebrow">Hacer una pregunta</span>
            <h2 className="mdx-h">Pregúntale <em>al asesor</em>.</h2>
            {vehiculo && <p className="mdx-sub">Sobre el <strong>{vehiculo}</strong></p>}
            <form onSubmit={submit} className="mdx-form" style={{ marginTop: 16 }}>
              <label className="mdx-field"><span>Nombre *</span><input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}/></label>
              <label className="mdx-field"><span>Email *</span><input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}/></label>
              <label className="mdx-field">
                <span>Tu pregunta *</span>
                <textarea rows={4} required value={form.pregunta} onChange={(e) => setForm({ ...form, pregunta: e.target.value })} placeholder="¿Acepta permuta? ¿Tiene mantenimientos al día? ¿Posibilidad de envío?"/>
              </label>
              <button type="submit" className="mdx-cta-primary">Enviar pregunta</button>
            </form>
          </>
        )}
      </Shell>
    );
  }

  // ============================================================
  // Global controller
  // ============================================================
  function ModalsHost() {
    const [active, setActive] = useState(null);
    const [payload, setPayload] = useState({});
    useEffect(() => {
      const handlers = {
        'altorra:open-auth':        (e) => { setPayload(e.detail || {}); setActive('auth'); },
        'altorra:open-sell':        (e) => { setPayload(e.detail || {}); setActive('sell'); },
        'altorra:open-finance':     (e) => { setPayload(e.detail || {}); setActive('finance'); },
        'altorra:open-appointment': (e) => { setPayload(e.detail || {}); setActive('appointment'); },
        'altorra:open-ask':         (e) => { setPayload(e.detail || {}); setActive('ask'); },
        'altorra:close-modal':       () => setActive(null),
      };
      Object.entries(handlers).forEach(([k, fn]) => window.addEventListener(k, fn));
      return () => Object.entries(handlers).forEach(([k, fn]) => window.removeEventListener(k, fn));
    }, []);
    const close = useCallback(() => setActive(null), []);
    return (
      <>
        <AuthModal        open={active === 'auth'}        onClose={close}/>
        <SellModal        open={active === 'sell'}        onClose={close}/>
        <FinanceModal     open={active === 'finance'}     onClose={close} vehiculo={payload.vehiculo}/>
        <AppointmentModal open={active === 'appointment'} onClose={close} vehiculo={payload.vehiculo}/>
        <AskModal         open={active === 'ask'}         onClose={close} vehiculo={payload.vehiculo}/>
      </>
    );
  }

  window.AltorraModals = {
    open: (which, detail) => window.dispatchEvent(new CustomEvent(`altorra:open-${which}`, { detail })),
    close: () => window.dispatchEvent(new CustomEvent('altorra:close-modal')),
  };

  (function safeMount(fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); })(() => {
    let host = document.getElementById('altorra-modals-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'altorra-modals-host';
      document.body.appendChild(host);
    }
    ReactDOM.createRoot(host).render(<ModalsHost/>);

    document.addEventListener('click', (e) => {
      const t = e.target.closest('[data-altorra-open]');
      if (!t) return;
      const which = t.getAttribute('data-altorra-open');
      const detail = t.getAttribute('data-vehiculo') ? { vehiculo: t.getAttribute('data-vehiculo') } : undefined;
      if (['auth','sell','finance','appointment','ask'].includes(which)) {
        e.preventDefault();
        window.AltorraModals.open(which, detail);
      }
    });
  });
})();
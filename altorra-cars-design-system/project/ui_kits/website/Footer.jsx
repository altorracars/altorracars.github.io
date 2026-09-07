// Footer Component — Altorra Cars UI Kit
function Footer() {
  return (
    <footer style={footerStyles.footer}>
      <span style={footerStyles.watermark}>ALTORRA</span>
      <div style={footerStyles.grid}>
        {/* Brand col */}
        <div>
          <div style={footerStyles.mark}>
            <span style={footerStyles.markName}>ALTORRA</span>
            <span style={footerStyles.markRule}></span>
            <span style={footerStyles.markSub}>CARS</span>
          </div>
          <p style={footerStyles.tagline}>
            <strong style={{color:'rgba(255,255,255,0.85)'}}>Donde la calidad y la confianza convergen.</strong>{' '}
            Conectamos oportunidades sobre ruedas, ofreciendo una experiencia de compra y venta más cercana, estratégica y profesional.
          </p>
        </div>

        <div style={footerStyles.sep}></div>

        {/* Contact col */}
        <div>
          <h3 style={footerStyles.colHeading}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            Hablemos
          </h3>
          {[
            { icon: 'mail', text: 'altorracarssale@gmail.com' },
            { icon: 'phone', text: '+57 323 501 6747' },
            { icon: 'pin', text: 'Cartagena, Bolívar, Colombia' },
          ].map(item => (
            <div key={item.text} style={footerStyles.contactItem}>
              <ContactIcon type={item.icon} />
              <span>{item.text}</span>
            </div>
          ))}
          <div style={{marginTop:14}}>
            <div style={{fontSize:'0.62rem',color:'#b89658',letterSpacing:'0.1em',textTransform:'uppercase',fontWeight:700,marginBottom:4}}>Horario</div>
            <div style={{color:'rgba(255,255,255,0.55)',fontSize:'0.76rem',lineHeight:1.7}}>Lun – Vie · 8:00 am – 6:00 pm<br/>Sáb · 9:00 am – 2:00 pm</div>
          </div>
        </div>

        <div style={footerStyles.sep}></div>

        {/* Social col */}
        <div>
          <h3 style={footerStyles.colHeading}>Conéctate con Nosotros</h3>
          {[
            { name:'WhatsApp', color:'#25d366', href:'https://wa.me/573235016747' },
            { name:'Instagram', color:'#e1306c', href:'https://www.instagram.com/altorracars/' },
            { name:'Facebook', color:'#1877f2', href:'https://www.facebook.com/share/14XKk6MCmiT/' },
          ].map(s => (
            <a key={s.name} href={s.href} target="_blank" rel="noopener noreferrer"
              style={{...footerStyles.socialLink, color:s.color}}>
              <SocialIcon name={s.name} />
              {s.name}
            </a>
          ))}
        </div>
      </div>

      <div style={footerStyles.bottom}>
        <p style={footerStyles.copy}>© 2026 <strong>ALTORRA CARS</strong> — ALTORRA COMPANY SAS. Todos los derechos reservados.</p>
        <nav style={{display:'flex',gap:16}}>
          {['Términos','Privacidad','Cookies'].map(l => (
            <a key={l} href="#" style={{color:'#555',fontSize:'0.72rem',textDecoration:'none'}}>{l}</a>
          ))}
        </nav>
      </div>
    </footer>
  );
}

function ContactIcon({ type }) {
  const s = { width:13, height:13, fill:'none', stroke:'#b89658', strokeWidth:1.6, strokeLinecap:'round', strokeLinejoin:'round' };
  if (type === 'mail') return <svg {...s} viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>;
  if (type === 'phone') return <svg {...s} viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l.94-.94a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>;
  return <svg {...s} viewBox="0 0 24 24"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>;
}

function SocialIcon({ name }) {
  if (name === 'WhatsApp') return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>;
  if (name === 'Instagram') return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/></svg>;
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>;
}

const footerStyles = {
  footer: { background:'linear-gradient(180deg,#0a0a0a,#050505)',borderTop:'2px solid rgba(184,150,88,0.2)',padding:'40px 48px 24px',position:'relative',overflow:'hidden',fontFamily:'Poppins,sans-serif' },
  watermark: { position:'absolute',right:-20,top:'50%',transform:'translateY(-50%)',fontSize:'7rem',fontWeight:900,color:'rgba(212,175,55,0.04)',pointerEvents:'none',letterSpacing:'-0.05em',userSelect:'none',whiteSpace:'nowrap' },
  grid: { display:'grid',gridTemplateColumns:'1.5fr 1px 1fr 1px 1fr',gap:0,maxWidth:1200,margin:'0 auto 32px' },
  sep: { background:'rgba(255,255,255,0.07)',margin:'0 32px' },
  mark: { display:'flex',flexDirection:'column',marginBottom:14 },
  markName: { fontSize:'1.6rem',fontWeight:900,color:'#d4af37',letterSpacing:'-0.02em',lineHeight:1 },
  markRule: { width:'100%',height:1,background:'rgba(212,175,55,0.4)',margin:'4px 0' },
  markSub: { fontSize:'0.62rem',fontWeight:700,letterSpacing:'0.25em',color:'#b89658',textTransform:'uppercase' },
  tagline: { color:'rgba(255,255,255,0.6)',fontSize:'0.8rem',lineHeight:1.8 },
  colHeading: { display:'flex',alignItems:'center',gap:7,color:'#b89658',fontSize:'0.72rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:14 },
  contactItem: { display:'flex',alignItems:'center',gap:8,color:'rgba(255,255,255,0.65)',fontSize:'0.78rem',marginBottom:8 },
  socialLink: { display:'flex',alignItems:'center',gap:8,fontSize:'0.84rem',fontWeight:500,padding:'7px 10px',borderRadius:6,marginBottom:4,textDecoration:'none',transition:'all 0.2s' },
  bottom: { maxWidth:1200,margin:'0 auto',borderTop:'1px solid rgba(255,255,255,0.07)',paddingTop:16,display:'flex',justifyContent:'space-between',alignItems:'center' },
  copy: { color:'#555',fontSize:'0.72rem' },
};

Object.assign(window, { Footer });

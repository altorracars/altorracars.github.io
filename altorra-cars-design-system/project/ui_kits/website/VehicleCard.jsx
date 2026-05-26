// VehicleCard Component — Altorra Cars UI Kit
const { useState: useCardState } = React;

function VehicleCard({ vehicle, onClick }) {
  const [fav, setFav] = useCardState(false);
  const [hovered, setHovered] = useCardState(false);

  return (
    <div
      onClick={() => onClick && onClick(vehicle)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        ...cardStyles.card,
        ...(hovered ? cardStyles.cardHover : {}),
        cursor: 'pointer',
      }}>
      {/* Image */}
      <div style={cardStyles.imgWrap}>
        <img
          src={vehicle.image || '../../assets/placeholder-car.jpg'}
          alt={vehicle.title}
          style={{...cardStyles.img, ...(hovered ? {transform:'scale(1.05)'} : {})}}
          onError={e => { e.target.src = '../../assets/placeholder-car.jpg'; }}
        />
        {/* Badge */}
        <div style={{...cardStyles.badge, background: vehicle.badgeColor || '#38a28e'}}>
          {vehicle.badge || 'NUEVO'}
        </div>
        {/* Fav btn */}
        <button
          onClick={e => { e.stopPropagation(); setFav(!fav); }}
          style={{...cardStyles.favBtn, ...(fav ? {background:'#d4af37'} : {})}}>
          <svg width="16" height="16" viewBox="0 0 24 24"
            fill={fav ? '#fff' : 'none'} stroke={fav ? '#fff' : '#d4af37'} strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>
      {/* Info */}
      <div style={cardStyles.body}>
        <div style={cardStyles.title}>{vehicle.title}</div>
        <div style={cardStyles.specs}>{vehicle.year} · {vehicle.km} · {vehicle.trans}</div>
        <div style={cardStyles.footer}>
          <div>
            {vehicle.originalPrice && (
              <div style={cardStyles.originalPrice}>${vehicle.originalPrice}</div>
            )}
            <div style={{...cardStyles.price, ...(vehicle.offer ? {color:'#e74c3c'} : {})}}>
              ${vehicle.price}
            </div>
          </div>
          <div style={cardStyles.btnView}>Ver más</div>
        </div>
      </div>
    </div>
  );
}

const cardStyles = {
  card: { background:'rgba(255,255,255,0.08)',backdropFilter:'blur(20px)',border:'1px solid rgba(255,255,255,0.18)',borderRadius:20,overflow:'hidden',boxShadow:'0 8px 32px rgba(0,0,0,0.37),inset 0 1px 0 rgba(255,255,255,0.15)',transition:'all 0.4s cubic-bezier(0.4,0,0.2,1)' },
  cardHover: { transform:'translateY(-8px) scale(1.015)',background:'rgba(255,255,255,0.12)',borderColor:'rgba(184,150,88,0.5)',boxShadow:'0 20px 60px rgba(0,0,0,0.5),0 0 0 2px #b89658,0 0 50px rgba(212,175,55,0.4),inset 0 1px 0 rgba(255,255,255,0.3)' },
  imgWrap: { position:'relative',height:190,overflow:'hidden',background:'#1a1a1a' },
  img: { width:'100%',height:'100%',objectFit:'cover',transition:'transform 0.4s ease' },
  badge: { position:'absolute',top:10,left:10,padding:'3px 10px',borderRadius:8,fontSize:'0.72rem',fontWeight:700,color:'#fff' },
  favBtn: { position:'absolute',top:10,right:10,width:34,height:34,background:'#fff',borderRadius:'50%',border:'none',display:'flex',alignItems:'center',justifyContent:'center',cursor:'pointer',boxShadow:'0 2px 8px rgba(0,0,0,0.2)',transition:'all 0.2s' },
  body: { padding:18 },
  title: { fontSize:'1rem',fontWeight:600,color:'#fff',marginBottom:4 },
  specs: { color:'#b0b0b0',fontSize:'0.82rem',marginBottom:14 },
  footer: { display:'flex',justifyContent:'space-between',alignItems:'center' },
  price: { fontSize:'1.2rem',fontWeight:700,color:'#d4af37' },
  originalPrice: { fontSize:'0.78rem',color:'#9c9997',textDecoration:'line-through' },
  btnView: { padding:'6px 16px',background:'#1d1b19',color:'#fff',borderRadius:8,fontSize:'0.8rem',fontWeight:500 },
};

Object.assign(window, { VehicleCard });

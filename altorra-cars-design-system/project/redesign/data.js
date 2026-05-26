// ALTORRA CARS · Mock data
window.AltorraData = (function () {
  const BRANDS = [
    { slug: 'audi', name: 'Audi', logo: 'logos/audi.webp', count: 8 },
    { slug: 'bmw', name: 'BMW', logo: 'logos/bmw.webp', count: 12 },
    { slug: 'chevrolet', name: 'Chevrolet', logo: 'logos/chevrolet.webp', count: 18 },
    { slug: 'fiat', name: 'Fiat', logo: 'logos/fiat.webp', count: 6 },
    { slug: 'ford', name: 'Ford', logo: 'logos/ford.webp', count: 14 },
    { slug: 'honda', name: 'Honda', logo: 'logos/honda.webp', count: 9 },
    { slug: 'hyundai', name: 'Hyundai', logo: 'logos/hyundai.webp', count: 11 },
    { slug: 'jeep', name: 'Jeep', logo: 'logos/jeep.webp', count: 7 },
    { slug: 'kia', name: 'Kia', logo: 'logos/kia.webp', count: 13 },
    { slug: 'mazda', name: 'Mazda', logo: 'logos/mazda.webp', count: 10 },
    { slug: 'nissan', name: 'Nissan', logo: 'logos/nissan.webp', count: 16 },
    { slug: 'renault', name: 'Renault', logo: 'logos/renault.webp', count: 8 },
    { slug: 'toyota', name: 'Toyota', logo: 'logos/toyota.webp', count: 21 },
    { slug: 'volkswagen', name: 'Volkswagen', logo: 'logos/volkswagen.webp', count: 9 },
  ];

  const CATEGORIES = [
    { slug: 'suv', name: 'SUV', img: 'cat/SUV.jpg', count: 42 },
    { slug: 'pickup', name: 'Pickup', img: 'cat/PICKUP.jpg', count: 18 },
    { slug: 'sedan', name: 'Sedán', img: 'cat/SEDAN.jpg', count: 27 },
    { slug: 'hatchback', name: 'Hatchback', img: 'cat/HATCHBACK.jpg', count: 21 },
    { slug: 'camionetas', name: 'Camionetas', img: 'cat/camioneta.jpg', count: 15 },
    { slug: 'nuevos', name: 'Nuevos 0KM', img: 'cat/NUEVOS.jpg', count: 31 },
    { slug: 'usados', name: 'Usados', img: 'cat/USADOS.jpg', count: 86 },
  ];

  // Vehicle pool
  const PALETTE = ['Negro Onyx', 'Blanco Perla', 'Plata Metálico', 'Gris Antracita', 'Azul Profundo', 'Rojo Imperial'];
  const trans = ['Automática', 'Manual', 'CVT', 'DCT 7v', 'Tiptronic 8v'];
  const fuels = ['Gasolina', 'Diésel', 'Híbrido', 'Eléctrico'];
  const cities = ['Cartagena', 'Bocagrande', 'Manga', 'Crespo'];

  const VEHICLES = [
    { id:'v01', brand:'toyota', model:'Fortuner SW4', year:2024, price:189900000, km:12500, cat:'suv', trans:'Automática', fuel:'Diésel', power:'201 HP', cc:'2.755 cc', condition:'usado', featured:true, badge:'Nuevo Ingreso' },
    { id:'v02', brand:'bmw', model:'X3 xDrive30i', year:2024, price:265000000, km:8200, cat:'suv', trans:'Tiptronic 8v', fuel:'Gasolina', power:'248 HP', cc:'1.998 cc', condition:'usado', featured:true, badge:'Premium' },
    { id:'v03', brand:'mazda', model:'CX-5 Grand Touring', year:2025, price:148500000, km:0, cat:'suv', trans:'Automática', fuel:'Gasolina', power:'187 HP', cc:'2.488 cc', condition:'nuevo', featured:true, badge:'0 KM' },
    { id:'v04', brand:'ford', model:'Ranger Limited 4x4', year:2024, price:212000000, km:18900, cat:'pickup', trans:'Automática', fuel:'Diésel', power:'170 HP', cc:'2.000 cc', condition:'usado', featured:false },
    { id:'v05', brand:'chevrolet', model:'Tracker Premier', year:2024, price:92000000, km:9500, cat:'suv', trans:'CVT', fuel:'Gasolina', power:'132 HP', cc:'1.200 cc', condition:'usado', featured:true, badge:'Ahorro' },
    { id:'v06', brand:'kia', model:'Sportage GT-Line', year:2025, price:138900000, km:0, cat:'suv', trans:'DCT 7v', fuel:'Híbrido', power:'226 HP', cc:'1.598 cc', condition:'nuevo', featured:true, badge:'Híbrido' },
    { id:'v07', brand:'nissan', model:'Frontier Pro-4X', year:2024, price:198500000, km:14200, cat:'pickup', trans:'Automática', fuel:'Diésel', power:'190 HP', cc:'2.298 cc', condition:'usado', featured:false },
    { id:'v08', brand:'hyundai', model:'Tucson N-Line', year:2024, price:142000000, km:6800, cat:'suv', trans:'Automática', fuel:'Gasolina', power:'180 HP', cc:'1.998 cc', condition:'usado', featured:true },
    { id:'v09', brand:'volkswagen', model:'Amarok Highline', year:2024, price:178000000, km:22100, cat:'pickup', trans:'Automática', fuel:'Diésel', power:'180 HP', cc:'1.968 cc', condition:'usado', featured:false },
    { id:'v10', brand:'audi', model:'Q5 Sportback', year:2024, price:312000000, km:11500, cat:'suv', trans:'Tiptronic 8v', fuel:'Gasolina', power:'265 HP', cc:'1.984 cc', condition:'usado', featured:true, badge:'Luxury' },
    { id:'v11', brand:'renault', model:'Duster Iconic', year:2025, price:88500000, km:0, cat:'suv', trans:'Manual', fuel:'Gasolina', power:'113 HP', cc:'1.598 cc', condition:'nuevo', featured:false, badge:'0 KM' },
    { id:'v12', brand:'jeep', model:'Wrangler Rubicon', year:2024, price:285000000, km:7200, cat:'suv', trans:'Automática', fuel:'Gasolina', power:'285 HP', cc:'2.000 cc', condition:'usado', featured:true, badge:'Off-road' },
    { id:'v13', brand:'honda', model:'Civic Touring', year:2024, price:118500000, km:9800, cat:'sedan', trans:'CVT', fuel:'Gasolina', power:'180 HP', cc:'1.498 cc', condition:'usado', featured:false },
    { id:'v14', brand:'toyota', model:'Corolla Cross XSE', year:2025, price:122000000, km:0, cat:'suv', trans:'CVT', fuel:'Híbrido', power:'196 HP', cc:'1.987 cc', condition:'nuevo', featured:true, badge:'Híbrido' },
    { id:'v15', brand:'mazda', model:'Mazda 3 Grand Touring', year:2024, price:108000000, km:5600, cat:'sedan', trans:'Automática', fuel:'Gasolina', power:'186 HP', cc:'2.488 cc', condition:'usado', featured:false },
    { id:'v16', brand:'fiat', model:'Cronos Drive', year:2025, price:74900000, km:0, cat:'sedan', trans:'Manual', fuel:'Gasolina', power:'109 HP', cc:'1.298 cc', condition:'nuevo', featured:false, badge:'Económico' },
    { id:'v17', brand:'kia', model:'Picanto X-Line', year:2024, price:62500000, km:8200, cat:'hatchback', trans:'Automática', fuel:'Gasolina', power:'87 HP', cc:'1.197 cc', condition:'usado', featured:false },
    { id:'v18', brand:'hyundai', model:'i10 Premium', year:2024, price:58900000, km:11000, cat:'hatchback', trans:'Manual', fuel:'Gasolina', power:'82 HP', cc:'1.197 cc', condition:'usado', featured:false },
    { id:'v19', brand:'bmw', model:'iX xDrive40', year:2025, price:485000000, km:0, cat:'suv', trans:'Automática', fuel:'Eléctrico', power:'326 HP', cc:'EV', condition:'nuevo', featured:true, badge:'EV · 0 KM' },
    { id:'v20', brand:'audi', model:'e-tron GT quattro', year:2025, price:520000000, km:0, cat:'sedan', trans:'Automática', fuel:'Eléctrico', power:'522 HP', cc:'EV', condition:'nuevo', featured:true, badge:'EV Premium' },
  ];

  // attach derived display
  VEHICLES.forEach((v, i) => {
    v.brandName = (BRANDS.find(b => b.slug === v.brand) || {}).name || v.brand;
    v.color = PALETTE[i % PALETTE.length];
    v.city = cities[i % cities.length];
    v.title = `${v.brandName} ${v.model}`;
    v.priceFmt = '$' + v.price.toLocaleString('es-CO');
    v.kmFmt = v.km.toLocaleString('es-CO') + ' km';
    v.images = generatePhotos(v);
    // ───── extras for detail page ─────
    if (v.featured && i % 3 === 0) {
      v.priceOriginal = Math.round(v.price * 1.08);
      v.priceOriginalFmt = '$' + v.priceOriginal.toLocaleString('es-CO');
      v.hasOffer = true;
    }
    v.transType = v.trans.split(' ')[0];
    v.cuotaDesde = Math.round((v.price * 0.7 * 0.0098) / (1 - Math.pow(1.0098, -60)));
    v.cuotaDesdeFmt = '$' + v.cuotaDesde.toLocaleString('es-CO');
  });

  function generatePhotos(v) {
    // synthetic cards built with SVG (placeholder for stock photo)
    const cssBg = pickGradientForVehicle(v);
    return Array.from({ length: 6 }, (_, idx) => ({
      idx,
      bg: cssBg,
      label: ['Frontal', 'Lateral', 'Trasero', 'Interior', 'Tablero', 'Detalle'][idx]
    }));
  }

  function pickGradientForVehicle(v) {
    const palettes = {
      negro: ['#1a1a22', '#0a0a0e'],
      blanco: ['#e8e8ed', '#ffffff'],
      plata: ['#c7c8cc', '#9ea0a5'],
      gris: ['#5c5c68', '#2a2a32'],
      azul: ['#1e3a5f', '#0e1e35'],
      rojo: ['#7a2424', '#3a1010']
    };
    const k = v.color.toLowerCase().split(' ')[0];
    const stops = palettes[k] || palettes.gris;
    return `linear-gradient(135deg, ${stops[0]} 0%, ${stops[1]} 100%)`;
  }

  const TESTIMONIALS = [
    { name: 'Carolina M.', city: 'Cartagena', stars: 5, text: 'Compré mi Mazda CX-5 con ellos. Trato impecable, papeleo en 24h.' },
    { name: 'Jorge R.', city: 'Bocagrande', stars: 5, text: 'La asesoría financiera fue clave. Cuotas exactas a lo simulado.' },
    { name: 'Andrea L.', city: 'Manga', stars: 5, text: 'Mi BMW X3 llegó como prometieron. Mejor concesionario de Cartagena.' },
    { name: 'Mauricio P.', city: 'Crespo', stars: 4, text: 'Variedad enorme y precios honestos. Recomendado 100%.' },
  ];

  const SERVICES = [
    { icon: 'wallet', title: 'Crédito Aprobado', text: 'Aprobación en 4 horas hábiles con los principales bancos del país.' },
    { icon: 'truck', title: 'Entrega Nacional', text: 'Llevamos tu vehículo a cualquier ciudad de Colombia con seguro incluido.' },
    { icon: 'check', title: 'Inspección 150 puntos', text: 'Cada vehículo pasa por una revisión mecánica certificada antes de venta.' },
    { icon: 'phone', title: 'Soporte 24/7', text: 'Asesoría humana por WhatsApp y llamada todos los días del año.' },
  ];

  return { BRANDS, CATEGORIES, VEHICLES, TESTIMONIALS, SERVICES, pickGradientForVehicle };
})();
 + v.price.toLocaleString('es-CO');
      v.priceOriginalFmt = '

  function generatePhotos(v) {
    // synthetic cards built with SVG (placeholder for stock photo)
    const cssBg = pickGradientForVehicle(v);
    return Array.from({ length: 6 }, (_, idx) => ({
      idx,
      bg: cssBg,
      label: ['Frontal', 'Lateral', 'Trasero', 'Interior', 'Tablero', 'Detalle'][idx]
    }));
  }

  function pickGradientForVehicle(v) {
    const palettes = {
      negro: ['#1a1a22', '#0a0a0e'],
      blanco: ['#e8e8ed', '#ffffff'],
      plata: ['#c7c8cc', '#9ea0a5'],
      gris: ['#5c5c68', '#2a2a32'],
      azul: ['#1e3a5f', '#0e1e35'],
      rojo: ['#7a2424', '#3a1010']
    };
    const k = v.color.toLowerCase().split(' ')[0];
    const stops = palettes[k] || palettes.gris;
    return `linear-gradient(135deg, ${stops[0]} 0%, ${stops[1]} 100%)`;
  }

  const TESTIMONIALS = [
    { name: 'Carolina M.', city: 'Cartagena', stars: 5, text: 'Compré mi Mazda CX-5 con ellos. Trato impecable, papeleo en 24h.' },
    { name: 'Jorge R.', city: 'Bocagrande', stars: 5, text: 'La asesoría financiera fue clave. Cuotas exactas a lo simulado.' },
    { name: 'Andrea L.', city: 'Manga', stars: 5, text: 'Mi BMW X3 llegó como prometieron. Mejor concesionario de Cartagena.' },
    { name: 'Mauricio P.', city: 'Crespo', stars: 4, text: 'Variedad enorme y precios honestos. Recomendado 100%.' },
  ];

  const SERVICES = [
    { icon: 'wallet', title: 'Crédito Aprobado', text: 'Aprobación en 4 horas hábiles con los principales bancos del país.' },
    { icon: 'truck', title: 'Entrega Nacional', text: 'Llevamos tu vehículo a cualquier ciudad de Colombia con seguro incluido.' },
    { icon: 'check', title: 'Inspección 150 puntos', text: 'Cada vehículo pasa por una revisión mecánica certificada antes de venta.' },
    { icon: 'phone', title: 'Soporte 24/7', text: 'Asesoría humana por WhatsApp y llamada todos los días del año.' },
  ];

  return { BRANDS, CATEGORIES, VEHICLES, TESTIMONIALS, SERVICES, pickGradientForVehicle };
})();
 + v.priceOriginal.toLocaleString('es-CO');
      v.hasOffer = true;
    }
    v.transType = v.trans.split(' ')[0];
    v.cuotaDesde = Math.round((v.price * 0.7 * 0.0098) / (1 - Math.pow(1.0098, -60)));
    v.cuotaDesdeFmt = '

  function generatePhotos(v) {
    // synthetic cards built with SVG (placeholder for stock photo)
    const cssBg = pickGradientForVehicle(v);
    return Array.from({ length: 6 }, (_, idx) => ({
      idx,
      bg: cssBg,
      label: ['Frontal', 'Lateral', 'Trasero', 'Interior', 'Tablero', 'Detalle'][idx]
    }));
  }

  function pickGradientForVehicle(v) {
    const palettes = {
      negro: ['#1a1a22', '#0a0a0e'],
      blanco: ['#e8e8ed', '#ffffff'],
      plata: ['#c7c8cc', '#9ea0a5'],
      gris: ['#5c5c68', '#2a2a32'],
      azul: ['#1e3a5f', '#0e1e35'],
      rojo: ['#7a2424', '#3a1010']
    };
    const k = v.color.toLowerCase().split(' ')[0];
    const stops = palettes[k] || palettes.gris;
    return `linear-gradient(135deg, ${stops[0]} 0%, ${stops[1]} 100%)`;
  }

  const TESTIMONIALS = [
    { name: 'Carolina M.', city: 'Cartagena', stars: 5, text: 'Compré mi Mazda CX-5 con ellos. Trato impecable, papeleo en 24h.' },
    { name: 'Jorge R.', city: 'Bocagrande', stars: 5, text: 'La asesoría financiera fue clave. Cuotas exactas a lo simulado.' },
    { name: 'Andrea L.', city: 'Manga', stars: 5, text: 'Mi BMW X3 llegó como prometieron. Mejor concesionario de Cartagena.' },
    { name: 'Mauricio P.', city: 'Crespo', stars: 4, text: 'Variedad enorme y precios honestos. Recomendado 100%.' },
  ];

  const SERVICES = [
    { icon: 'wallet', title: 'Crédito Aprobado', text: 'Aprobación en 4 horas hábiles con los principales bancos del país.' },
    { icon: 'truck', title: 'Entrega Nacional', text: 'Llevamos tu vehículo a cualquier ciudad de Colombia con seguro incluido.' },
    { icon: 'check', title: 'Inspección 150 puntos', text: 'Cada vehículo pasa por una revisión mecánica certificada antes de venta.' },
    { icon: 'phone', title: 'Soporte 24/7', text: 'Asesoría humana por WhatsApp y llamada todos los días del año.' },
  ];

  return { BRANDS, CATEGORIES, VEHICLES, TESTIMONIALS, SERVICES, pickGradientForVehicle };
})();
 + v.cuotaDesde.toLocaleString('es-CO');
  });

  function generatePhotos(v) {
    // synthetic cards built with SVG (placeholder for stock photo)
    const cssBg = pickGradientForVehicle(v);
    return Array.from({ length: 6 }, (_, idx) => ({
      idx,
      bg: cssBg,
      label: ['Frontal', 'Lateral', 'Trasero', 'Interior', 'Tablero', 'Detalle'][idx]
    }));
  }

  function pickGradientForVehicle(v) {
    const palettes = {
      negro: ['#1a1a22', '#0a0a0e'],
      blanco: ['#e8e8ed', '#ffffff'],
      plata: ['#c7c8cc', '#9ea0a5'],
      gris: ['#5c5c68', '#2a2a32'],
      azul: ['#1e3a5f', '#0e1e35'],
      rojo: ['#7a2424', '#3a1010']
    };
    const k = v.color.toLowerCase().split(' ')[0];
    const stops = palettes[k] || palettes.gris;
    return `linear-gradient(135deg, ${stops[0]} 0%, ${stops[1]} 100%)`;
  }

  const TESTIMONIALS = [
    { name: 'Carolina M.', city: 'Cartagena', stars: 5, text: 'Compré mi Mazda CX-5 con ellos. Trato impecable, papeleo en 24h.' },
    { name: 'Jorge R.', city: 'Bocagrande', stars: 5, text: 'La asesoría financiera fue clave. Cuotas exactas a lo simulado.' },
    { name: 'Andrea L.', city: 'Manga', stars: 5, text: 'Mi BMW X3 llegó como prometieron. Mejor concesionario de Cartagena.' },
    { name: 'Mauricio P.', city: 'Crespo', stars: 4, text: 'Variedad enorme y precios honestos. Recomendado 100%.' },
  ];

  const SERVICES = [
    { icon: 'wallet', title: 'Crédito Aprobado', text: 'Aprobación en 4 horas hábiles con los principales bancos del país.' },
    { icon: 'truck', title: 'Entrega Nacional', text: 'Llevamos tu vehículo a cualquier ciudad de Colombia con seguro incluido.' },
    { icon: 'check', title: 'Inspección 150 puntos', text: 'Cada vehículo pasa por una revisión mecánica certificada antes de venta.' },
    { icon: 'phone', title: 'Soporte 24/7', text: 'Asesoría humana por WhatsApp y llamada todos los días del año.' },
  ];

  return { BRANDS, CATEGORIES, VEHICLES, TESTIMONIALS, SERVICES, pickGradientForVehicle };
})();

// ──────────────────────────────────────────────────────────────
// Per-vehicle rich content for detail page (features + description)
// ──────────────────────────────────────────────────────────────
window.AltorraData.FEATURES_TEMPLATE = function (v) {
  const isElec = v.fuel === 'Eléctrico';
  const isHyb  = v.fuel === 'Híbrido';
  return [
    {
      title: 'Confort',
      items: [
        'Aire acondicionado climatizado',
        'Asientos de cuero' + (v.cat === 'pickup' ? ' tipo 4x4' : ''),
        'Apertura sin llave + botón de arranque',
        v.cat === 'suv' ? 'Sensores de parqueo 360°' : 'Sensores de parqueo traseros',
        'Vidrios eléctricos en las 4 puertas',
        v.condition === 'nuevo' ? 'Sistema de masaje en asientos' : 'Asientos calefactables',
      ],
    },
    {
      title: 'Seguridad',
      items: [
        'Doble airbag frontal' + (v.year >= 2020 ? ' + laterales' : ''),
        'Frenos ABS con asistente EBD',
        'Control de estabilidad ESP',
        'Alarma con inmovilizador',
        v.year >= 2022 ? 'Asistente de frenado de emergencia' : 'Sensores de freno',
        v.cat === 'suv' || v.cat === 'pickup' ? 'Control de descenso (HDC)' : 'Control de tracción',
      ],
    },
    {
      title: 'Multimedia',
      items: [
        'Pantalla táctil ' + (v.year >= 2022 ? '10"' : '8"') + ' con Apple CarPlay y Android Auto',
        'Bluetooth y conexión USB-C',
        v.year >= 2023 ? 'Cargador inalámbrico Qi' : 'Cargador USB rápido',
        '6 parlantes ' + (v.year >= 2024 ? 'premium' : ''),
        'Comandos en el volante',
        v.condition === 'nuevo' ? 'Sistema de navegación GPS' : 'Cámara de reversa',
      ],
    },
    {
      title: 'Exterior',
      items: [
        v.condition === 'nuevo' ? 'Rines de aleación de 18"' : 'Rines de aleación de 17"',
        'Luces ' + (v.year >= 2022 ? 'LED full' : 'halógenas con DRL'),
        'Espejos eléctricos y plegables',
        v.cat === 'pickup' || v.cat === 'suv' ? 'Barras de techo' : 'Antena de techo',
        isElec ? 'Carga rápida DC 100 kW' : (isHyb ? 'Frenado regenerativo' : 'Llantas todoterreno opcionales'),
      ],
    },
  ];
};

window.AltorraData.DESCRIPTION_TEMPLATE = function (v) {
  const offerLine = v.hasOffer
    ? `Por tiempo limitado, este ${v.brandName} ${v.model} ${v.year} está disponible con una oferta especial: pasa de ${v.priceOriginalFmt} a ${v.priceFmt} — un ahorro significativo respecto al precio del mercado.`
    : '';
  return [
    `El ${v.brandName} ${v.model} ${v.year} es una opción ${v.condition === 'nuevo' ? '0 KM' : 'usada y verificada'} disponible en Altorra con el aliado titular ubicado en ${v.city}. Con ${v.km.toLocaleString('es-CO')} km, motor de ${v.cc}, transmisión ${v.trans.toLowerCase()} y consumo de ${v.fuel.toLowerCase()}, ofrece ${v.power} de potencia y un desempeño confiable tanto en ciudad como en carretera.`,
    `Cada vehículo en Altorra pasa por verificación previa: documentación al día, historial revisado y peritaje técnico disponible bajo solicitud. Si tienes preguntas específicas sobre el estado mecánico, kilometraje o mantenimientos, el asesor del aliado responde en menos de 2 horas.`,
    offerLine,
    `Posibilidad de financiación con cuota inicial desde el 30% y plazos hasta 84 meses con los 5 bancos aliados (Bancolombia, Davivienda, Occidente, BBVA, Scotiabank). Simula tu crédito desde la página o solicita la pre-aprobación.`,
    `Aceptamos permuta como parte de pago. Coordinamos la entrega y el traspaso de documentos. Si quieres conocer el carro en persona o por videollamada, puedes agendar tu visita desde aquí.`,
  ].filter(Boolean).join('\n\n');
};

// ============================================
// ESTIMADOR DE RETOMA (TRADE-IN) - ALTORRA CARS
// Calcula el valor aproximado de tu vehículo actual
// ============================================

class TradeInEstimator {
    constructor() {
        this.whatsappNumber = '573235016747';

        // Valores base por tipo de vehículo (precios promedio en Colombia 2025)
        this.baseValues = {
            'suv': { base: 85000000, depreciationRate: 0.12 },
            'sedan': { base: 55000000, depreciationRate: 0.14 },
            'hatchback': { base: 42000000, depreciationRate: 0.15 },
            'pickup': { base: 95000000, depreciationRate: 0.10 },
            'van': { base: 75000000, depreciationRate: 0.13 }
        };

        // Ajustes por marca (factor multiplicador)
        this.brandFactors = {
            'toyota': 1.15,
            'mazda': 1.10,
            'chevrolet': 1.00,
            'renault': 0.95,
            'kia': 1.05,
            'hyundai': 1.05,
            'nissan': 1.02,
            'ford': 1.00,
            'volkswagen': 1.08,
            'honda': 1.12,
            'suzuki': 0.98,
            'mitsubishi': 1.00,
            'jeep': 1.10,
            'subaru': 1.08,
            'peugeot': 0.92,
            'citroen': 0.90,
            'fiat': 0.88,
            'otro': 0.95
        };

        // Ajustes por estado
        this.conditionFactors = {
            'excelente': 1.10,
            'bueno': 1.00,
            'regular': 0.85,
            'necesita-reparaciones': 0.70
        };

        // Ajuste por kilometraje (por cada 10,000 km adicionales)
        this.kmPenaltyPer10k = 0.02;
        this.idealKmPerYear = 15000;

        this.init();
    }

    init() {
        this.createTradeInButton();
        this.attachEventListeners();
    }

    // ===== CREAR BOTÓN EN EL DOM =====
    createTradeInButton() {
        // Agregar botón en la sección comercial si existe
        const vendeSection = document.querySelector('[data-modal="vende-auto"]');
        if (vendeSection && !document.getElementById('btn-trade-in-estimate')) {
            const estimateBtn = document.createElement('button');
            estimateBtn.id = 'btn-trade-in-estimate';
            estimateBtn.type = 'button';
            estimateBtn.className = 'btn-commercial btn-estimate';
            estimateBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M9 7h6l2 2h3a2 2 0 012 2v9a2 2 0 01-2 2H4a2 2 0 01-2-2v-9a2 2 0 012-2h3l2-2z"/>
                    <circle cx="12" cy="15" r="3"/>
                </svg>
                CALCULAR VALOR
            `;
            vendeSection.parentNode.insertBefore(estimateBtn, vendeSection.nextSibling);
        }
    }

    // ===== CREAR MODAL =====
    createModal() {
        const existing = document.getElementById('tradein-modal');
        if (existing) existing.remove();

        const currentYear = new Date().getFullYear();
        const years = [];
        for (let y = currentYear; y >= 2005; y--) {
            years.push(y);
        }

        const modal = document.createElement('div');
        modal.id = 'tradein-modal';
        modal.className = 'tradein-modal-overlay';

        modal.innerHTML = `
            <div class="tradein-modal">
                <div class="tradein-modal-header">
                    <h2 class="tradein-modal-title">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
                        </svg>
                        Estimador de Retoma
                    </h2>
                    <p class="tradein-modal-subtitle">Calcula el valor aproximado de tu vehículo actual</p>
                    <button type="button" class="tradein-modal-close" aria-label="Cerrar">&times;</button>
                </div>

                <div class="tradein-modal-body">
                    <form id="tradeinForm" class="tradein-form">
                        <div class="tradein-step active" data-step="1">
                            <h3 class="step-title">
                                <span class="step-number">1</span>
                                Datos del vehículo
                            </h3>

                            <div class="tradein-form-group">
                                <label class="form-label required">Marca</label>
                                <select name="marca" class="form-select" required>
                                    <option value="">Seleccionar marca...</option>
                                    <option value="toyota">Toyota</option>
                                    <option value="chevrolet">Chevrolet</option>
                                    <option value="mazda">Mazda</option>
                                    <option value="renault">Renault</option>
                                    <option value="kia">Kia</option>
                                    <option value="hyundai">Hyundai</option>
                                    <option value="nissan">Nissan</option>
                                    <option value="ford">Ford</option>
                                    <option value="honda">Honda</option>
                                    <option value="volkswagen">Volkswagen</option>
                                    <option value="suzuki">Suzuki</option>
                                    <option value="mitsubishi">Mitsubishi</option>
                                    <option value="jeep">Jeep</option>
                                    <option value="subaru">Subaru</option>
                                    <option value="peugeot">Peugeot</option>
                                    <option value="citroen">Citroën</option>
                                    <option value="fiat">Fiat</option>
                                    <option value="otro">Otra marca</option>
                                </select>
                            </div>

                            <div class="tradein-form-group">
                                <label class="form-label required">Modelo</label>
                                <input type="text" name="modelo" class="form-input" required placeholder="Ej: Corolla, Spark GT, CX-5...">
                            </div>

                            <div class="tradein-form-row">
                                <div class="tradein-form-group">
                                    <label class="form-label required">Año</label>
                                    <select name="year" class="form-select" required>
                                        <option value="">Año...</option>
                                        ${years.map(y => `<option value="${y}">${y}</option>`).join('')}
                                    </select>
                                </div>
                                <div class="tradein-form-group">
                                    <label class="form-label required">Tipo</label>
                                    <select name="tipo" class="form-select" required>
                                        <option value="">Tipo...</option>
                                        <option value="suv">SUV</option>
                                        <option value="sedan">Sedán</option>
                                        <option value="hatchback">Hatchback</option>
                                        <option value="pickup">Pickup</option>
                                        <option value="van">Van/Minivan</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div class="tradein-step" data-step="2">
                            <h3 class="step-title">
                                <span class="step-number">2</span>
                                Estado y kilometraje
                            </h3>

                            <div class="tradein-form-group">
                                <label class="form-label required">Kilometraje actual</label>
                                <input type="number" name="kilometraje" class="form-input" required
                                       placeholder="Ej: 45000" min="0" max="500000">
                                <span class="input-hint">Ingresa el kilometraje en kilómetros</span>
                            </div>

                            <div class="tradein-form-group">
                                <label class="form-label required">Estado general del vehículo</label>
                                <div class="condition-options">
                                    <label class="condition-option">
                                        <input type="radio" name="estado" value="excelente" required>
                                        <span class="condition-card">
                                            <span class="condition-icon">✨</span>
                                            <span class="condition-label">Excelente</span>
                                            <span class="condition-desc">Sin rayones, interior impecable</span>
                                        </span>
                                    </label>
                                    <label class="condition-option">
                                        <input type="radio" name="estado" value="bueno">
                                        <span class="condition-card">
                                            <span class="condition-icon">👍</span>
                                            <span class="condition-label">Bueno</span>
                                            <span class="condition-desc">Desgaste normal por uso</span>
                                        </span>
                                    </label>
                                    <label class="condition-option">
                                        <input type="radio" name="estado" value="regular">
                                        <span class="condition-card">
                                            <span class="condition-icon">🔧</span>
                                            <span class="condition-label">Regular</span>
                                            <span class="condition-desc">Algunos detalles visibles</span>
                                        </span>
                                    </label>
                                    <label class="condition-option">
                                        <input type="radio" name="estado" value="necesita-reparaciones">
                                        <span class="condition-card">
                                            <span class="condition-icon">⚠️</span>
                                            <span class="condition-label">Necesita reparaciones</span>
                                            <span class="condition-desc">Requiere inversión</span>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>

                        <div class="tradein-step" data-step="3">
                            <h3 class="step-title">
                                <span class="step-number">3</span>
                                Resultado estimado
                            </h3>

                            <div class="estimate-result" id="estimateResult">
                                <!-- Se llena dinámicamente -->
                            </div>
                        </div>

                        <div class="tradein-navigation">
                            <button type="button" class="btn-tradein-prev" id="btnPrev" style="display: none;">
                                ← Anterior
                            </button>
                            <button type="button" class="btn-tradein-next" id="btnNext">
                                Siguiente →
                            </button>
                            <button type="button" class="btn-tradein-whatsapp" id="btnWhatsapp" style="display: none;">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                                </svg>
                                Solicitar avalúo oficial
                            </button>
                        </div>
                    </form>
                </div>

                <div class="tradein-modal-footer">
                    <p class="disclaimer">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="16" x2="12" y2="12"/>
                            <line x1="12" y1="8" x2="12.01" y2="8"/>
                        </svg>
                        Este es un valor estimado. El precio final depende de una evaluación presencial del vehículo.
                    </p>
                </div>
            </div>
        `;

        document.body.appendChild(modal);
        this.attachModalEvents(modal);

        requestAnimationFrame(() => {
            modal.classList.add('active');
        });
    }

    // ===== EVENTOS DEL MODAL =====
    attachModalEvents(modal) {
        const closeBtn = modal.querySelector('.tradein-modal-close');
        const btnNext = modal.querySelector('#btnNext');
        const btnPrev = modal.querySelector('#btnPrev');
        const btnWhatsapp = modal.querySelector('#btnWhatsapp');

        let currentStep = 1;
        const totalSteps = 3;

        // Cerrar
        closeBtn.addEventListener('click', () => this.closeModal(modal));
        modal.addEventListener('click', (e) => {
            if (e.target === modal) this.closeModal(modal);
        });

        // Navegación
        btnNext.addEventListener('click', () => {
            if (this.validateStep(currentStep)) {
                if (currentStep < totalSteps) {
                    if (currentStep === 2) {
                        this.calculateEstimate(modal);
                    }
                    currentStep++;
                    this.showStep(modal, currentStep, totalSteps);
                }
            }
        });

        btnPrev.addEventListener('click', () => {
            if (currentStep > 1) {
                currentStep--;
                this.showStep(modal, currentStep, totalSteps);
            }
        });

        btnWhatsapp.addEventListener('click', () => {
            this.sendToWhatsApp(modal);
        });
    }

    showStep(modal, step, total) {
        const steps = modal.querySelectorAll('.tradein-step');
        steps.forEach((s, i) => {
            s.classList.toggle('active', i + 1 === step);
        });

        const btnPrev = modal.querySelector('#btnPrev');
        const btnNext = modal.querySelector('#btnNext');
        const btnWhatsapp = modal.querySelector('#btnWhatsapp');

        btnPrev.style.display = step > 1 ? 'block' : 'none';
        btnNext.style.display = step < total ? 'block' : 'none';
        btnWhatsapp.style.display = step === total ? 'flex' : 'none';
    }

    validateStep(step) {
        const modal = document.getElementById('tradein-modal');
        const form = modal.querySelector('#tradeinForm');

        if (step === 1) {
            const marca = form.querySelector('[name="marca"]').value;
            const modelo = form.querySelector('[name="modelo"]').value;
            const year = form.querySelector('[name="year"]').value;
            const tipo = form.querySelector('[name="tipo"]').value;

            if (!marca || !modelo || !year || !tipo) {
                if (typeof toast !== 'undefined') {
                    toast.warning('Por favor completa todos los campos');
                }
                return false;
            }
        }

        if (step === 2) {
            const km = form.querySelector('[name="kilometraje"]').value;
            const estado = form.querySelector('[name="estado"]:checked');

            if (!km || !estado) {
                if (typeof toast !== 'undefined') {
                    toast.warning('Por favor completa todos los campos');
                }
                return false;
            }
        }

        return true;
    }

    // ===== CALCULAR ESTIMACIÓN =====
    calculateEstimate(modal) {
        const form = modal.querySelector('#tradeinForm');
        const data = {
            marca: form.querySelector('[name="marca"]').value,
            modelo: form.querySelector('[name="modelo"]').value,
            year: parseInt(form.querySelector('[name="year"]').value),
            tipo: form.querySelector('[name="tipo"]').value,
            kilometraje: parseInt(form.querySelector('[name="kilometraje"]').value),
            estado: form.querySelector('[name="estado"]:checked').value
        };

        // Cálculo
        const currentYear = new Date().getFullYear();
        const vehicleAge = currentYear - data.year;

        // Valor base según tipo
        const typeInfo = this.baseValues[data.tipo] || this.baseValues['sedan'];
        let estimatedValue = typeInfo.base;

        // Depreciación por año
        const depreciationFactor = Math.pow(1 - typeInfo.depreciationRate, vehicleAge);
        estimatedValue *= depreciationFactor;

        // Factor de marca
        const brandFactor = this.brandFactors[data.marca.toLowerCase()] || 1.0;
        estimatedValue *= brandFactor;

        // Ajuste por kilometraje
        const expectedKm = vehicleAge * this.idealKmPerYear;
        const kmDifference = data.kilometraje - expectedKm;
        if (kmDifference > 0) {
            const kmPenalty = (kmDifference / 10000) * this.kmPenaltyPer10k;
            estimatedValue *= Math.max(0.7, 1 - kmPenalty);
        } else if (kmDifference < -10000) {
            // Bonus por bajo kilometraje
            estimatedValue *= 1.05;
        }

        // Factor de condición
        const conditionFactor = this.conditionFactors[data.estado] || 1.0;
        estimatedValue *= conditionFactor;

        // Redondear
        estimatedValue = Math.round(estimatedValue / 100000) * 100000;

        // Rango (±10%)
        const minValue = Math.round(estimatedValue * 0.9 / 100000) * 100000;
        const maxValue = Math.round(estimatedValue * 1.1 / 100000) * 100000;

        // Guardar para WhatsApp
        this.lastEstimate = {
            ...data,
            estimatedValue,
            minValue,
            maxValue
        };

        // Mostrar resultado
        this.showResult(modal, data, estimatedValue, minValue, maxValue);
    }

    showResult(modal, data, value, min, max) {
        const resultContainer = modal.querySelector('#estimateResult');

        const formatPrice = (price) => {
            return '$' + price.toLocaleString('es-CO');
        };

        resultContainer.innerHTML = `
            <div class="estimate-vehicle-summary">
                <div class="estimate-vehicle-icon">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                        <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"/>
                        <path d="M5 17h-2v-6l2-5h9l4 5h1a2 2 0 0 1 2 2v4h-2"/>
                        <path d="M9 17h6"/>
                    </svg>
                </div>
                <div class="estimate-vehicle-details">
                    <h4>${data.marca.charAt(0).toUpperCase() + data.marca.slice(1)} ${data.modelo}</h4>
                    <p>${data.year} • ${data.kilometraje.toLocaleString('es-CO')} km • ${this.getConditionLabel(data.estado)}</p>
                </div>
            </div>

            <div class="estimate-value-card">
                <span class="estimate-label">Valor estimado de tu vehículo</span>
                <div class="estimate-range">
                    <span class="estimate-min">${formatPrice(min)}</span>
                    <span class="estimate-separator">-</span>
                    <span class="estimate-max">${formatPrice(max)}</span>
                </div>
                <div class="estimate-main-value">
                    ${formatPrice(value)}
                </div>
            </div>

            <div class="estimate-cta-message">
                <p>¿Te interesa usar este valor como parte de pago para un vehículo nuevo?</p>
                <p class="highlight">Contáctanos para una evaluación presencial y obtener el precio final.</p>
            </div>
        `;
    }

    getConditionLabel(condition) {
        const labels = {
            'excelente': 'Estado excelente',
            'bueno': 'Buen estado',
            'regular': 'Estado regular',
            'necesita-reparaciones': 'Necesita reparaciones'
        };
        return labels[condition] || condition;
    }

    // ===== ENVIAR A WHATSAPP =====
    sendToWhatsApp(modal) {
        if (!this.lastEstimate) return;

        const data = this.lastEstimate;

        let message = `💰 *SOLICITUD DE AVALÚO - ALTORRA CARS*\n\n`;
        message += `*Datos del vehículo:*\n`;
        message += `• Marca: ${data.marca.charAt(0).toUpperCase() + data.marca.slice(1)}\n`;
        message += `• Modelo: ${data.modelo}\n`;
        message += `• Año: ${data.year}\n`;
        message += `• Tipo: ${data.tipo.toUpperCase()}\n`;
        message += `• Kilometraje: ${data.kilometraje.toLocaleString('es-CO')} km\n`;
        message += `• Estado: ${this.getConditionLabel(data.estado)}\n\n`;
        message += `*Valor estimado online:*\n`;
        message += `$${data.minValue.toLocaleString('es-CO')} - $${data.maxValue.toLocaleString('es-CO')}\n\n`;
        message += `Me gustaría agendar una evaluación presencial para conocer el valor exacto de mi vehículo.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsappURL = `https://wa.me/${this.whatsappNumber}?text=${encodedMessage}`;
        window.open(whatsappURL, '_blank');

        this.closeModal(modal);

        if (typeof toast !== 'undefined') {
            toast.success('¡Redirigiendo a WhatsApp!');
        }
    }

    closeModal(modal) {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }

    // ===== EVENT LISTENERS GLOBALES =====
    attachEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.closest('#btn-trade-in-estimate') ||
                e.target.closest('.btn-tradein-open')) {
                this.createModal();
            }
        });
    }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    window.tradeInEstimator = new TradeInEstimator();
});

// ============================================
// CALCULADORA DE FINANCIAMIENTO - ALTORRA CARS
// Simula cuotas mensuales para compra de vehículos
// ============================================

class FinancingCalculator {
    constructor() {
        this.defaultRate = 1.5; // Tasa mensual por defecto (1.5% = 18% anual)
        this.minDownPayment = 10; // Mínimo 10% de cuota inicial
        this.maxDownPayment = 80; // Máximo 80% de cuota inicial
        this.availableTerms = [12, 24, 36, 48, 60, 72]; // Plazos en meses
        this.whatsappNumber = '573235016747';
        this.init();
    }

    init() {
        this.createModal();
        this.attachEventListeners();
    }

    // ===== MODAL =====
    createModal() {
        if (document.getElementById('financing-calculator-modal')) return;

        const modal = document.createElement('div');
        modal.id = 'financing-calculator-modal';
        modal.className = 'financing-modal-overlay';
        modal.innerHTML = `
            <div class="financing-modal" role="dialog" aria-modal="true" aria-labelledby="financing-title">
                <button class="financing-modal-close" aria-label="Cerrar calculadora">&times;</button>

                <div class="financing-header">
                    <div class="financing-icon">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="1" y="4" width="22" height="16" rx="2" ry="2"/>
                            <line x1="1" y1="10" x2="23" y2="10"/>
                        </svg>
                    </div>
                    <h2 id="financing-title">Calculadora de Financiamiento</h2>
                    <p class="financing-subtitle">Simula tu cuota mensual estimada</p>
                </div>

                <div class="financing-body">
                    <!-- Información del vehículo -->
                    <div class="financing-vehicle-info" id="financing-vehicle-info" style="display: none;">
                        <img id="financing-vehicle-img" src="" alt="Vehículo">
                        <div class="financing-vehicle-details">
                            <h3 id="financing-vehicle-name"></h3>
                            <p id="financing-vehicle-price"></p>
                        </div>
                    </div>

                    <!-- Precio del vehículo -->
                    <div class="financing-field">
                        <label for="financing-price">Precio del vehículo</label>
                        <div class="financing-input-group">
                            <span class="financing-currency">$</span>
                            <input type="text" id="financing-price"
                                   inputmode="numeric"
                                   placeholder="75,000,000">
                        </div>
                        <div class="financing-slider-container">
                            <input type="range" id="financing-price-slider"
                                   min="20000000" max="300000000" step="1000000" value="75000000">
                            <div class="financing-slider-labels">
                                <span>$20M</span>
                                <span>$300M</span>
                            </div>
                        </div>
                    </div>

                    <!-- Cuota inicial -->
                    <div class="financing-field">
                        <label for="financing-down-payment">Cuota inicial (<span id="down-payment-percent">30</span>%)</label>
                        <div class="financing-input-group">
                            <span class="financing-currency">$</span>
                            <input type="text" id="financing-down-payment"
                                   inputmode="numeric"
                                   placeholder="22,500,000">
                        </div>
                        <div class="financing-slider-container">
                            <input type="range" id="financing-down-payment-slider"
                                   min="10" max="80" step="5" value="30">
                            <div class="financing-slider-labels">
                                <span>10%</span>
                                <span>80%</span>
                            </div>
                        </div>
                    </div>

                    <!-- Plazo -->
                    <div class="financing-field">
                        <label>Plazo de financiamiento</label>
                        <div class="financing-terms">
                            ${this.availableTerms.map((term, i) => `
                                <button type="button" class="financing-term-btn ${i === 2 ? 'active' : ''}"
                                        data-months="${term}">
                                    ${term} <small>meses</small>
                                </button>
                            `).join('')}
                        </div>
                    </div>

                    <!-- Tasa de interés -->
                    <div class="financing-field financing-rate-field">
                        <label for="financing-rate">Tasa de interés mensual</label>
                        <div class="financing-rate-input">
                            <input type="number" id="financing-rate"
                                   min="0.5" max="3" step="0.1" value="1.5">
                            <span>%</span>
                        </div>
                        <p class="financing-rate-note">Tasa aproximada. Consulta condiciones exactas.</p>
                    </div>
                </div>

                <!-- Resultados -->
                <div class="financing-results">
                    <div class="financing-result-item">
                        <span class="result-label">Monto a financiar</span>
                        <span class="result-value" id="result-amount">$52,500,000</span>
                    </div>
                    <div class="financing-result-item main-result">
                        <span class="result-label">Cuota mensual estimada</span>
                        <span class="result-value" id="result-monthly">$1,543,210</span>
                    </div>
                    <div class="financing-result-item">
                        <span class="result-label">Total a pagar</span>
                        <span class="result-value" id="result-total">$78,123,456</span>
                    </div>
                    <div class="financing-result-item">
                        <span class="result-label">Total intereses</span>
                        <span class="result-value" id="result-interest">$25,623,456</span>
                    </div>
                </div>

                <!-- Gráfico de amortización simplificado -->
                <div class="financing-chart">
                    <div class="chart-bar">
                        <div class="chart-segment capital" id="chart-capital" style="width: 67%;">
                            <span>Capital</span>
                        </div>
                        <div class="chart-segment interest" id="chart-interest" style="width: 33%;">
                            <span>Intereses</span>
                        </div>
                    </div>
                </div>

                <!-- Acciones -->
                <div class="financing-actions">
                    <button type="button" class="btn-financing-whatsapp" id="btn-financing-whatsapp">
                        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        Solicitar financiamiento
                    </button>
                    <button type="button" class="btn-financing-reset" id="btn-financing-reset">
                        Reiniciar
                    </button>
                </div>

                <p class="financing-disclaimer">
                    * Simulación con fines informativos. Las condiciones reales pueden variar según
                    la entidad financiera, historial crediticio y políticas vigentes.
                </p>
            </div>
        `;

        document.body.appendChild(modal);
    }

    // ===== EVENT LISTENERS =====
    attachEventListeners() {
        // Abrir calculadora desde botones
        document.addEventListener('click', (e) => {
            const trigger = e.target.closest('[data-financing]');
            if (trigger) {
                e.preventDefault();
                const vehicleId = trigger.dataset.financing;
                const price = trigger.dataset.price;
                this.open(vehicleId, price);
            }
        });

        // Cerrar modal
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('financing-modal-overlay') ||
                e.target.classList.contains('financing-modal-close')) {
                this.close();
            }
        });

        // ESC para cerrar
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });

        // Sliders y inputs
        document.addEventListener('input', (e) => {
            if (e.target.id === 'financing-price-slider') {
                this.updatePriceFromSlider(e.target.value);
            }
            if (e.target.id === 'financing-down-payment-slider') {
                this.updateDownPaymentFromSlider(e.target.value);
            }
            if (e.target.id === 'financing-price') {
                this.updateSliderFromPrice(e.target.value);
            }
            if (e.target.id === 'financing-down-payment') {
                this.updateSliderFromDownPayment(e.target.value);
            }
            if (e.target.id === 'financing-rate') {
                this.calculate();
            }
        });

        // Botones de plazo
        document.addEventListener('click', (e) => {
            const termBtn = e.target.closest('.financing-term-btn');
            if (termBtn) {
                document.querySelectorAll('.financing-term-btn').forEach(btn =>
                    btn.classList.remove('active'));
                termBtn.classList.add('active');
                this.calculate();
            }
        });

        // WhatsApp
        document.addEventListener('click', (e) => {
            if (e.target.closest('#btn-financing-whatsapp')) {
                this.sendWhatsApp();
            }
        });

        // Reset
        document.addEventListener('click', (e) => {
            if (e.target.closest('#btn-financing-reset')) {
                this.reset();
            }
        });
    }

    // ===== MODAL CONTROL =====
    open(vehicleId = null, price = null) {
        const modal = document.getElementById('financing-calculator-modal');
        if (!modal) return;

        // Si hay vehículo, cargar sus datos
        if (vehicleId && typeof vehicleDB !== 'undefined') {
            this.loadVehicleData(vehicleId);
        } else if (price) {
            this.setPrice(parseFloat(price));
        }

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Focus en el primer input
        setTimeout(() => {
            const priceInput = document.getElementById('financing-price');
            if (priceInput) priceInput.focus();
        }, 100);

        this.calculate();
    }

    close() {
        const modal = document.getElementById('financing-calculator-modal');
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ===== DATA =====
    async loadVehicleData(vehicleId) {
        await vehicleDB.load();
        const vehicle = vehicleDB.getVehicleById(vehicleId);

        if (vehicle) {
            const vehicleInfo = document.getElementById('financing-vehicle-info');
            const vehicleImg = document.getElementById('financing-vehicle-img');
            const vehicleName = document.getElementById('financing-vehicle-name');
            const vehiclePrice = document.getElementById('financing-vehicle-price');

            if (vehicleInfo) vehicleInfo.style.display = 'flex';
            if (vehicleImg) {
                vehicleImg.src = vehicle.imagen;
                vehicleImg.onerror = () => vehicleImg.src = 'multimedia/vehicles/placeholder-car.jpg';
            }
            if (vehicleName) {
                vehicleName.textContent = `${this.capitalize(vehicle.marca)} ${vehicle.modelo} ${vehicle.year}`;
            }
            if (vehiclePrice) {
                vehiclePrice.textContent = this.formatCurrency(vehicle.precioOferta || vehicle.precio);
            }

            this.setPrice(vehicle.precioOferta || vehicle.precio);
            this.currentVehicle = vehicle;
        }
    }

    setPrice(price) {
        const priceInput = document.getElementById('financing-price');
        const priceSlider = document.getElementById('financing-price-slider');

        if (priceInput) {
            priceInput.value = this.formatNumber(price);
        }
        if (priceSlider) {
            priceSlider.value = price;
        }

        this.updateDownPaymentFromSlider(30); // 30% inicial por defecto
        this.calculate();
    }

    // ===== CALCULATIONS =====
    calculate() {
        const price = this.parseNumber(document.getElementById('financing-price')?.value || 0);
        const downPayment = this.parseNumber(document.getElementById('financing-down-payment')?.value || 0);
        const rate = parseFloat(document.getElementById('financing-rate')?.value || this.defaultRate) / 100;
        const termBtn = document.querySelector('.financing-term-btn.active');
        const term = termBtn ? parseInt(termBtn.dataset.months) : 36;

        const financedAmount = price - downPayment;

        if (financedAmount <= 0 || term <= 0) {
            this.updateResults(0, 0, 0, 0);
            return;
        }

        // Fórmula de cuota fija (sistema francés)
        // M = P * [r(1+r)^n] / [(1+r)^n - 1]
        const monthlyPayment = financedAmount * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
        const totalPayment = monthlyPayment * term;
        const totalInterest = totalPayment - financedAmount;

        this.updateResults(financedAmount, monthlyPayment, totalPayment, totalInterest);
    }

    updateResults(amount, monthly, total, interest) {
        const resultAmount = document.getElementById('result-amount');
        const resultMonthly = document.getElementById('result-monthly');
        const resultTotal = document.getElementById('result-total');
        const resultInterest = document.getElementById('result-interest');
        const chartCapital = document.getElementById('chart-capital');
        const chartInterest = document.getElementById('chart-interest');

        if (resultAmount) resultAmount.textContent = this.formatCurrency(amount);
        if (resultMonthly) resultMonthly.textContent = this.formatCurrency(monthly);
        if (resultTotal) resultTotal.textContent = this.formatCurrency(total);
        if (resultInterest) resultInterest.textContent = this.formatCurrency(interest);

        // Actualizar gráfico
        if (total > 0 && chartCapital && chartInterest) {
            const capitalPercent = (amount / total) * 100;
            const interestPercent = 100 - capitalPercent;
            chartCapital.style.width = `${capitalPercent}%`;
            chartInterest.style.width = `${interestPercent}%`;
        }
    }

    // ===== UI UPDATES =====
    updatePriceFromSlider(value) {
        const priceInput = document.getElementById('financing-price');
        if (priceInput) {
            priceInput.value = this.formatNumber(parseInt(value));
        }
        this.updateDownPaymentFromSlider(
            parseInt(document.getElementById('financing-down-payment-slider')?.value || 30)
        );
        this.calculate();
    }

    updateSliderFromPrice(value) {
        const price = this.parseNumber(value);
        const slider = document.getElementById('financing-price-slider');
        if (slider && price >= 20000000 && price <= 300000000) {
            slider.value = price;
        }
        this.updateDownPaymentFromSlider(
            parseInt(document.getElementById('financing-down-payment-slider')?.value || 30)
        );
        this.calculate();
    }

    updateDownPaymentFromSlider(percent) {
        const price = this.parseNumber(document.getElementById('financing-price')?.value || 0);
        const downPayment = Math.round(price * (percent / 100));
        const downPaymentInput = document.getElementById('financing-down-payment');
        const downPaymentSlider = document.getElementById('financing-down-payment-slider');
        const percentLabel = document.getElementById('down-payment-percent');

        if (downPaymentInput) downPaymentInput.value = this.formatNumber(downPayment);
        if (downPaymentSlider) downPaymentSlider.value = percent;
        if (percentLabel) percentLabel.textContent = percent;

        this.calculate();
    }

    updateSliderFromDownPayment(value) {
        const price = this.parseNumber(document.getElementById('financing-price')?.value || 0);
        const downPayment = this.parseNumber(value);

        if (price > 0) {
            let percent = Math.round((downPayment / price) * 100);
            percent = Math.max(this.minDownPayment, Math.min(this.maxDownPayment, percent));

            const slider = document.getElementById('financing-down-payment-slider');
            const percentLabel = document.getElementById('down-payment-percent');

            if (slider) slider.value = percent;
            if (percentLabel) percentLabel.textContent = percent;
        }

        this.calculate();
    }

    reset() {
        document.getElementById('financing-price').value = this.formatNumber(75000000);
        document.getElementById('financing-price-slider').value = 75000000;
        document.getElementById('financing-down-payment-slider').value = 30;
        document.getElementById('financing-rate').value = 1.5;

        document.querySelectorAll('.financing-term-btn').forEach((btn, i) => {
            btn.classList.toggle('active', i === 2); // 36 meses por defecto
        });

        const vehicleInfo = document.getElementById('financing-vehicle-info');
        if (vehicleInfo) vehicleInfo.style.display = 'none';

        this.currentVehicle = null;
        this.updateDownPaymentFromSlider(30);
        this.calculate();
    }

    // ===== WHATSAPP =====
    sendWhatsApp() {
        const price = this.parseNumber(document.getElementById('financing-price')?.value || 0);
        const downPayment = this.parseNumber(document.getElementById('financing-down-payment')?.value || 0);
        const termBtn = document.querySelector('.financing-term-btn.active');
        const term = termBtn ? termBtn.dataset.months : 36;
        const monthly = document.getElementById('result-monthly')?.textContent || '';

        let vehicleInfo = '';
        if (this.currentVehicle) {
            vehicleInfo = `
🚗 *Vehículo de interés*:
${this.capitalize(this.currentVehicle.marca)} ${this.currentVehicle.modelo} ${this.currentVehicle.year}
`;
        }

        const message = `💰 *SOLICITUD DE FINANCIAMIENTO*

${vehicleInfo}
📊 *Simulación realizada*:
- Precio del vehículo: ${this.formatCurrency(price)}
- Cuota inicial: ${this.formatCurrency(downPayment)}
- Plazo: ${term} meses
- *Cuota mensual estimada*: ${monthly}

Me gustaría recibir información sobre opciones de financiamiento.

---
Simulación desde altorracars.github.io`;

        const url = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');

        if (typeof toast !== 'undefined') {
            toast.success('Te redirigimos a WhatsApp', 'Solicitud enviada');
        }

        this.close();
    }

    // ===== UTILITIES =====
    formatCurrency(amount) {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }

    formatNumber(num) {
        return new Intl.NumberFormat('es-CO').format(num);
    }

    parseNumber(str) {
        if (typeof str === 'number') return str;
        return parseInt(String(str).replace(/[^\d]/g, '')) || 0;
    }

    capitalize(str) {
        if (!str) return '';
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Crear instancia global
const financingCalculator = new FinancingCalculator();

// Disponible globalmente
if (typeof window !== 'undefined') {
    window.financingCalculator = financingCalculator;
}

// ============================================
// SISTEMA DE CONSENTIMIENTO DE COOKIES - ALTORRA CARS
// ============================================

class CookieConsent {
    constructor() {
        this.cookieName = 'altorra_cookie_consent';
        this.consentGiven = this.getConsent();
        this.init();
    }

    init() {
        // Si no hay consentimiento previo, mostrar banner
        if (!this.consentGiven) {
            this.createBanner();
            // Mostrar banner con delay para mejor UX
            setTimeout(() => {
                const banner = document.getElementById('cookie-banner');
                if (banner) banner.classList.add('active');
            }, 1000);
        }
    }

    getConsent() {
        const consent = localStorage.getItem(this.cookieName);
        return consent ? JSON.parse(consent) : null;
    }

    setConsent(preferences) {
        const consentData = {
            timestamp: new Date().toISOString(),
            preferences: preferences
        };
        localStorage.setItem(this.cookieName, JSON.stringify(consentData));
        this.consentGiven = consentData;
    }

    createBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-banner';
        banner.className = 'cookie-banner';

        banner.innerHTML = `
            <div class="cookie-banner-content">
                <div class="cookie-banner-text">
                    <h4>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                        </svg>
                        Uso de Cookies
                    </h4>
                    <p>
                        Utilizamos cookies para mejorar tu experiencia de navegacion, mostrar contenido personalizado
                        y analizar el trafico del sitio. Al hacer clic en "Aceptar", consientes el uso de todas las cookies.
                    </p>
                </div>
                <div class="cookie-banner-actions">
                    <button type="button" class="cookie-btn cookie-btn-reject" id="cookie-reject">
                        Rechazar
                    </button>
                    <button type="button" class="cookie-btn cookie-btn-accept" id="cookie-accept">
                        Aceptar
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(banner);
        this.attachBannerEvents();
    }

    attachBannerEvents() {
        const acceptBtn = document.getElementById('cookie-accept');
        const rejectBtn = document.getElementById('cookie-reject');

        if (acceptBtn) {
            acceptBtn.addEventListener('click', () => this.acceptAll());
        }

        if (rejectBtn) {
            rejectBtn.addEventListener('click', () => this.rejectAll());
        }
    }

    acceptAll() {
        this.setConsent({
            necessary: true,
            analytics: true,
            marketing: true
        });
        this.closeBanner();

        if (typeof toast !== 'undefined') {
            toast.success('Preferencias de cookies guardadas');
        }
    }

    rejectAll() {
        this.setConsent({
            necessary: true,
            analytics: false,
            marketing: false
        });
        this.closeBanner();

        if (typeof toast !== 'undefined') {
            toast.info('Solo se usaran cookies necesarias');
        }
    }

    closeBanner() {
        const banner = document.getElementById('cookie-banner');
        if (banner) {
            banner.classList.remove('active');
            setTimeout(() => banner.remove(), 400);
        }
    }

    // Verificar si una categoria de cookies esta permitida
    isAllowed(category) {
        if (!this.consentGiven) return false;
        return this.consentGiven.preferences[category] === true;
    }

    // Resetear consentimiento (util para testing o si el usuario quiere cambiar)
    resetConsent() {
        localStorage.removeItem(this.cookieName);
        this.consentGiven = null;
        location.reload();
    }
}

// Inicializar cuando el DOM este listo
document.addEventListener('DOMContentLoaded', () => {
    window.cookieConsent = new CookieConsent();
});

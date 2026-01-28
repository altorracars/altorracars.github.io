// ============================================
// THEME TOGGLE - ALTORRA CARS
// Cambio entre modo claro y oscuro
// ============================================

class ThemeToggle {
    constructor() {
        this.storageKey = 'altorra_theme';
        this.darkClass = 'dark-theme';
        this.currentTheme = 'light';
        this.init();
    }

    init() {
        this.loadTheme();
        this.createToggleButton();
        this.attachEventListeners();
    }

    // ===== THEME MANAGEMENT =====
    loadTheme() {
        // Prioridad: localStorage > preferencia del sistema
        const stored = localStorage.getItem(this.storageKey);

        if (stored) {
            this.currentTheme = stored;
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            this.currentTheme = 'dark';
        }

        this.applyTheme();
    }

    applyTheme() {
        if (this.currentTheme === 'dark') {
            document.documentElement.classList.add(this.darkClass);
            document.body.classList.add(this.darkClass);
        } else {
            document.documentElement.classList.remove(this.darkClass);
            document.body.classList.remove(this.darkClass);
        }

        this.updateButton();
        this.updateMetaThemeColor();
    }

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        localStorage.setItem(this.storageKey, this.currentTheme);
        this.applyTheme();

        // Notificación
        if (typeof toast !== 'undefined') {
            const message = this.currentTheme === 'dark'
                ? 'Modo oscuro activado'
                : 'Modo claro activado';
            toast.info(message);
        }
    }

    updateMetaThemeColor() {
        const metaTheme = document.querySelector('meta[name="theme-color"]');
        if (metaTheme) {
            metaTheme.content = this.currentTheme === 'dark' ? '#1f2937' : '#b89658';
        }
    }

    // ===== BUTTON =====
    createToggleButton() {
        // Esperar a que el header esté cargado
        const checkHeader = setInterval(() => {
            const header = document.querySelector('.header-nav') || document.querySelector('header nav');
            const existingButton = document.getElementById('theme-toggle-btn');

            if (existingButton) {
                clearInterval(checkHeader);
                return;
            }

            if (header) {
                clearInterval(checkHeader);
                this.insertButton();
            }
        }, 100);

        // Timeout después de 5 segundos
        setTimeout(() => clearInterval(checkHeader), 5000);
    }

    insertButton() {
        // Buscar el mejor lugar para insertar el botón
        const navActions = document.querySelector('.nav-actions') ||
                          document.querySelector('.header-actions') ||
                          document.querySelector('header nav');

        if (!navActions) return;

        const button = document.createElement('button');
        button.id = 'theme-toggle-btn';
        button.className = 'theme-toggle-btn';
        button.setAttribute('aria-label', 'Cambiar tema');
        button.setAttribute('title', 'Cambiar tema claro/oscuro');
        button.innerHTML = this.getButtonIcon();

        // Insertar antes del primer elemento si es posible
        const firstChild = navActions.querySelector('.nav-favorites, .favorite-counter, a');
        if (firstChild) {
            navActions.insertBefore(button, firstChild);
        } else {
            navActions.appendChild(button);
        }
    }

    getButtonIcon() {
        if (this.currentTheme === 'dark') {
            // Icono de sol (para cambiar a modo claro)
            return `
                <svg class="theme-icon sun" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                </svg>
            `;
        } else {
            // Icono de luna (para cambiar a modo oscuro)
            return `
                <svg class="theme-icon moon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                </svg>
            `;
        }
    }

    updateButton() {
        const button = document.getElementById('theme-toggle-btn');
        if (button) {
            button.innerHTML = this.getButtonIcon();
            button.classList.toggle('dark-active', this.currentTheme === 'dark');
        }
    }

    // ===== EVENT LISTENERS =====
    attachEventListeners() {
        // Click en el botón
        document.addEventListener('click', (e) => {
            if (e.target.closest('#theme-toggle-btn')) {
                this.toggleTheme();
            }
        });

        // Escuchar cambios en preferencia del sistema
        if (window.matchMedia) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // Solo cambiar si no hay preferencia guardada
                if (!localStorage.getItem(this.storageKey)) {
                    this.currentTheme = e.matches ? 'dark' : 'light';
                    this.applyTheme();
                }
            });
        }

        // Atajo de teclado (Ctrl/Cmd + Shift + D)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'D') {
                e.preventDefault();
                this.toggleTheme();
            }
        });
    }

    // ===== PUBLIC API =====
    isDark() {
        return this.currentTheme === 'dark';
    }

    setTheme(theme) {
        if (theme === 'dark' || theme === 'light') {
            this.currentTheme = theme;
            localStorage.setItem(this.storageKey, theme);
            this.applyTheme();
        }
    }
}

// Crear instancia global
const themeToggle = new ThemeToggle();

// Disponible globalmente
if (typeof window !== 'undefined') {
    window.themeToggle = themeToggle;
}

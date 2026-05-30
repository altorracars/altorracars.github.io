/* ============================================================
 * ALTORRA CARS · home-chrome.js — Nav chrome del index cinematic
 * ------------------------------------------------------------
 * PORT vanilla (ES5-style, IIFE) del Nav de
 *   altorra-cars-design-system/project/redesign/components.jsx (L44-256).
 *
 * Responsabilidades (SOLO el chrome — la data de secciones, carruseles,
 * motions y QuickTools llegan en tasks posteriores):
 *   1. Máquina de scroll de 3 estados (hide-on-scroll) — port 1:1 del
 *      useEffect L53-147: TOP_ZONE 80 / COLLAPSE_AT 240 / GONE_AT 520 /
 *      UP_TO_REOPEN 24 / DELTA 2 / WHEEL_DUR 900. rAF-throttled. Aplica
 *      las clases `scrolled` / `alt-nav--wheel` / `alt-nav--gone` al
 *      <header class="alt-nav" id="header">. SIN MutationObserver global
 *      (doctrina §35); SOLO transform/opacity (transiciones ya en
 *      css/home/chrome-redesign.css).
 *   2. Mega-dropdown "Vehículos" (abre por hover + click, como el diseño)
 *      y drawer móvil (hamburguesa abre; links/cierre/backdrop cierran).
 *      Dropdown/drawer abiertos fuerzan la barra expandida (showForced del
 *      JSX L145): cancelan el colapso/gone.
 *   3. Wiring a sistemas EXISTENTES (no se re-bindea lo que ya está atado):
 *        - "Ingresar" (#btnLogin) → lo auto-cablea js/core/auth.js
 *          (updateHeaderAuthState → rewireBtn). Aquí NO se re-bindea para
 *          evitar doble-binding; solo se documenta.
 *        - "Publica tu vehículo" (<a data-modal="vende-auto">) → lo maneja
 *          js/public/contact-forms.js por delegación de eventos en document.
 *          Tampoco se re-bindea.
 *        - El pip de favoritos (#favCount / #favCountMobile) lo alimenta
 *          window.favoritesManager.updateAllCounters().
 *   4. Compat hook: re-apunta favoritesManager._forceShowHeader() para que,
 *      además de quitar `.header--hidden` (clase del nav viejo que esta
 *      máquina NO usa), revele el nav nuevo (cancela wheel/gone). Así el
 *      flujo de "inicia sesión para guardar favoritos" sigue mostrando el
 *      botón Ingresar aunque el nav esté oculto. Wrapper aditivo, sin
 *      MutationObserver.
 *
 * Se monta en DOMContentLoaded o en el evento 'altorra:chrome:ready' (SP-5.1
 * legacy pages). Idempotente vía flag — init() es el punto de entrada único.
 * ============================================================ */
(function () {
    'use strict';

    // SP-5.1: idempotencia centralizada en init() — no se necesita guard a nivel
    // IIFE. Si el archivo se evaluara dos veces (raro), init()'s own __altorraHomeChromeMounted
    // check maneja la deduplicación.

    // ── Refs (se resuelven en init, cuando el DOM está listo) ──
    var header = null;
    var ddWrap = null;          // .nav-dd-wrap (contenedor del mega-dropdown)
    var ddTrigger = null;       // botón "Vehículos"
    var ddPanel = null;         // .nav-dd (panel acrílico)
    var ddChev = null;          // .nav-chev (flecha)
    var drawer = null;          // .mob-drawer (#navMobDrawer)
    var drawerOpenBtn = null;   // hamburguesa (#navMobOpen)
    var drawerCloseBtn = null;  // botón X (#navMobClose)

    // ── Estado de los menús (alimenta el "showForced" del JSX) ──
    var vehDDOpen = false;
    var mobileOpen = false;

    // ============================================================
    // 1 · MÁQUINA DE SCROLL DE 3 ESTADOS (port de components.jsx L53-147)
    // ============================================================
    // Respeta transiciones en vuelo: mientras un timer está agendado NO se
    // re-agenda. La duración visual la posee el CSS, así se siente idéntica
    // en cualquier punto de la página.
    var TOP_ZONE = 80;
    var COLLAPSE_AT = 240;
    var GONE_AT = 520;
    var UP_TO_REOPEN = 24;
    var DELTA = 2;
    var WHEEL_DUR = 900;

    var ticking = false;
    var lastY = 0;
    var upAccum = 0;
    var goneTimer = null;
    var revealTimer = null;

    // Estado "deseado" de la máquina (collapsed/gone), independiente del
    // "forzado" por menús abiertos. Igual que el JSX: collapsed/gone son
    // estado puro; isCollapsed/isGone aplican el showForced al renderizar.
    var stateCollapsed = false;
    var stateGone = false;
    var stateScrolled = false;

    function showForced() {
        // Force-expand SOLO cuando un dropdown / drawer está abierto (NO hover).
        // (JSX L145: const showForced = vehDD || moreDD || mobileOpen)
        return vehDDOpen || mobileOpen;
    }

    // Aplica al <header> las clases derivadas del estado + showForced.
    // (JSX L160: className=`alt-nav ${scrolled?'scrolled':''}
    //   ${isCollapsed?'alt-nav--wheel':''} ${isGone?'alt-nav--gone':''}`)
    function render() {
        if (!header) return;
        var forced = showForced();
        var isCollapsed = stateCollapsed && !forced;
        var isGone = stateGone && !forced;
        header.classList.toggle('scrolled', stateScrolled);
        header.classList.toggle('alt-nav--wheel', isCollapsed);
        header.classList.toggle('alt-nav--gone', isGone);
        // aria-expanded refleja si la barra está expandida (JSX L162)
        header.setAttribute('aria-expanded', String(!isCollapsed));
    }

    function setC(v) { if (stateCollapsed !== v) { stateCollapsed = v; render(); } }
    function setG(v) { if (stateGone !== v) { stateGone = v; render(); } }
    function setScrolled(v) { if (stateScrolled !== v) { stateScrolled = v; render(); } }

    function cancelReveal() { if (revealTimer) { clearTimeout(revealTimer); revealTimer = null; } }
    function cancelGone() { if (goneTimer) { clearTimeout(goneTimer); goneTimer = null; } }

    function wantCollapseStay() {
        // Rueda visible, no gone. Cancela cualquier reveal pendiente.
        cancelReveal();
        cancelGone();
        setG(false);
        setC(true);
    }

    function wantGone() {
        // Rueda primero, luego fade. Agenda una sola vez.
        cancelReveal();
        setC(true);
        if (!stateGone && !goneTimer) {
            goneTimer = setTimeout(function () { goneTimer = null; setG(true); }, WHEEL_DUR);
        }
    }

    function wantReveal() {
        // Trae la rueda de vuelta si estaba gone, luego expande la barra.
        cancelGone();
        if (stateGone) {
            setG(false);
            if (!revealTimer) {
                revealTimer = setTimeout(function () { revealTimer = null; setC(false); }, WHEEL_DUR);
            }
        } else {
            // Ya estaba en modo rueda — expande directo.
            cancelReveal();
            setC(false);
        }
    }

    function wantTop() {
        cancelReveal();
        cancelGone();
        setG(false);
        setC(false);
    }

    function onScroll() {
        if (ticking) return;
        ticking = true;
        window.requestAnimationFrame(function () {
            var y = window.scrollY || window.pageYOffset || 0;
            var dy = y - lastY;
            setScrolled(y > 24);
            if (y <= TOP_ZONE) {
                wantTop();
                upAccum = 0;
            } else if (dy < -DELTA) {
                upAccum += -dy;
                if (upAccum >= UP_TO_REOPEN) { wantReveal(); upAccum = 0; }
            } else if (dy > DELTA) {
                upAccum = 0;
                if (y >= GONE_AT) wantGone();
                else if (y >= COLLAPSE_AT) wantCollapseStay();
            }
            lastY = y;
            ticking = false;
        });
    }

    // ============================================================
    // 2 · MEGA-DROPDOWN "Vehículos"
    // ============================================================
    function openDropdown() {
        if (vehDDOpen) return;
        vehDDOpen = true;
        if (ddPanel) ddPanel.hidden = false;
        if (ddTrigger) {
            ddTrigger.classList.add('open');
            ddTrigger.setAttribute('aria-expanded', 'true');
        }
        if (ddChev) ddChev.classList.add('flip');
        render(); // showForced → cancela colapso/gone
    }

    function closeDropdown() {
        if (!vehDDOpen) return;
        vehDDOpen = false;
        if (ddPanel) ddPanel.hidden = true;
        if (ddTrigger) {
            ddTrigger.classList.remove('open');
            ddTrigger.setAttribute('aria-expanded', 'false');
        }
        if (ddChev) ddChev.classList.remove('flip');
        render();
    }

    function toggleDropdown() {
        if (vehDDOpen) closeDropdown(); else openDropdown();
    }

    function wireDropdown() {
        if (!ddWrap || !ddTrigger) return;

        // Hover (desktop) — replica onMouseEnter/onMouseLeave del JSX L181.
        // El ::after de .nav-dd-wrap (CSS) cubre el gap para que el hover
        // no se pierda entre el botón y el panel.
        ddWrap.addEventListener('mouseenter', openDropdown);
        ddWrap.addEventListener('mouseleave', closeDropdown);

        // Click en el trigger (toggle). Útil en táctil y como refuerzo
        // accesible. Evita que el click se propague al header (que en
        // modo rueda expande la barra).
        ddTrigger.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            toggleDropdown();
        });

        // Cerrar al hacer click fuera del wrap.
        document.addEventListener('click', function (e) {
            if (!vehDDOpen) return;
            if (ddWrap.contains(e.target)) return;
            closeDropdown();
        });

        // Cerrar con Escape.
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && vehDDOpen) closeDropdown();
        });

        // Los links del dropdown navegan a páginas reales (href en el HTML):
        // al hacer click cerramos el panel para no dejarlo abierto durante
        // la (posible) transición de salida.
        var ddLinks = ddPanel ? ddPanel.querySelectorAll('a[href]') : [];
        for (var i = 0; i < ddLinks.length; i++) {
            ddLinks[i].addEventListener('click', function () { closeDropdown(); });
        }
    }

    // ============================================================
    // 3 · DRAWER MÓVIL
    // ============================================================
    function openDrawer() {
        if (mobileOpen || !drawer) return;
        mobileOpen = true;
        // display es el mecanismo autoritativo: .mob-drawer{display:flex}
        // (CSS) vence al atributo [hidden], así que alternamos display.
        // Mantenemos el atributo hidden en sync por semántica/accesibilidad.
        drawer.hidden = false;
        drawer.style.display = '';
        // Scroll-lock propio (NO tocamos body.position:fixed como el nav
        // viejo, para no pelear con su CSS ni perder el scroll). overflow
        // hidden basta y es reversible.
        document.body.style.overflow = 'hidden';
        render(); // showForced → barra expandida bajo el drawer
    }

    function closeDrawer() {
        if (!mobileOpen) return;
        mobileOpen = false;
        if (drawer) {
            drawer.hidden = true;
            drawer.style.display = 'none';
        }
        document.body.style.overflow = '';
        render();
    }

    function wireDrawer() {
        if (!drawer || !drawerOpenBtn) return;

        drawerOpenBtn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();
            openDrawer();
        });

        if (drawerCloseBtn) {
            drawerCloseBtn.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                closeDrawer();
            });
        }

        // Click en el backdrop (el propio .mob-drawer, fuera del .mob-panel)
        // cierra — replica onClick del overlay en JSX L237.
        drawer.addEventListener('click', function (e) {
            if (e.target === drawer) closeDrawer();
        });

        // Cualquier link del drawer cierra al navegar (JSX L245
        // onClick={()=>{navigate(id);setMobileOpen(false);}}).
        var links = drawer.querySelectorAll('a[href], .mob-link');
        for (var i = 0; i < links.length; i++) {
            links[i].addEventListener('click', function () { closeDrawer(); });
        }

        // Escape cierra el drawer.
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && mobileOpen) closeDrawer();
        });

        // Si se pasa a desktop con el drawer abierto, ciérralo (evita
        // quedar con overflow:hidden bloqueado al ensanchar la ventana).
        var resizeTimer = null;
        window.addEventListener('resize', function () {
            if (resizeTimer) clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function () {
                if (mobileOpen && window.innerWidth > 1024) closeDrawer();
            }, 200);
        });
    }

    // ============================================================
    // 4 · CLICK EN LA BARRA EN MODO RUEDA → EXPANDIR
    //     (JSX L161: onClick del header — si isCollapsed, expande)
    // ============================================================
    function wireHeaderClickToExpand() {
        if (!header) return;
        header.addEventListener('click', function (e) {
            // Solo cuando está colapsado en rueda (no gone, no expandido).
            if (stateCollapsed && !showForced()) {
                // No interferir con clicks en controles interactivos reales.
                wantTop();
                e.stopPropagation();
            }
        });
    }

    // ============================================================
    // 5 · COMPAT: re-apuntar favoritesManager._forceShowHeader()
    // ============================================================
    // El nav viejo se ocultaba con `.header--hidden`; favorites-manager.js
    // (_forceShowHeader, _promptLogin, _showSpotlight) quita esa clase para
    // revelar el header antes de hacer spotlight sobre #btnLogin. El nav
    // nuevo NO usa `.header--hidden` sino `.alt-nav--wheel`/`.alt-nav--gone`,
    // así que sin este shim el botón Ingresar quedaría invisible al pedir
    // login. Envolvemos el método (aditivo) para que también revele el nav
    // nuevo. Sin MutationObserver (doctrina §35).
    function wireFavoritesForceShowCompat() {
        function patch(fm) {
            if (!fm || fm.__altorraChromePatched) return false;
            var original = fm._forceShowHeader;
            fm._forceShowHeader = function () {
                // Revela el nav nuevo (cancela rueda/gone) además de lo que
                // hiciera el original (quitar .header--hidden + scroll-up).
                revealNow();
                if (typeof original === 'function') {
                    try { return original.apply(fm, arguments); } catch (e) { /* defensivo */ }
                }
            };
            fm.__altorraChromePatched = true;
            return true;
        }
        // favorites-manager.js carga con `defer`; puede no estar listo aún.
        if (patch(window.favoritesManager)) return;
        // Poll corto y acotado (no infinito) hasta que exista el singleton.
        var tries = 0;
        var iv = setInterval(function () {
            tries++;
            if (patch(window.favoritesManager) || tries > 60) clearInterval(iv);
        }, 100);
    }

    // Revela el nav inmediatamente, llevándolo a estado top expandido.
    function revealNow() {
        cancelReveal();
        cancelGone();
        setG(false);
        setC(false);
    }

    // ============================================================
    // 6 · PIP DE FAVORITOS DEL DRAWER (#favCountMobile) — visibilidad
    // ============================================================
    // favorites-manager.updateAllCounters() escribe el textContent de
    // #favCountMobile (la lista de IDs incluye 'favCountMobile'), pero NO
    // gestiona su visibilidad. El diseño pide "oculto hasta count>0", así
    // que aquí lo mostramos/ocultamos según el conteo. Event-driven vía el
    // CustomEvent 'favoritesChanged' que el manager ya dispara (sin polling
    // ni MutationObserver).
    function syncMobileFavPip() {
        var pip = document.getElementById('favCountMobile');
        if (!pip) return;
        var count = 0;
        if (window.favoritesManager && typeof window.favoritesManager.count === 'function') {
            count = window.favoritesManager.count();
        } else {
            // Fallback: leer el textContent ya pintado por updateAllCounters.
            var n = parseInt(pip.textContent, 10);
            count = isNaN(n) ? 0 : n;
        }
        pip.style.display = count > 0 ? '' : 'none';
    }

    function wireMobileFavPip() {
        // Estado inicial (favoritos eager-hidratados desde localStorage ya
        // pudieron disparar el contador antes de que montemos).
        syncMobileFavPip();
        window.addEventListener('favoritesChanged', syncMobileFavPip);
    }

    // ============================================================
    // INIT
    // ============================================================
    function init() {
        if (window.__altorraHomeChromeMounted) return;
        header = document.getElementById('header');
        if (!header || header.className.indexOf('alt-nav') === -1) {
            // Esta página no usa el nav cinematic — no hacemos nada.
            // SP-5.1: no seteamos el flag aún; podría llamarse de nuevo cuando el DOM esté listo.
            return;
        }
        window.__altorraHomeChromeMounted = true; // SP-5.1: mover aquí para que init sea idempotente por sí sola.

        ddWrap = header.querySelector('.nav-dd-wrap');
        if (ddWrap) {
            ddTrigger = ddWrap.querySelector('.nav-link');
            ddPanel = ddWrap.querySelector('.nav-dd');
            ddChev = ddWrap.querySelector('.nav-chev');
        }
        drawer = document.getElementById('navMobDrawer');
        drawerOpenBtn = document.getElementById('navMobOpen');
        drawerCloseBtn = document.getElementById('navMobClose');

        // Estado inicial de scroll (JSX L136: onScroll() se llama una vez).
        lastY = window.scrollY || window.pageYOffset || 0;
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });

        wireDropdown();
        wireDrawer();
        wireHeaderClickToExpand();
        wireFavoritesForceShowCompat();
        wireMobileFavPip();

        // API pública mínima (para otros módulos del home que quieran forzar
        // la revelación del nav, ej. al abrir un overlay).
        window.AltorraHomeChrome = {
            reveal: revealNow,
            closeDropdown: closeDropdown,
            closeDrawer: closeDrawer
        };
    }

    // SP-5.1: en páginas legacy, el chrome se inyecta via components.js DESPUÉS
    // de DOMContentLoaded. Listener adicional para que init() se active cuando
    // components.js avise. Primer fire gana (init es idempotente via flag).
    document.addEventListener('altorra:chrome:ready', init);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

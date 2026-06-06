# Altorra CRM · Bandeja Inteligente (app admin greenfield · Fase 2)

App admin **nueva e independiente** que corre **en paralelo** al `admin.html`
viejo. Lee el **modelo canónico** que la Fase 1 ya archiva (`leads` / `contacts`
/ `activities`) y lo presenta como una **Bandeja Inteligente**: ordenada por
urgencia, con score/temperatura confiable, NBA y acciones de 1 clic — sin
depender de ALTOR ni de ningún LLM (motor heurístico **determinista**).

> Diseño: `docs/superpowers/specs/2026-06-05-crm-fase2-bandeja-design.md`
> Blueprint maestro: `docs/superpowers/specs/2026-06-05-crm-rebuild-design.md`

## Stack
- **Vite** (bundler + cache-busting por hash → sin ritual `CACHE_VERSION` aquí).
- **Firebase modular SDK 11.3.0** (tree-shake), app namespaced `altorra-crm`.
- Vanilla JS por capas (`datos` / `dominio` / `ui`) + design-system HarmonyOS.

## Comandos
```bash
cd admin-app
npm install
npm run dev      # servidor local (http://localhost:5174)
npm run build    # genera dist/  (artefacto que sirve GitHub Pages)
npm run preview  # sirve dist/ localmente
```

## Modo demo (sin Firebase)
Firebase Auth bloquea `localhost` por referrer (lección L-08), así que para
verificar la UID sin backend:
```
http://localhost:5174/?mock=1
```
Carga ~10 leads de muestra (todos los canales/tipos/estados) y ejercita
colas, filtros, búsqueda, acciones, score, NBA y el Customer 360.

## Estructura
```
src/
  core/            firebase · auth · store · router · theme · toast · popover · dom
    design-system/ tokens(HarmonyOS) · base · components
    layout/        shell · login
  domain/          PURO, sin DOM/Firestore: format · classify · scoring(7) · nba(10)
  modules/
    inbox/         (datos|dominio|ui)  LA BANDEJA
    contacts/      (datos|ui)          Customer 360
  styles/          shell · login · inbox · contacts
```

## Seguridad
Réplica del modelo LIVE: identidad admin por lookup a `usuarios/{uid}`
(rol + `permissions[]`), **no** custom claims (el backend aún no los setea;
claims = Fase 5 endurecimiento). Lectura del canónico requiere sesión; escritura
requiere `super_admin` o `crm.edit` (reglas Fase 1).

## Deploy (run paralelo, $0)
GitHub Pages sirve la raíz de `main`. Esta app vive en `admin-app/dist/` →
accesible en `https://altorracars.github.io/admin-app/dist/`. El deploy = commit
+ push de `dist/` (lo ejecuta Claude). El sitio público no se toca. Cutover a la
ruta final cuando alcance paridad con el admin viejo.

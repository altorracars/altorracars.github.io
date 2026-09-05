# CLAUDE.md — altorracars · 🌉 PUENTE (este repo es el SITIO, no el cerebro)

## Tu cerebro NO está aquí

Este repo es **solo el sitio** (ALTORRA Cars). Tu memoria vive en `../brain-private/altorracars/`: `CLAUDE.md` (el router), `docs/05-ESTADO-GLOBAL.md`,
`docs/10-MEMORIA-CORTO-PLAZO.md` y las demás.

El hook de arranque te los **imprime enteros** (busca «EL CEREBRO DE ESTE PROYECTO VIVE EN OTRA
CARPETA»). **Si no los ves, el hook falló: LÉELOS POR RUTA antes de tocar nada** — router, `05`, `10`.

## Dónde va cada commit

- Cerebro (`docs/`, router, ADRs) → **en la bóveda** `../brain-private/`; su pre-commit corre el linter allí.
  Aquí no hay linter.
- Sitio (web, `admin-app/`, `functions/`) → **aquí**, en `dev`; `dev`→`main` al cerrar trabajo
  verificado (push a `main` = deploy). Nunca los dos en el mismo commit.

## Reglas de oro DE ESTE SITIO

- User-site `altorracars.github.io`, sin CNAME. **NO borres `_config.yml`** ni pongas `.nojekyll` (Jekyll
  con `exclude`, E-00). El CI regenera `vehiculos/` cada 4 h (`scripts/generate-vehicles.mjs`).
- Cache: bump `CACHE_VERSION` (`service-worker.js`) + `APP_VERSION` (`js/core/cache-manager.js`);
  la vigente vive en el `05`. Deploys Firebase: los hace Claude, nunca el dueño.
- `git add` específico, jamás `-A`. **NUNCA** `--amend`, `--no-verify` ni push forzado. **JAMÁS**
  secretos: repo PÚBLICO (`secretos.yml` lo escanea en CI).

*(Puente F8 · kernel en `../brain-private/kernel/`, vía los hooks de `.claude/settings.json`.)*

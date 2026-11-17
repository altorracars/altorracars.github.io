# CLAUDE.md — altorracars · 🌉 PUENTE (este repo es el SITIO, no el cerebro)

## Tu cerebro NO está aquí

Este repo es **solo el sitio** (ALTORRA Cars). Tu memoria vive en `../brain-private/altorracars/`: `CLAUDE.md` (el router), `docs/05-ESTADO-GLOBAL.md`,
`docs/10-MEMORIA-CORTO-PLAZO.md` y las demás.

Los tres primeros entran **ENTEROS** por los imports de abajo (desde el 17-nov-2026). El hook de arranque
añade los avisos vivos y no los repite; su eco llega **cortado** si pasa de 10.000 c: no te fíes de él para
el router, el `05` ni el `10`. **Si no los ves en tu contexto, falta el permiso de imports externos de esta
carpeta: LÉELOS POR RUTA antes de tocar nada** y avísale a Daniel.

@../brain-private/altorracars/CLAUDE.md
@../brain-private/altorracars/docs/05-ESTADO-GLOBAL.md
@../brain-private/altorracars/docs/10-MEMORIA-CORTO-PLAZO.md

## Dónde va cada commit

- Cerebro (`docs/`, router, ADRs) → **en la bóveda** `../brain-private/`; su pre-commit corre el linter allí.
  Aquí no hay linter.
- Sitio (web, `admin-app/`, `functions/`) → **aquí**, **directo en `main`** (push a `main` = deploy). Nunca los dos
  en el mismo commit. ⛔ **`dev` es HISTORIA** (remoto `archivo`) y **JAMÁS se mergea**: desde el cascarón (7-sep)
  no comparte historia con `main` (`merge-base` exit 1); forzarlo republicaría 3.401 commits privatizados (§198.3/§310).

## Reglas de oro DE ESTE SITIO

- User-site `altorracars.github.io`, sin CNAME. **NO borres `_config.yml`** ni pongas `.nojekyll` (Jekyll
  con `exclude`, E-00). El CI regenera `vehiculos/` cada 4 h (`scripts/generate-vehicles.mjs`).
- Cache: bump `CACHE_VERSION` (`service-worker.js`) + `APP_VERSION` (`js/core/cache-manager.js`);
  la vigente la dice el código, no el `05` (el sidecar, solo si su `generado:` es de hoy). Deploys
  Firebase: los hace Claude, nunca el dueño.
- `git add` específico, jamás `-A`. **NUNCA** `--amend`, `--no-verify` ni push forzado. **JAMÁS**
  secretos: repo PÚBLICO (`secretos.yml` lo escanea en CI).

*(Puente F8 · kernel en `../brain-private/kernel/`, vía los hooks de `.claude/settings.json`.)*

// ============================================================
// Helpers de DOM mínimos (sin framework). `el()` crea nodos seguros
// (sin innerHTML con datos interpolados). Delegación por data-action.
// ============================================================

export function el(tag, attrs = {}, children = []) {
  const node = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (v == null || v === false) continue;
    if (k === 'class') node.className = v;
    else if (k === 'html') node.innerHTML = v; // usar SOLO con contenido confiable (íconos)
    else if (k === 'text') node.textContent = v;
    else if (k === 'dataset') Object.assign(node.dataset, v);
    else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
    else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
    else node.setAttribute(k, v === true ? '' : String(v));
  }
  for (const c of [].concat(children)) {
    if (c == null || c === false || c === '') continue;
    node.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return node;
}

export function clear(node) {
  while (node && node.firstChild) node.removeChild(node.firstChild);
  return node;
}

export function mount(parent, node) {
  clear(parent);
  if (node) parent.append(node);
  return node;
}

// Append variádico SEGURO: filtra null/false/'' y coacciona strings — igual
// que los hijos de el(). El append() nativo NO filtra: parent.append(null)
// pinta el literal "null" en el DOM (bug TODO-52 visto bajo Inicio/Vehículos).
// Usar SIEMPRE en vez de parent.append(a, maybeNull, b) cuando un hijo pueda
// ser condicional.
export function appendAll(parent, children) {
  for (const c of [].concat(children)) {
    if (c == null || c === false || c === '') continue;
    parent.append(c.nodeType ? c : document.createTextNode(String(c)));
  }
  return parent;
}

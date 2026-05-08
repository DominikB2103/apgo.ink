export const $ = (selector, root = document) => root.querySelector(selector);
export const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
export const html = (strings, ...values) => strings.reduce((acc, part, i) => acc + part + (values[i] ?? ''), '');
export const join = (items) => Array.isArray(items) ? items.join('') : (items ?? '');
export const esc = (value = '') => String(value).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
export const mount = (node, markup) => { node.innerHTML = markup; return node; };
export const icon = (name) => `<span class="icon icon-${name}" aria-hidden="true"></span>`;

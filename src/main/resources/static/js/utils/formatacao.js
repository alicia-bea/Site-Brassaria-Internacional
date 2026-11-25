/* Funções puras de formatação de texto e data. Não dependem de DOM nem de API. */

/** Escapa caracteres HTML (proteção contra XSS ao usar innerHTML). */
export const textoSeguro = valor => String(valor ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/** '2026-11-16T12:00:00' -> '16/11/2026'. */
export function dataBrasileira(valor) {
  if (!valor) return 'Data não informada';
  const partes = String(valor).slice(0, 10).split('-');
  return partes.length === 3 ? `${partes[2]}/${partes[1]}/${partes[0]}` : textoSeguro(valor);
}

/** Remove acentos e põe em minúsculas (usado na busca). */
export const normalizar = t => String(t ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

/* Monta o HTML de UM card de evento (função pura: dados -> string). */
import { textoSeguro, dataBrasileira } from '../utils/formatacao.js';
import { separarLocal } from './local-evento.js';

/** `podeEditar` é true só na página com o formulário (cadastrar-evento.html). */
export function montarCardEvento(evento, podeEditar) {
  const descricao = separarLocal(evento.descricao || '');
  const acoes = podeEditar
    ? `<div class="event-actions"><button type="button" class="btn btn-light btn-small" data-acao="editar" data-id="${evento.id}">Editar</button> <button type="button" class="btn btn-small" data-acao="excluir" data-id="${evento.id}">Excluir</button></div>`
    : '';
  return `<article class="event-card"><time class="event-date">${dataBrasileira(evento.dataEvento)}</time><h3>${textoSeguro(evento.titulo)}</h3><p>${textoSeguro(descricao.texto)}</p><div class="event-location">${textoSeguro(descricao.local)}</div>${acoes}</article>`;
}

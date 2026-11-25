/* Botões "Ver mais eventos" / "Ver menos eventos".
 * Recebe `aoMudar` (callback) em vez de importar a lista, para evitar
 * dependência circular entre lista.js e paginacao.js. */
import { estado } from '../state/eventos-estado.js';
import { QUANTIDADE_INICIAL, QUANTIDADE_POR_CLIQUE } from '../config.js';

function configurarBotaoVerMais(lista, aoMudar) {
  let area = document.querySelector('#area-ver-mais');
  if (!area) {
    area = document.createElement('div');
    area.id = 'area-ver-mais'; area.className = 'ver-mais-container';
    const mais = document.createElement('button');
    mais.type = 'button'; mais.id = 'btn-ver-mais'; mais.className = 'btn btn-small'; mais.textContent = 'Ver mais eventos';
    mais.addEventListener('click', () => { estado.quantidadeExibida += QUANTIDADE_POR_CLIQUE; aoMudar(); });
    const menos = document.createElement('button');
    menos.type = 'button'; menos.id = 'btn-ver-menos'; menos.className = 'btn btn-light btn-small'; menos.textContent = 'Ver menos eventos';
    menos.addEventListener('click', () => { estado.quantidadeExibida = QUANTIDADE_INICIAL; aoMudar(); });
    area.append(mais,menos); lista.insertAdjacentElement('afterend',area);
  }
  return area;
}

/** Mostra/esconde os botões conforme o total de eventos filtrados. */
export function atualizarPaginacao(lista, total, aoMudar) {
  const area = configurarBotaoVerMais(lista, aoMudar);
  document.querySelector('#btn-ver-mais').hidden = estado.quantidadeExibida >= total;
  document.querySelector('#btn-ver-menos').hidden = estado.quantidadeExibida <= QUANTIDADE_INICIAL;
  area.hidden = total <= QUANTIDADE_INICIAL;
}

/** Esconde a área de paginação (lista vazia ou erro). */
export function ocultarPaginacao() {
  const area = document.querySelector('#area-ver-mais');
  if (area) area.hidden = true;
}

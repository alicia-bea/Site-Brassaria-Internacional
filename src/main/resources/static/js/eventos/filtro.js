/* Regra de filtragem da busca (função sobre o estado, sem DOM). */
import { estado } from '../state/eventos-estado.js';
import { normalizar, dataBrasileira } from '../utils/formatacao.js';
import { separarLocal } from './local-evento.js';

/** Eventos que combinam com o termo digitado (título, texto, local ou data). */
export function eventosFiltrados() {
  const termo = normalizar(estado.termoBusca).trim();
  if (!termo) return estado.todosEventos;
  return estado.todosEventos.filter(e => {
    const { texto, local } = separarLocal(e.descricao || '');
    return normalizar([e.titulo, texto, local, dataBrasileira(e.dataEvento)].join(' ')).includes(termo);
  });
}

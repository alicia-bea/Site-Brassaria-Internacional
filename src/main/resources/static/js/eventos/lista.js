/* Carrega os eventos da API e desenha a lista na página
 * (index.html e cadastrar-evento.html: elemento #eventos-lista). */
import { estado } from '../state/eventos-estado.js';
import { QUANTIDADE_INICIAL } from '../config.js';
import { listarEventos } from '../api/eventos-api.js';
import { eventosFiltrados } from './filtro.js';
import { montarCardEvento } from './card.js';
import { atualizarPaginacao, ocultarPaginacao } from './paginacao.js';

export function exibirEventos() {
  const lista = document.querySelector('#eventos-lista'); if (!lista) return;
  const eventos = eventosFiltrados();
  if (!eventos.length) {
    lista.innerHTML = '<p class="empty-state">Nenhum evento encontrado.</p>';
    ocultarPaginacao();
    return;
  }
  const podeEditar = !!document.querySelector('#evento-form');
  lista.innerHTML = eventos.slice(0, estado.quantidadeExibida).map(evento => montarCardEvento(evento, podeEditar)).join('');
  atualizarPaginacao(lista, eventos.length, exibirEventos);
}

export async function carregarEventos() {
  const lista = document.querySelector('#eventos-lista'); if (!lista) return;
  lista.innerHTML = '<p class="empty-state">Carregando eventos...</p>';
  try {
    const dados = await listarEventos();
    // ordena pelo id, que cresce a cada evento criado: o de maior id é o mais recente.
    estado.todosEventos = [...dados].sort((a, b) => b.id - a.id);
    if (!estado.todosEventos.length) {
      lista.innerHTML = '<p class="empty-state">Ainda não há eventos cadastrados.</p>';
      ocultarPaginacao();
      return;
    }
    estado.quantidadeExibida = QUANTIDADE_INICIAL; exibirEventos();
  } catch (erro) {
    console.error('Erro ao carregar eventos:',erro);
    lista.innerHTML = '<p class="empty-state">Não foi possível carregar os eventos. Verifique se a aplicação e o banco de dados estão em execução.</p>';
    ocultarPaginacao();
  }
}

/* Camada de acesso à API de eventos.
 * É o ÚNICO arquivo do front que chama fetch(). Não mexe no DOM.
 * Contrato com o EventoController:
 *   GET    /eventos        -> lista
 *   POST   /eventos        -> cadastra
 *   PUT    /eventos/{id}   -> atualiza
 *   DELETE /eventos/{id}   -> exclui
 */
import { API_EVENTOS } from '../config.js';

export async function listarEventos() {
  const resposta = await fetch(API_EVENTOS);
  if (!resposta.ok) throw new Error(`Falha ao consultar eventos (${resposta.status}).`);
  const dados = await resposta.json();
  if (!Array.isArray(dados)) throw new Error('Resposta de eventos inválida');
  return dados;
}

/** Cadastra (POST) quando não há id; atualiza (PUT) quando há. */
export async function salvarEvento(evento, id = null) {
  const url = id ? `${API_EVENTOS}/${id}` : API_EVENTOS;
  const metodo = id ? 'PUT' : 'POST';
  const resposta = await fetch(url, {
    method: metodo,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(evento),
  });
  if (!resposta.ok) throw new Error((await resposta.text()) || `Erro HTTP ${resposta.status}`);
  return resposta;
}

export async function excluirEventoPorId(id) {
  const resposta = await fetch(`${API_EVENTOS}/${id}`, { method: 'DELETE' });
  if (!resposta.ok) throw new Error(`Erro HTTP ${resposta.status}`);
}

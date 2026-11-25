/* Formulário de cadastro e edição (#evento-form, em cadastrar-evento.html). */
import { estado } from '../state/eventos-estado.js';
import { salvarEvento } from '../api/eventos-api.js';
import { juntarLocal, separarLocal } from './local-evento.js';
import { carregarEventos } from './lista.js';

let temporizadorAviso = null;

function mostrarAviso(aviso, texto, duracao = 4000) {
  if (!aviso) return;
  clearTimeout(temporizadorAviso);
  aviso.textContent = texto;
  if (texto) {
    temporizadorAviso = setTimeout(() => { aviso.textContent = ''; }, duracao);
  }
}

export function configurarCadastro() {
  const formulario = document.querySelector('#evento-form'); if (!formulario) return;

  formulario.addEventListener('submit', async evento => {
    evento.preventDefault();
    const aviso = document.querySelector('#form-aviso');
    const botao = formulario.querySelector('[type="submit"]');
    const dados = new FormData(formulario);
    const titulo = String(dados.get('titulo') || '').trim();
    const descricao = String(dados.get('descricao') || '').trim();
    const local = String(dados.get('local') || '').trim();
    const data = String(dados.get('dataEvento') || '');

    if (!titulo || !descricao || !local || !data) {
      mostrarAviso(aviso, 'Preencha todos os campos antes de cadastrar.');
      return;
    }

    const eventoParaEnviar = {titulo, descricao: juntarLocal(descricao, local), dataEvento: `${data}T12:00:00`};
    botao.disabled = true; botao.textContent = 'Enviando...'; mostrarAviso(aviso, '');

    try {
      await salvarEvento(eventoParaEnviar, estado.idEmEdicao);
      mostrarAviso(aviso, estado.idEmEdicao ? 'Evento atualizado com sucesso!' : 'Evento cadastrado com sucesso!');
      estado.idEmEdicao = null; formulario.reset();
      await carregarEventos();
    } catch (erro) {
      console.error('Erro ao cadastrar evento:', erro);
      mostrarAviso(aviso, 'Não foi possível cadastrar. Confira se o servidor está ativo e tente novamente.', 6000);
    } finally {
      botao.disabled = false;
      botao.textContent = estado.idEmEdicao ? 'Salvar alterações' : 'Cadastrar Evento';
    }
  });

  formulario.addEventListener('reset', () => {
    estado.idEmEdicao = null;
    formulario.querySelector('[type="submit"]').textContent = 'Cadastrar Evento';
  });
}

/** Preenche o formulário com os dados do evento escolhido (botão "Editar"). */
export function editarEvento(id) {
  const evento = estado.todosEventos.find(e => e.id === id);
  const formulario = document.querySelector('#evento-form');
  if (!evento || !formulario) return;
  const { texto, local } = separarLocal(evento.descricao || '');
  formulario.elements['titulo'].value = evento.titulo || '';
  formulario.elements['descricao'].value = texto;
  formulario.elements['local'].value = local;
  formulario.elements['dataEvento'].value = String(evento.dataEvento || '').slice(0, 10);
  estado.idEmEdicao = id;
  formulario.querySelector('[type="submit"]').textContent = 'Salvar alterações';
  formulario.scrollIntoView({ behavior: 'smooth' });
}

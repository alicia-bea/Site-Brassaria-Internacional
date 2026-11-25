/* Campo de busca de eventos (#busca-eventos). */
import { estado } from '../state/eventos-estado.js';
import { QUANTIDADE_INICIAL } from '../config.js';
import { exibirEventos } from './lista.js';

export function configurarBusca() {
  const campo = document.querySelector('#busca-eventos');
  if (!campo) return;
  campo.addEventListener('input', () => {
    estado.termoBusca = campo.value;
    estado.quantidadeExibida = QUANTIDADE_INICIAL;
    exibirEventos();
  });
}

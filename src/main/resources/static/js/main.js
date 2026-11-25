/* Ponto de entrada do JavaScript. Os HTMLs carregam somente este arquivo:
 *   <script type="module" src="js/main.js"></script>
 *
 * Cada módulo faz a sua parte e se desativa sozinho quando o elemento que
 * ele controla não existe na página (por isso o mesmo main.js serve às 4 páginas). */
import { iniciarRodape } from './ui/rodape.js';
import { iniciarAgeGate } from './ui/age-gate.js';
import { iniciarCarrossel } from './ui/carrossel.js';
import { configurarMenu } from './ui/menu.js';
import { configurarFiltros } from './ui/filtros-portfolio.js';
import { configurarCadastro } from './eventos/formulario.js';
import { configurarAcoes } from './eventos/acoes.js';
import { configurarBusca } from './eventos/busca.js';
import { carregarEventos } from './eventos/lista.js';

function iniciar() {
  // Interface (não depende da API)
  iniciarRodape();
  iniciarAgeGate();
  iniciarCarrossel();
  configurarMenu();
  configurarFiltros();

  // Eventos (dependem da API /eventos)
  configurarCadastro();
  configurarAcoes();
  configurarBusca();
  carregarEventos();
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
else iniciar();

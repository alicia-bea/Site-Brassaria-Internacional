/* Botões Editar / Excluir dos cards (delegação de eventos em #eventos-lista). */
import { excluirEventoPorId } from '../api/eventos-api.js';
import { carregarEventos } from './lista.js';
import { editarEvento } from './formulario.js';

/* Pop-up de confirmação. Reaproveita o visual do age-gate (css/components/age-gate.css). */
function excluirEvento(id) {
  const popup = document.createElement('div');
  popup.className = 'age-overlay';

  popup.innerHTML = `
<div class="age-dialog" role="dialog" aria-modal="true" aria-labelledby="titulo-exclusao">
<span class="age-eyebrow">BRASSARIA INTERNACIONAL</span>
<div class="age-symbol" aria-hidden="true">B<span>780</span></div>
<h2 id="titulo-exclusao">Excluir evento?</h2>
<p>Tem certeza de que deseja excluir este evento?</p>
<div class="age-actions">
<button type="button" class="btn" id="confirmar-exclusao">Sim, excluir evento</button>
<button type="button" class="btn btn-light" id="cancelar-exclusao">Cancelar</button>
</div>
<small>Esta ação não poderá ser desfeita.</small>
</div>
  `;

  document.body.appendChild(popup);

  const fechar = () => {
    document.removeEventListener('keydown', aoTeclar);
    popup.remove();
  };
  const aoTeclar = e => { if (e.key === 'Escape') fechar(); };
  document.addEventListener('keydown', aoTeclar);

  popup.querySelector('#cancelar-exclusao').onclick = fechar;
  popup.addEventListener('click', e => { if (e.target === popup) fechar(); });
  popup.querySelector('#cancelar-exclusao').focus();

  popup.querySelector('#confirmar-exclusao').onclick = async () => {
    fechar();
    try {
      await excluirEventoPorId(id);
      await carregarEventos();
    } catch (erro) {
      console.error('Erro ao excluir evento:', erro);
      alert('Erro ao excluir o evento.');
    }
  };
}

export function configurarAcoes() {
  const lista = document.querySelector('#eventos-lista');
  if (!lista) return;
  lista.addEventListener('click', e => {
    const botao = e.target.closest('[data-acao]');
    if (!botao) return;
    const id = Number(botao.dataset.id);
    if (botao.dataset.acao === 'excluir') excluirEvento(id);
    else editarEvento(id);
  });
}

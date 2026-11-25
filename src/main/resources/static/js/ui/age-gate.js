/* Confirmação de maioridade (+18). Exibida até o visitante confirmar; a escolha
 * fica em sessionStorage. Prende o foco do teclado dentro do diálogo.
 * (Estilos: css/components/age-gate.css) */

export function iniciarAgeGate() {
  const ageGate = document.querySelector('#age-gate');
  if (ageGate) {
    const confirmed = sessionStorage.getItem('brassaria-adulto') === 'sim';
    if (!confirmed) {
      ageGate.hidden = false;
      document.body.classList.add('age-locked');
      const yes = ageGate.querySelector('#age-yes');
      const no = ageGate.querySelector('#age-no');
      yes.focus();
      yes.addEventListener('click', () => {
        sessionStorage.setItem('brassaria-adulto', 'sim');
        ageGate.hidden = true;
        document.body.classList.remove('age-locked');
      });
      no.addEventListener('click', () => {
        ageGate.querySelector('.age-dialog').innerHTML = '<h2>Acesso restrito</h2><p>Este conteúdo é destinado a maiores de 18 anos.</p>';
      });
      ageGate.addEventListener('keydown', event => {
        if (event.key !== 'Tab') return;
        const controls = [...ageGate.querySelectorAll('button')];
        if (!controls.length) { event.preventDefault(); return; }
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
      });
    }
  }
}

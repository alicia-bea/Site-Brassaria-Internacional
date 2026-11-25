/* Menu de navegação: botão hambúrguer no mobile e destaque da página atual
 * (usa o atributo data-page dos links). (Estilos: css/layout/header.css) */

export function configurarMenu() {
  const botao = document.querySelector('.menu-toggle'); const menu = document.querySelector('.main-nav');
  if (!botao || !menu) return;
  botao.addEventListener('click', () => {
    const aberto = menu.classList.toggle('open'); botao.setAttribute('aria-expanded',String(aberto));
    botao.setAttribute('aria-label',aberto ? 'Fechar menu' : 'Abrir menu'); botao.textContent = aberto ? '×' : '☰';
  });
  const pagina = location.pathname.split('/').pop() || 'index.html';
  menu.querySelectorAll('a[data-page]').forEach(link => { if (link.dataset.page === pagina) link.setAttribute('aria-current','page'); });
}

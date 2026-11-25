/* Filtros de categoria do portfólio (portfolio.html): botões [data-filter]
 * mostram/escondem os produtos [data-category]. Não usa a API.
 * (Estilos: css/pages/portfolio.css) */

export function configurarFiltros() {
  const botoes = document.querySelectorAll('[data-filter]');
  const produtos = document.querySelectorAll('[data-category]');
  botoes.forEach(botao => botao.addEventListener('click', () => {
    botoes.forEach(item => { item.classList.toggle('active',item === botao); item.setAttribute('aria-pressed',String(item === botao)); });
    produtos.forEach(produto => { produto.hidden = botao.dataset.filter !== 'todos' && produto.dataset.category !== botao.dataset.filter; });
  }));
}

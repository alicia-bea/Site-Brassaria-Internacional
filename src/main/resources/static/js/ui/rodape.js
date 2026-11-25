/* Rodapé do site. Gera o HTML do <footer class="site-footer"> em todas as páginas.
 * (Estilos: css/layout/footer.css) */

export function iniciarRodape() {
  const footer = document.querySelector('footer.site-footer');
  if (footer) {
    footer.innerHTML = `<div class="footer-inner"><div class="footer-about"><span class="footer-kicker">BRASSARIA INTERNACIONAL</span><h2>Tradição que acompanha o futuro.</h2><p>780 anos de história, inovação e encontros. Aprecie com consciência.</p></div><div class="footer-links"><h3>Explore</h3><a href="index.html">Início</a><a href="portfolio.html">Portfólio</a><a href="institucional.html">Institucional</a><a href="cadastrar-evento.html">Cadastrar evento</a></div><div class="footer-signature"><span class="footer-monogram">B<span>780</span></span><p>Qualidade · Responsabilidade · Inovação</p></div></div><div class="footer-bottom"><span>© ${new Date().getFullYear()} Brassaria Internacional</span><span>Consuma com responsabilidade. Venda proibida para menores de 18 anos.</span></div>`;
  }
}

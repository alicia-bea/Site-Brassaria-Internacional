/* O model do back end (EventoModel) NÃO tem o campo "local".
 * Por isso o front guarda o local dentro da descrição, numa linha "Local: ...".
 * Todo o conhecimento desse formato fica concentrado AQUI: se o back ganhar
 * uma coluna `local`, só este arquivo (e o formulário) precisam mudar. */

const LOCAL_PADRAO = 'Brassaria Internacional';

/** Monta a descrição que será enviada à API: "texto\nLocal: xxx". */
export function juntarLocal(descricao, local) {
  return `${descricao}\nLocal: ${local}`;
}

/** Faz o inverso: separa a descrição vinda da API em { texto, local }. */
export function separarLocal(descricao = '') {
  const linhas = String(descricao).split(/\r?\n/);
  const indice = linhas.findIndex(linha => /^Local:\s*/i.test(linha.trim()));
  if (indice < 0) return {texto:String(descricao),local:LOCAL_PADRAO};
  const local = linhas[indice].replace(/^Local:\s*/i,'').trim();
  linhas.splice(indice,1);
  return {texto:linhas.join('\n').trim(),local:local || LOCAL_PADRAO};
}

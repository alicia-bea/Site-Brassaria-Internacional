/* Estado compartilhado da tela de eventos.
 * É um objeto (e não variáveis soltas) porque um módulo que faz `import`
 * não pode reatribuir a variável importada, mas pode alterar o objeto. */
import { QUANTIDADE_INICIAL } from '../config.js';

export const estado = {
  todosEventos: [],                       // resposta da API, mais recentes primeiro
  quantidadeExibida: QUANTIDADE_INICIAL,  // quantos cards aparecem agora
  idEmEdicao: null,                       // id do evento em edição (null = cadastro novo)
  termoBusca: '',                         // texto digitado na busca
};

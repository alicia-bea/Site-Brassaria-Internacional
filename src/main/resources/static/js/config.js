/* Constantes de configuração do front-end. */

// Endpoint do EventoController (Spring Boot). Caminho relativo: o front é
// servido pela própria aplicação, então não há problema de CORS.
export const API_EVENTOS = '/eventos';

// Paginação da lista de eventos ("Ver mais" / "Ver menos").
export const QUANTIDADE_INICIAL = 3;
export const QUANTIDADE_POR_CLIQUE = 3;

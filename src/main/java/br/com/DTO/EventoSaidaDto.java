package br.com.DTO;

import java.time.LocalDateTime;


public record EventoSaidaDto(
	 Long id,
	 String titulo,
	 String descricao,
	LocalDateTime dataEvento,
	    LocalDateTime dataCadastro
	    ) {
}

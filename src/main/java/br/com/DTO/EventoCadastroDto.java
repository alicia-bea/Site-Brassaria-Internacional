package br.com.DTO;

import java.time.LocalDateTime;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record EventoCadastroDto(
    @NotBlank String titulo,
	@NotBlank String descricao,
	@NotNull LocalDateTime dataEvento
) {

}

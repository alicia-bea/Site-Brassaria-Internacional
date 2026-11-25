package br.com.controller;

import java.net.URI;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.com.DTO.EventoCadastroDto;
import br.com.DTO.EventoSaidaDto;
import br.com.service.EventoService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/eventos")
@CrossOrigin(origins = "*")
public class EventoController {

    private final EventoService eventoService;

    public EventoController(EventoService eventoService) {
        this.eventoService = eventoService;
    }

    @Operation(
        summary = "Listar eventos cadastrados",
        description = "Retorna uma lista com os dados de todos os eventos cadastrados"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Eventos listados")
    })
    @GetMapping
    public List<EventoSaidaDto> listarTodos() {
        return eventoService.listarTodos();
    }

    @Operation(
        summary = "Listar eventos recentes",
        description = "Retorna os 3 últimos eventos cadastrados"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Eventos recentes listados")
    })
    @GetMapping("/recentes")
    public List<EventoSaidaDto> listarRecentes() {
        return eventoService.listarRecentes();
    }

    @Operation(
        summary = "Consultar um evento",
        description = "Retorna os dados de um evento a partir do seu ID"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Evento encontrado"),
        @ApiResponse(responseCode = "404", description = "Evento não encontrado")
    })
    @GetMapping("/{id}")
    public ResponseEntity<EventoSaidaDto> consultar(@PathVariable Long id) {
        return ResponseEntity.ok(eventoService.consultarEvento(id));
    }

    @Operation(
        summary = "Cadastrar um novo evento",
        description = "Registra os dados de um novo evento no sistema"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "201", description = "Evento cadastrado"),
        @ApiResponse(responseCode = "400", description = "Dados inválidos")
    })
    @PostMapping
    public ResponseEntity<EventoSaidaDto> cadastrar(
            @Valid @RequestBody EventoCadastroDto dto) {
        EventoSaidaDto evento = eventoService.Cadastrar(dto);
        URI location = URI.create("/eventos/" + evento.id());
        return ResponseEntity.created(location).body(evento);
    }

    @Operation(
        summary = "Atualizar um evento",
        description = "Atualiza os dados de um evento existente no sistema"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Evento atualizado"),
        @ApiResponse(responseCode = "404", description = "Evento não encontrado")
    })
 @PutMapping("/{id}")
public ResponseEntity<EventoSaidaDto> atualizar(
        @PathVariable Long id,
        @Valid @RequestBody EventoCadastroDto dto) {
    return ResponseEntity.ok(eventoService.atualizar(id, dto));
}

    @Operation(
        summary = "Deletar um evento",
        description = "Remove um evento existente do sistema"
    )
    @ApiResponses({
        @ApiResponse(responseCode = "204", description = "Evento deletado"),
        @ApiResponse(responseCode = "404", description = "Evento não encontrado")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        eventoService.deletarPorId(id);
        return ResponseEntity.noContent().build();
    }
}
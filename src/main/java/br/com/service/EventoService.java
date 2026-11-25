package br.com.service;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import br.com.DTO.EventoCadastroDto;
import br.com.DTO.EventoSaidaDto;
import br.com.model.EventoModel;
import br.com.repository.EventoRepository;



@Service
public class EventoService {
	private final EventoRepository eventoRepository;
	
	public EventoService(EventoRepository repositorio) {
		this.eventoRepository = repositorio;
	}
	
	public EventoSaidaDto Cadastrar (EventoCadastroDto obj) {
		EventoModel evento = new EventoModel();
		evento.setTitulo(obj.titulo());
		evento.setDescricao(obj.descricao());
		evento.setDataEvento(obj.dataEvento());

		EventoModel itemSalvo = this.eventoRepository.save(evento);

		return this.ConverterParaDto(itemSalvo);
		}

	private EventoSaidaDto ConverterParaDto(EventoModel item){
		return new EventoSaidaDto(
			item.getId(), 
			item.getTitulo(), 
			item.getDescricao(), 
			item.getDataEvento(),
			item.getDataCadastro());
	}
	
	public EventoRepository getEventoRepository() {
		return eventoRepository;
	}

	public EventoSaidaDto consultarEvento( Long id) {
		Optional<EventoModel> resultado=this.eventoRepository.findById(id);

		EventoModel evento = resultado.orElseThrow (
			() -> new RuntimeException("Evento não encontrado")
		);

		return this.ConverterParaDto(evento);
	}

	public List<EventoSaidaDto> listarTodos(){
		List<EventoSaidaDto> resposta = new ArrayList<>();
		List<EventoModel> itens = this.eventoRepository.findAll();
		for (EventoModel item : itens){
			resposta.add(this.ConverterParaDto(item));

		}
		return resposta;
	}

	public List<EventoSaidaDto> listarRecentes() {
    List<EventoSaidaDto> resposta = new ArrayList<>();
    for (EventoModel item : eventoRepository.findTop3ByOrderByDataCadastroDesc()) {
        resposta.add(this.ConverterParaDto(item));
    }
    return resposta;
}
	
	public void deletarPorId(Long id) {
		if(!eventoRepository.existsById(id)) {
			throw new RuntimeException("Evento não encontrado com o ID: " + id);
		}
		eventoRepository.deleteById(id);
	}
	

	public EventoSaidaDto atualizar(Long id, EventoCadastroDto dto) {
    EventoModel evento = eventoRepository.findById(id)
        .orElseThrow(() -> new RuntimeException("Evento não encontrado com o ID: " + id));
    evento.setTitulo(dto.titulo());
    evento.setDescricao(dto.descricao());
    evento.setDataEvento(dto.dataEvento());
    return this.ConverterParaDto(eventoRepository.save(evento));
}

	}

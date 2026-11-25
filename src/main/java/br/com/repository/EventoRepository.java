package br.com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import br.com.model.EventoModel;

public interface EventoRepository
        extends JpaRepository<EventoModel, Long> {

    List<EventoModel> findTop3ByOrderByDataCadastroDesc();
}
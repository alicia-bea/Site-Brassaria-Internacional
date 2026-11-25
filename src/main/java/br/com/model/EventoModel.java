package br.com.model;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name="evento")
public class EventoModel {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	   @Column(nullable = false, length = 150)
	    private String titulo;
	    @Column(columnDefinition = "TEXT", nullable = false)
	    private String descricao;
	    @Column(nullable = false)
	    private LocalDateTime dataEvento;
	    @Column(nullable = false)
	    private LocalDateTime dataCadastro = LocalDateTime.now();
		public Long getId() {
			return id;
		}
		
		public void setId(Long id) {
			this.id = id;
		}
		public String getTitulo() {
			return titulo;
		}
		public void setTitulo(String titulo) {
			this.titulo = titulo;
		}
		public String getDescricao() {
			return descricao;
		}
		public void setDescricao(String descricao) {
			this.descricao = descricao;
		}
		public LocalDateTime getDataEvento() {
			return dataEvento;
		}
		public void setDataEvento(LocalDateTime dataEvento) {
			this.dataEvento = dataEvento;
		}
		public LocalDateTime getDataCadastro() {
			return dataCadastro;
		}
		public void setDataCadastro(LocalDateTime dataCadastro) {
			this.dataCadastro = dataCadastro;
		}
	    
		public EventoModel(){
			
		}
	    
	}
	


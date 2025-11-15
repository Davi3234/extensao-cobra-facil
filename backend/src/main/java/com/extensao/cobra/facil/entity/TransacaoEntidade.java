package com.extensao.cobra.facil.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity(name = "tbtransacao")
public class TransacaoEntidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_transacao")
    private Long id;

    @Column(name = "valor_transacao")
    private Double valor;

    @Column(name = "descricao_transacao")
    private String descricao;

    @Column(name = "data_vencimento_transacao")
    private LocalDate dataVencimento;

    @Column(name = "data_pagamento_transacao")
    private LocalDate dataPagamento;

    @Column(name = "status_transacao")
    private int status;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_devedor", referencedColumnName = "id_usuario")
    private UsuarioEntidade usuarioDevedor;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id_credor", referencedColumnName = "id_usuario")
    private UsuarioEntidade usuarioCredor;

    public Long getId() {
        return id;
    }

    public Double getValor() {
        return valor;
    }

    public String getDescricao() {
        return descricao;
    }

    public LocalDate getDataVencimento() {
        return dataVencimento;
    }

    public LocalDate getDataPagamento() {
        return dataPagamento;
    }

    public int getStatus() {
        return status;
    }

    public TransacaoEntidade setId(Long id) {
        this.id = id;
        return this;
    }

    public TransacaoEntidade setValor(Double valor) {
        this.valor = valor;
        return this;
    }

    public TransacaoEntidade setDescricao(String descricao) {
        this.descricao = descricao;
        return this;
    }

    public TransacaoEntidade setDataVencimento(LocalDate dataVencimento) {
        this.dataVencimento = dataVencimento;
        return this;
    }

    public TransacaoEntidade setDataPagamento(LocalDate dataPagamento) {
        this.dataPagamento = dataPagamento;
        return this;
    }

    public TransacaoEntidade setStatus(int status) {
        this.status = status;
        return this;
    }

    public UsuarioEntidade getUsuarioDevedor() {
        return usuarioDevedor;
    }

    public TransacaoEntidade setUsuarioDevedor(UsuarioEntidade usuarioDevedor) {
        this.usuarioDevedor = usuarioDevedor;
        return this;
    }

    public UsuarioEntidade getUsuarioCredor() {
        return usuarioCredor;
    }

    public TransacaoEntidade setUsuarioCredor(UsuarioEntidade usuarioCredor) {
        this.usuarioCredor = usuarioCredor;
        return this;
    }
}

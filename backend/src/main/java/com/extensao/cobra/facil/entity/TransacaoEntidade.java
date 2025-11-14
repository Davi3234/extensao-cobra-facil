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

    @Column(name = "contraparte_transacao")
    private Long contraparteId; // ID do usuário devedor/credor

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

    public Long getContraparteId() {
        return contraparteId;
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

    public TransacaoEntidade setContraparteId(Long contraparteId) {
        this.contraparteId = contraparteId;
        return this;
    }
}

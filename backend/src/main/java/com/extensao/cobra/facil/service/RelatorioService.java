package com.extensao.cobra.facil.service;

import java.time.LocalDate;
import java.util.List;

import com.extensao.cobra.facil.mapper.RelatorioMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.extensao.cobra.facil.dto.relatorio.RelatorioSaldoDtoResponse;
import com.extensao.cobra.facil.dto.relatorio.RelatorioTransacaoDtoResponse;
import com.extensao.cobra.facil.entity.TransacaoEntidade;
import com.extensao.cobra.facil.enums.StatusTransacaoEnum;
import com.extensao.cobra.facil.repository.TransacaoRepositorio;

@Service
public class RelatorioService {

    @Autowired
    private TransacaoRepositorio transacaoRepositorio;

    public RelatorioSaldoDtoResponse calcularSaldo() {

        List<TransacaoEntidade> todas = transacaoRepositorio.findAll();

        double totalPagar = todas.stream()
                .filter(t -> t.getValor() != null)
                .filter(t -> t.getUsuarioDevedor() != null)
                .mapToDouble(TransacaoEntidade::getValor)
                .sum();

        double totalReceber = totalPagar;

        double saldo = totalReceber - totalPagar;

        return new RelatorioSaldoDtoResponse(
                totalReceber,
                totalPagar,
                saldo);
    }

    public List<RelatorioTransacaoDtoResponse> transacoesQuitadas() {
        return transacaoRepositorio.findAll().stream()
                .filter(transacaoEntidade -> transacaoEntidade.getStatus() == StatusTransacaoEnum.QUITADA.getValor())
                .map(RelatorioMapper::relatorioDtoResponse)
                .toList();
    }

    public List<RelatorioTransacaoDtoResponse> transacoesAtrasadas() {
        LocalDate hoje = LocalDate.now();

        return transacaoRepositorio.findAll().stream()
                .filter(transacaoEntidade -> transacaoEntidade.getStatus() == StatusTransacaoEnum.PENDENTE.getValor())
                .filter(transacaoEntidade -> transacaoEntidade.getDataVencimento() != null && transacaoEntidade.getDataVencimento().isBefore(hoje))
                .map(RelatorioMapper::relatorioDtoResponse)
                .toList();
    }
}

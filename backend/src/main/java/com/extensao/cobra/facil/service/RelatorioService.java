package com.extensao.cobra.facil.service;

import com.extensao.cobra.facil.dto.relatorio.RelatorioSaldoDtoResponse;
import com.extensao.cobra.facil.dto.relatorio.RelatorioTransacaoDtoResponse;
import com.extensao.cobra.facil.entity.TransacaoEntidade;
import com.extensao.cobra.facil.enums.StatusTransacaoEnum;
import com.extensao.cobra.facil.repository.TransacaoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class RelatorioService {

    @Autowired
    private TransacaoRepositorio transacaoRepositorio;

    // SALDO GERAL
    public RelatorioSaldoDtoResponse calcularSaldo() {

        List<TransacaoEntidade> todas = transacaoRepositorio.findAll();

        double totalPagar = todas.stream()
                .filter(t -> t.getValor() != null)
                .filter(t -> t.getContraparteId() != null)
                .mapToDouble(TransacaoEntidade::getValor)
                .sum();

        double totalReceber = totalPagar; // se quiser separar depois, é só alterar

        double saldo = totalReceber - totalPagar;

        return new RelatorioSaldoDtoResponse(
                totalReceber,
                totalPagar,
                saldo);
    }

    // QUITADAS
    public List<RelatorioTransacaoDtoResponse> transacoesQuitadas() {
        return transacaoRepositorio.findAll().stream()
                .filter(tx -> tx.getStatus() == StatusTransacaoEnum.QUITADA.getValor())
                .map(this::mapToDto)
                .toList();
    }

    // ATRASADAS
    public List<RelatorioTransacaoDtoResponse> transacoesAtrasadas() {
        LocalDate hoje = LocalDate.now();

        return transacaoRepositorio.findAll().stream()
                .filter(tx -> tx.getStatus() == StatusTransacaoEnum.PENDENTE.getValor())
                .filter(tx -> tx.getDataVencimento() != null && tx.getDataVencimento().isBefore(hoje))
                .map(this::mapToDto)
                .toList();
    }

    // FILTROS
    public List<RelatorioTransacaoDtoResponse> filtrar(Integer status, LocalDate inicio, LocalDate fim) {

        return transacaoRepositorio.findAll().stream()
                .filter(tx -> status == null || tx.getStatus() == status)
                .filter(tx -> inicio == null || !tx.getDataVencimento().isBefore(inicio))
                .filter(tx -> fim == null || !tx.getDataVencimento().isAfter(fim))
                .map(this::mapToDto)
                .toList();
    }

    // MAPEAMENTO AUXILIAR
    private RelatorioTransacaoDtoResponse mapToDto(TransacaoEntidade tx) {
        return new RelatorioTransacaoDtoResponse(
                tx.getId(),
                tx.getValor(),
                tx.getDescricao(),
                tx.getDataVencimento(),
                tx.getDataPagamento(),
                tx.getStatus(),
                tx.getContraparteId());
    }
}

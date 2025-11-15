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

    public List<RelatorioTransacaoDtoResponse> transacoesQuitadas() {
        return transacaoRepositorio.findAll().stream()
                .filter(transacaoEntidade -> transacaoEntidade.getStatus() == StatusTransacaoEnum.QUITADA.getValor())
                .map(this::mapToDto)
                .toList();
    }

    public List<RelatorioTransacaoDtoResponse> transacoesAtrasadas() {
        LocalDate hoje = LocalDate.now();

        return transacaoRepositorio.findAll().stream()
                .filter(transacaoEntidade -> transacaoEntidade.getStatus() == StatusTransacaoEnum.PENDENTE.getValor())
                .filter(transacaoEntidade -> transacaoEntidade.getDataVencimento() != null && transacaoEntidade.getDataVencimento().isBefore(hoje))
                .map(this::mapToDto)
                .toList();
    }

    public List<RelatorioTransacaoDtoResponse> filtrar(Integer status, LocalDate inicio, LocalDate fim) {

        return transacaoRepositorio.findAll().stream()
                .filter(transacaoEntidade -> status == null || transacaoEntidade.getStatus() == status)
                .filter(transacaoEntidade -> inicio == null || !transacaoEntidade.getDataVencimento().isBefore(inicio))
                .filter(transacaoEntidade -> fim == null || !transacaoEntidade.getDataVencimento().isAfter(fim))
                .map(this::mapToDto)
                .toList();
    }

    private RelatorioTransacaoDtoResponse mapToDto(TransacaoEntidade transacaoEntidade) {
        return new RelatorioTransacaoDtoResponse(
                transacaoEntidade.getId(),
                transacaoEntidade.getValor(),
                transacaoEntidade.getDescricao(),
                transacaoEntidade.getDataVencimento(),
                transacaoEntidade.getDataPagamento(),
                transacaoEntidade.getStatus(),
                transacaoEntidade.getContraparteId());
    }
}

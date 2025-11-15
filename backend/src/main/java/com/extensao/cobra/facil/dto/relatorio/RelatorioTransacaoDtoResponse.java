package com.extensao.cobra.facil.dto.relatorio;

import java.time.LocalDate;

public record RelatorioTransacaoDtoResponse(
        Long id,
        Double valor,
        String descricao,
        LocalDate dataVencimento,
        LocalDate dataPagamento,
        int status,
        Long contraparteId) {
}

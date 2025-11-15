package com.extensao.cobra.facil.dto.relatorio;

public record RelatorioSaldoDtoResponse(
        Double totalReceber,
        Double totalPagar,
        Double saldoGeral) {
}

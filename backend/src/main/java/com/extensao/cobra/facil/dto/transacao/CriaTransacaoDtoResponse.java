package com.extensao.cobra.facil.dto.transacao;

import java.time.LocalDate;

public record CriaTransacaoDtoResponse(
        Long id,
        Double valor,
        String descricao,
        LocalDate dataVencimento,
        LocalDate dataPagamento,
        int status,
        Long contraparteId) {
}

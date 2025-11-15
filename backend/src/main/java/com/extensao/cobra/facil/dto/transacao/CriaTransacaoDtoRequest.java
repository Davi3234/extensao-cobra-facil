package com.extensao.cobra.facil.dto.transacao;

import java.time.LocalDate;

public record CriaTransacaoDtoRequest(
        Double valor,
        LocalDate dataVencimento,
        String descricao,
        int status) {
}

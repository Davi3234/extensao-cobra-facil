package com.extensao.cobra.facil.dto.transacao;

import java.time.LocalDate;

public record TransacaoDtoRequest(
        Double valor,
        LocalDate dataVencimento,
        String descricao,
        Long credorId,
        Long devedorId) {
}

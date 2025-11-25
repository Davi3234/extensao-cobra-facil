package com.extensao.cobra.facil.dto.transacao;

import com.extensao.cobra.facil.dto.usuario.UsuarioDtoResponse;

import java.time.LocalDate;

public record TransacaoDtoResponse(
        Long id,
        Double valor,
        String descricao,
        LocalDate dataVencimento,
        LocalDate dataPagamento,
        int status,
        UsuarioDtoResponse usuarioCredor,
        UsuarioDtoResponse usuarioDevedor) {
}

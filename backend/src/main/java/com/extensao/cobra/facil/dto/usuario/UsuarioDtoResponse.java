package com.extensao.cobra.facil.dto.usuario;

public record UsuarioDtoResponse(
        Long id,
        String nome,
        String email,
        String telefone,
        int ativo
) {
}

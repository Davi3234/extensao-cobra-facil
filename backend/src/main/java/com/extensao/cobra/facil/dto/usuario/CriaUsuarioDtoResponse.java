package com.extensao.cobra.facil.dto.usuario;

public record CriaUsuarioDtoResponse(
        Long id,
        String nome,
        String email,
        String telefone,
        int ativo
) {
}

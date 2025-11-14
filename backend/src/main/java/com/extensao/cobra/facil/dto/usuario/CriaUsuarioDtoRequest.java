package com.extensao.cobra.facil.dto.usuario;

public record CriaUsuarioDtoRequest(
        String nome,
        String email,
        String telefone,
        String senha
) {
}

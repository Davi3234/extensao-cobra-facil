package com.extensao.cobra.facil.dto.usuario;

public record UsuarioDtoRequest(
        String nome,
        String email,
        String telefone,
        String senha
) {
}

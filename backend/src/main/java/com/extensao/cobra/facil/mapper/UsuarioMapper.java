package com.extensao.cobra.facil.mapper;

import com.extensao.cobra.facil.dto.usuario.UsuarioDtoRequest;
import com.extensao.cobra.facil.dto.usuario.UsuarioDtoResponse;
import com.extensao.cobra.facil.entity.UsuarioEntidade;

public class UsuarioMapper {
    public static UsuarioDtoRequest criaUsuarioDtoRequest(UsuarioEntidade usuarioEntidade){
        return new UsuarioDtoRequest(
                usuarioEntidade.getNome(),
                usuarioEntidade.getEmail(),
                usuarioEntidade.getTelefone(),
                usuarioEntidade.getSenha()
        );
    }
    public static UsuarioDtoResponse criaUsuarioDtoResponse(UsuarioEntidade usuarioEntidade){
        return new UsuarioDtoResponse(
                usuarioEntidade.getId(),
                usuarioEntidade.getNome(),
                usuarioEntidade.getEmail(),
                usuarioEntidade.getTelefone(),
                usuarioEntidade.getAtivo()
        );
    }

    public static UsuarioEntidade usuarioEntidade(UsuarioDtoRequest usuarioDtoRequest){
        return new UsuarioEntidade()
                .setSenha(usuarioDtoRequest.senha())
                .setEmail(usuarioDtoRequest.email())
                .setTelefone(usuarioDtoRequest.telefone())
                .setNome(usuarioDtoRequest.nome());
    }
}

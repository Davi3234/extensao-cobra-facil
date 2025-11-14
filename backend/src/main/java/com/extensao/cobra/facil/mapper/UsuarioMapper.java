package com.extensao.cobra.facil.mapper;

import com.extensao.cobra.facil.dto.usuario.CriaUsuarioDtoRequest;
import com.extensao.cobra.facil.dto.usuario.CriaUsuarioDtoResponse;
import com.extensao.cobra.facil.entity.UsuarioEntidade;

public class UsuarioMapper {
    public static CriaUsuarioDtoRequest criaUsuarioDtoRequest(UsuarioEntidade usuarioEntidade){
        return new CriaUsuarioDtoRequest(
                usuarioEntidade.getNome(),
                usuarioEntidade.getEmail(),
                usuarioEntidade.getTelefone(),
                usuarioEntidade.getSenha()
        );
    }
    public static CriaUsuarioDtoResponse criaUsuarioDtoResponse(UsuarioEntidade usuarioEntidade){
        return new CriaUsuarioDtoResponse(
                usuarioEntidade.getId(),
                usuarioEntidade.getNome(),
                usuarioEntidade.getEmail(),
                usuarioEntidade.getTelefone(),
                usuarioEntidade.getAtivo()
        );
    }

    public static UsuarioEntidade usuarioEntidade(CriaUsuarioDtoRequest criaUsuarioDtoRequest){
        return new UsuarioEntidade()
                .setSenha(criaUsuarioDtoRequest.senha())
                .setEmail(criaUsuarioDtoRequest.email())
                .setTelefone(criaUsuarioDtoRequest.telefone())
                .setNome(criaUsuarioDtoRequest.nome());
    }
}

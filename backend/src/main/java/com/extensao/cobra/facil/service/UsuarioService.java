package com.extensao.cobra.facil.service;

import com.extensao.cobra.facil.entity.UsuarioEntidade;
import com.extensao.cobra.facil.enums.UsuarioEnum;
import com.extensao.cobra.facil.repository.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;

    public UsuarioService setUsuarioRepositorio(UsuarioRepositorio usuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
        return this;
    }

    public UsuarioEntidade criarUsuario(UsuarioEntidade usuarioEntidade) {
        return this.usuarioRepositorio.save(usuarioEntidade);
    }

    public UsuarioEntidade atualizarUsuario(Long id, UsuarioEntidade usuarioEntidade){
        UsuarioEntidade usuarioEntidadeAntigo = this.usuarioRepositorio.findById(id).get();
        usuarioEntidadeAntigo.setEmail(usuarioEntidade.getEmail());
        usuarioEntidadeAntigo.setNome(usuarioEntidade.getNome());
        usuarioEntidadeAntigo.setTelefone(usuarioEntidade.getTelefone());

        return usuarioRepositorio.save(usuarioEntidadeAntigo);
    }

    public void inativarUsuario(Long id){
        UsuarioEntidade usuarioEntidade = this.usuarioRepositorio.findById(id).get();
        usuarioEntidade.setAtivo(UsuarioEnum.INATIVO.getValor());
        usuarioRepositorio.save(usuarioEntidade);
    }
}

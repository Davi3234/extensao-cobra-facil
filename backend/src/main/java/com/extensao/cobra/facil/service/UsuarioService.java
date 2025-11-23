package com.extensao.cobra.facil.service;

import com.extensao.cobra.facil.entity.UsuarioEntidade;
import com.extensao.cobra.facil.enums.UsuarioEnum;
import com.extensao.cobra.facil.repository.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;
    @Autowired
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UsuarioService setUsuarioRepositorio(UsuarioRepositorio usuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
        return this;
    }

    public UsuarioEntidade criarUsuario(UsuarioEntidade usuarioEntidade) {
        usuarioEntidade.setSenha(this.passwordEncoder.encode(usuarioEntidade.getSenha()));
        usuarioEntidade.setAtivo(1);
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

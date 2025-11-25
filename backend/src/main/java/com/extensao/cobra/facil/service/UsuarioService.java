package com.extensao.cobra.facil.service;

import com.extensao.cobra.facil.entity.UsuarioEntidade;
import com.extensao.cobra.facil.enums.UsuarioEnum;
import com.extensao.cobra.facil.exception.UsuarioJaExistenteException;
import com.extensao.cobra.facil.exception.UsuarioNaoEncontradoException;
import com.extensao.cobra.facil.repository.UsuarioRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    @Autowired
    private UsuarioRepositorio usuarioRepositorio;
    @Autowired
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public UsuarioEntidade criarUsuario(UsuarioEntidade usuarioEntidade) {
        usuarioEntidade.setSenha(this.passwordEncoder.encode(usuarioEntidade.getSenha()));
        usuarioEntidade.setAtivo(1);
        this.validaUsuarioDuplicado(usuarioEntidade);

        return this.usuarioRepositorio.save(usuarioEntidade);
    }

    public UsuarioEntidade atualizarUsuario(Long id, UsuarioEntidade usuarioEntidade){
        UsuarioEntidade usuarioEntidadeAntigo = this.getUsuarioById(id);
        usuarioEntidadeAntigo.setEmail(usuarioEntidade.getEmail());
        usuarioEntidadeAntigo.setNome(usuarioEntidade.getNome());
        usuarioEntidadeAntigo.setTelefone(usuarioEntidade.getTelefone());

        return usuarioRepositorio.save(usuarioEntidadeAntigo);
    }

    public void inativarUsuario(Long id){
        UsuarioEntidade usuarioEntidade = this.getUsuarioById(id);
        usuarioEntidade.setAtivo(UsuarioEnum.INATIVO.getValor());
        usuarioRepositorio.save(usuarioEntidade);
    }

    private void validaUsuarioDuplicado(UsuarioEntidade usuarioEntidade){
        Optional<UsuarioEntidade> usuarioEntidadeValidacao = this.getUsuarioByEmail(usuarioEntidade.getEmail());

        if(!usuarioEntidadeValidacao.equals(Optional.empty())){
            throw new UsuarioJaExistenteException(usuarioEntidade.getEmail());
        }
    }

    public UsuarioEntidade getUsuarioById(Long id){
        return this.usuarioRepositorio.findById(id)
                .orElseThrow(() -> new UsuarioNaoEncontradoException(id));
    }

    private Optional<UsuarioEntidade> getUsuarioByEmail(String email){
        return this.usuarioRepositorio.findByEmail(email);
    }

    public List<UsuarioEntidade> listarUsuarios(){
        return this.usuarioRepositorio.findAll();
    }
    public Optional<UsuarioEntidade> getUsuarioLogado(){
        String email = SecurityContextHolder.getContext()
                .getAuthentication()
                .getName();
        return this.getUsuarioByEmail(email);
    }
}

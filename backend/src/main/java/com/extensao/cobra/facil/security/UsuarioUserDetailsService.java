package com.extensao.cobra.facil.security;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.extensao.cobra.facil.entity.UsuarioEntidade;
import com.extensao.cobra.facil.repository.UsuarioRepositorio;

@Service
public class UsuarioUserDetailsService implements UserDetailsService {

    private final UsuarioRepositorio usuarioRepositorio;

    public UsuarioUserDetailsService(UsuarioRepositorio usuarioRepositorio) {
        this.usuarioRepositorio = usuarioRepositorio;
    }

    @Override
    public UsuarioUserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UsuarioEntidade usuario = usuarioRepositorio.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));

        return new UsuarioUserDetails(usuario);
    }
}

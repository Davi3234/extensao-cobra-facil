package com.extensao.cobra.facil.security;

import com.extensao.cobra.facil.entity.UsuarioEntidade;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

public class UsuarioUserDetails implements UserDetails {

    private final UsuarioEntidade usuario;

    public UsuarioUserDetails(UsuarioEntidade usuario) {
        this.usuario = usuario;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return usuario.getSenha();
    }

    @Override
    public String getUsername() {
        return usuario.getEmail();  // login por email
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // alterar se quiser controle real
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // alterar se quiser controle real
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // alterar se quiser controle real
    }

    @Override
    public boolean isEnabled() {
        return usuario.getAtivo() == 1;
    }

    public UsuarioEntidade getUsuario() {
        return usuario;
    }
}

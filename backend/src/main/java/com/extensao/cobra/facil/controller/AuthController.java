package com.extensao.cobra.facil.controller;

import com.extensao.cobra.facil.dto.login.LoginDtoRequest;
import com.extensao.cobra.facil.dto.login.LoginDtoResponse;
import com.extensao.cobra.facil.dto.usuario.UsuarioDtoRequest;
import com.extensao.cobra.facil.dto.usuario.UsuarioDtoResponse;
import com.extensao.cobra.facil.entity.UsuarioEntidade;
import com.extensao.cobra.facil.exception.UsuarioOuSenhaInvalidoException;
import com.extensao.cobra.facil.mapper.UsuarioMapper;
import com.extensao.cobra.facil.security.JwtService;
import com.extensao.cobra.facil.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    @Autowired
    private UsuarioService usuarioService;

    public AuthController(AuthenticationManager authenticationManager,
                          JwtService jwtService,
                          UserDetailsService userDetailsService) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginDtoResponse> login(@RequestBody LoginDtoRequest login) {
        try {
            UsernamePasswordAuthenticationToken authToken =
                    new UsernamePasswordAuthenticationToken(login.email(), login.senha());

            authenticationManager.authenticate(authToken);

            UserDetails user = userDetailsService.loadUserByUsername(login.email());
            String token = jwtService.gerarToken(user);

            return ResponseEntity.ok(new LoginDtoResponse(token));

        } catch (BadCredentialsException e) {
            throw new UsuarioOuSenhaInvalidoException("Usuário ou senha inválidos");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<UsuarioDtoResponse> signUp(@RequestBody UsuarioDtoRequest usuarioDtoRequest) {
        UsuarioEntidade usuarioEntidade = this.usuarioService.criarUsuario(UsuarioMapper.usuarioEntidade(usuarioDtoRequest));

        return ResponseEntity.ok(UsuarioMapper.criaUsuarioDtoResponse(usuarioEntidade));
    }
}
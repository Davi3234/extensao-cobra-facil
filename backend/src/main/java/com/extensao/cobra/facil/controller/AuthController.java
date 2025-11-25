package com.extensao.cobra.facil.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
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

    private final UsuarioService usuarioService;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    @Autowired
    private UsuarioService usuarioService;

    public AuthController(
            UsuarioService usuarioService,
            AuthenticationManager authenticationManager,
            JwtService jwtService,
            UserDetailsService userDetailsService) {
        this.usuarioService = usuarioService;
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginDtoResponse> login(@RequestBody LoginDtoRequest login) {

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(
                login.email(), login.senha());

        authenticationManager.authenticate(authToken);

        UserDetails user = userDetailsService.loadUserByUsername(login.email());
        String token = jwtService.gerarToken(user);

        return ResponseEntity.ok(new LoginDtoResponse(token));
    }

    @PostMapping("/signup")
    public ResponseEntity<CriaUsuarioDtoResponse> signUp(@RequestBody CriaUsuarioDtoRequest criaUsuarioDtoRequest) {
        UsuarioEntidade usuarioEntidade = this.usuarioService
                .criarUsuario(UsuarioMapper.usuarioEntidade(criaUsuarioDtoRequest));

        return ResponseEntity.ok(UsuarioMapper.criaUsuarioDtoResponse(usuarioEntidade));
    }
}

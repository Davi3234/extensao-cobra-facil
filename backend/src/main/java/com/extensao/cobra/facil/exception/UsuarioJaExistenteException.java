package com.extensao.cobra.facil.exception;

public class UsuarioJaExistenteException extends RuntimeException {
    public UsuarioJaExistenteException(String email) {
        super("Usuário com email "+email+" já existe");
    }
}

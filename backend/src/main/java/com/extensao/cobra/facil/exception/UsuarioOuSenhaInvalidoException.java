package com.extensao.cobra.facil.exception;

public class UsuarioOuSenhaInvalidoException extends RuntimeException {
    public UsuarioOuSenhaInvalidoException(String message) {
        super("Usuario ou Senha estão inválidos!");
    }
}

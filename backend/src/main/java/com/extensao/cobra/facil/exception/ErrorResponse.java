package com.extensao.cobra.facil.exception;

import java.time.LocalDateTime;

public class ErrorResponse {

    private String codigo;
    private String mensagem;
    private LocalDateTime timestamp;

    public ErrorResponse(String codigo, String mensagem) {
        this.codigo = codigo;
        this.mensagem = mensagem;
        this.timestamp = LocalDateTime.now();
    }

    public String getCodigo() { return codigo; }
    public String getMensagem() { return mensagem; }
    public LocalDateTime getTimestamp() { return timestamp; }
}

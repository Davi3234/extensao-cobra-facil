package com.extensao.cobra.facil.exception;

public class TransacaoNaoEncontradaException extends RuntimeException {
    public TransacaoNaoEncontradaException(Long id) {
        super("Transação não encontrada - Id "+id);
    }
}

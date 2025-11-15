package com.extensao.cobra.facil.enums;

public enum StatusTransacaoEnum {
    PENDENTE(1),
    QUITADA(2),
    ATRASADA(3);

    private int valor;

    StatusTransacaoEnum(int valor) {
        this.valor = valor;
    }

    public int getValor() {
        return valor;
    }
}

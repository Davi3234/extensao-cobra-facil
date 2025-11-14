package com.extensao.cobra.facil.enums;

public enum UsuarioEnum {
    ATIVO(1), INATIVO(0);

    private int valor;
    private UsuarioEnum(int valor) {
        this.valor = valor;
    }
    public int getValor() {
        return valor;
    }
}

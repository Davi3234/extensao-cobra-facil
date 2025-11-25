package com.extensao.cobra.facil.entity;

import com.extensao.cobra.facil.enums.UsuarioEnum;
import jakarta.persistence.*;

@Entity(name = "tbusuario")
public class UsuarioEntidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long id;
    @Column(name = "nome_usuario")
    private String nome;
    @Column(name = "email_usuario")
    private String email;
    @Column(name = "telefone_usuario")
    private String telefone;
    @Column(name = "senha_usuario")
    private String senha;
    @Column(name = "ativo_usuario")
    private int ativo;

    public String getTelefone() {
        return telefone;
    }

    public String getNome() {
        return nome;
    }

    public Long getId() {
        return id;
    }

    public String getEmail() {
        return email;
    }

    public String getSenha() {
        return senha;
    }

    public int getAtivo() {
        return ativo;
    }

    public UsuarioEntidade setId(Long id) {
        this.id = id;
        return this;
    }

    public UsuarioEntidade setTelefone(String telefone) {
        this.telefone = telefone;
        return this;
    }

    public UsuarioEntidade setEmail(String email) {
        this.email = email;
        return this;
    }

    public UsuarioEntidade setNome(String nome) {
        this.nome = nome;
        return this;
    }

    public UsuarioEntidade setSenha(String senha) {
        this.senha = senha;
        return this;
    }

    public UsuarioEntidade setAtivo(int ativo) {
        this.ativo = ativo;
        return this;
    }
}

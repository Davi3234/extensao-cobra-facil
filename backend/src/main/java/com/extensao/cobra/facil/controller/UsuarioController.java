package com.extensao.cobra.facil.controller;

import com.extensao.cobra.facil.dto.usuario.UsuarioDtoRequest;
import com.extensao.cobra.facil.dto.usuario.UsuarioDtoResponse;
import com.extensao.cobra.facil.entity.UsuarioEntidade;
import com.extensao.cobra.facil.mapper.UsuarioMapper;
import com.extensao.cobra.facil.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.ArrayList;
import java.util.List;


@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<UsuarioDtoResponse> criar(@RequestBody UsuarioDtoRequest usuarioDtoRequest){
        UsuarioEntidade usuarioEntidade = this.usuarioService.criarUsuario(UsuarioMapper.usuarioEntidade(usuarioDtoRequest));
        return ResponseEntity.ok(UsuarioMapper.criaUsuarioDtoResponse(usuarioEntidade));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UsuarioDtoResponse> atualizar(@PathVariable Long id, @RequestBody UsuarioDtoRequest usuarioDtoRequest){
        UsuarioEntidade usuarioEntidade = this.usuarioService.atualizarUsuario(id, UsuarioMapper.usuarioEntidade(usuarioDtoRequest));
        return ResponseEntity.ok(UsuarioMapper.criaUsuarioDtoResponse(usuarioEntidade));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UsuarioDtoResponse> buscarPorId(@PathVariable Long id){
        UsuarioEntidade usuarioEntidade = this.usuarioService.getUsuarioById(id);
        return ResponseEntity.ok(UsuarioMapper.criaUsuarioDtoResponse(usuarioEntidade));
    }

    @GetMapping
    public ResponseEntity<List<UsuarioDtoResponse>> listar(){
        List<UsuarioEntidade> usuarioEntidades = this.usuarioService.listarUsuarios();
        List<UsuarioDtoResponse> usuarioDtoResponseList = new ArrayList<>();

        for (UsuarioEntidade usuarioEntidade : usuarioEntidades) {
            usuarioDtoResponseList.add(UsuarioMapper.criaUsuarioDtoResponse(usuarioEntidade));
        }

        return ResponseEntity.ok(usuarioDtoResponseList);
    }

    @DeleteMapping("/{id}")
    public void inativar(@PathVariable Long id){
        this.usuarioService.inativarUsuario(id);
    }
    
}

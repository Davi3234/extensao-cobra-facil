package com.extensao.cobra.facil.controller;

import com.extensao.cobra.facil.dto.usuario.CriaUsuarioDtoRequest;
import com.extensao.cobra.facil.dto.usuario.CriaUsuarioDtoResponse;
import com.extensao.cobra.facil.entity.UsuarioEntidade;
import com.extensao.cobra.facil.mapper.UsuarioMapper;
import com.extensao.cobra.facil.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/usuarios")
public class UsuarioController {
    @Autowired
    private UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<CriaUsuarioDtoResponse> criar(@RequestBody CriaUsuarioDtoRequest criaUsuarioDtoRequest){
        UsuarioEntidade usuarioEntidade = this.usuarioService.criarUsuario(UsuarioMapper.usuarioEntidade(criaUsuarioDtoRequest));
        return ResponseEntity.ok(UsuarioMapper.criaUsuarioDtoResponse(usuarioEntidade));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CriaUsuarioDtoResponse> atualizar(@PathVariable Long id, @RequestBody CriaUsuarioDtoRequest criaUsuarioDtoRequest){
        UsuarioEntidade usuarioEntidade = this.usuarioService.atualizarUsuario(id, UsuarioMapper.usuarioEntidade(criaUsuarioDtoRequest));
        return ResponseEntity.ok(UsuarioMapper.criaUsuarioDtoResponse(usuarioEntidade));
    }

    @DeleteMapping("/{id}")
    public void inativar(@PathVariable Long id){
        this.usuarioService.inativarUsuario(id);
    }
}

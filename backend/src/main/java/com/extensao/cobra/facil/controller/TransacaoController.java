package com.extensao.cobra.facil.controller;

import com.extensao.cobra.facil.dto.transacao.CriaTransacaoDtoRequest;
import com.extensao.cobra.facil.dto.transacao.CriaTransacaoDtoResponse;
import com.extensao.cobra.facil.entity.TransacaoEntidade;
import com.extensao.cobra.facil.mapper.TransacaoMapper;
import com.extensao.cobra.facil.service.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transacoes")
public class TransacaoController {

    @Autowired
    private TransacaoService transacaoService;

    @PostMapping
    public ResponseEntity<CriaTransacaoDtoResponse> criar(@RequestBody CriaTransacaoDtoRequest dto) {
        TransacaoEntidade entidade = this.transacaoService.criar(
                TransacaoMapper.transacaoEntidade(dto));
        return ResponseEntity.ok(TransacaoMapper.criaTransacaoDtoResponse(entidade));
    }

    @PutMapping("/{id}")
    public ResponseEntity<CriaTransacaoDtoResponse> atualizar(@PathVariable Long id,
            @RequestBody CriaTransacaoDtoRequest dto) {

        TransacaoEntidade entidade = this.transacaoService.atualizar(
                id,
                TransacaoMapper.transacaoEntidade(dto));

        return ResponseEntity.ok(TransacaoMapper.criaTransacaoDtoResponse(entidade));
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        this.transacaoService.excluir(id);
    }
}

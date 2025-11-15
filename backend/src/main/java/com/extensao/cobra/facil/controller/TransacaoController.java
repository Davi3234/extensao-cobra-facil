package com.extensao.cobra.facil.controller;

import com.extensao.cobra.facil.dto.transacao.CriaTransacaoDtoRequest;
import com.extensao.cobra.facil.dto.transacao.CriaTransacaoDtoResponse;
import com.extensao.cobra.facil.entity.TransacaoEntidade;
import com.extensao.cobra.facil.mapper.TransacaoMapper;
import com.extensao.cobra.facil.service.TransacaoService;
import org.apache.coyote.Response;
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
        TransacaoEntidade transacaoEntidade = this.transacaoService.criarTransacao(TransacaoMapper.transacaoEntidade(dto));

        return ResponseEntity.ok(TransacaoMapper.criaTransacaoDtoResponse(transacaoEntidade));
    }

    @PutMapping("/quitar/{id}")
    public ResponseEntity<CriaTransacaoDtoResponse> quitar(@PathVariable Long id) {
        TransacaoEntidade transacaoEntidade = this.transacaoService.quitarTransacao(id);

        return ResponseEntity.ok(TransacaoMapper.criaTransacaoDtoResponse(transacaoEntidade));
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        this.transacaoService.excluirTransacao(id);
    }
}

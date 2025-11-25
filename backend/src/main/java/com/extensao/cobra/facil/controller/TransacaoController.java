package com.extensao.cobra.facil.controller;

import com.extensao.cobra.facil.dto.transacao.TransacaoDtoRequest;
import com.extensao.cobra.facil.dto.transacao.TransacaoDtoResponse;
import com.extensao.cobra.facil.entity.TransacaoEntidade;
import com.extensao.cobra.facil.mapper.TransacaoMapper;
import com.extensao.cobra.facil.service.TransacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/transacoes")
public class TransacaoController {

    @Autowired
    private TransacaoService transacaoService;

    @PostMapping
    public ResponseEntity<TransacaoDtoResponse> criar(@RequestBody TransacaoDtoRequest dto) {
        TransacaoEntidade transacaoEntidade = this.transacaoService.criarTransacao(TransacaoMapper.transacaoEntidade(dto));

        return ResponseEntity.ok(TransacaoMapper.criaTransacaoDtoResponse(transacaoEntidade));
    }

    @PutMapping("/quitar/{id}")
    public ResponseEntity<TransacaoDtoResponse> quitar(@PathVariable Long id) {
        TransacaoEntidade transacaoEntidade = this.transacaoService.quitarTransacao(id);

        return ResponseEntity.ok(TransacaoMapper.criaTransacaoDtoResponse(transacaoEntidade));
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        this.transacaoService.excluirTransacao(id);
    }

    @GetMapping
    public List<TransacaoDtoResponse> listarTransacoes(){
        List<TransacaoEntidade> transacaoEntidades = this.transacaoService.listarByUsuarioLogado();
        List<TransacaoDtoResponse> transacoesDtoResponse = new ArrayList<>();
        for (TransacaoEntidade transacaoEntidade : transacaoEntidades) {
            transacoesDtoResponse.add(TransacaoMapper.criaTransacaoDtoResponse(transacaoEntidade));
        }

        return  transacoesDtoResponse;
    }
}

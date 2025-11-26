package com.extensao.cobra.facil.controller;

import com.extensao.cobra.facil.dto.transacao.TransacaoDtoRequest;
import com.extensao.cobra.facil.dto.transacao.TransacaoDtoResponse;
import com.extensao.cobra.facil.entity.TransacaoEntidade;
import com.extensao.cobra.facil.entity.UsuarioEntidade;
import com.extensao.cobra.facil.exception.UsuarioJaExistenteException;
import com.extensao.cobra.facil.mapper.TransacaoMapper;
import com.extensao.cobra.facil.service.TransacaoService;
import com.extensao.cobra.facil.service.UsuarioService;
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
    @Autowired
    UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<TransacaoDtoResponse> criar(@RequestBody TransacaoDtoRequest dto) {
        UsuarioEntidade usuarioCredor = usuarioService.getUsuarioById(dto.credorId());
        UsuarioEntidade usuarioDevedor = usuarioService.getUsuarioById(dto.devedorId());

        TransacaoEntidade transacaoEntidadeRequest = TransacaoMapper.transacaoEntidade(dto);
        transacaoEntidadeRequest.setUsuarioDevedor(usuarioDevedor);
        transacaoEntidadeRequest.setUsuarioCredor(usuarioCredor);

        TransacaoEntidade transacaoEntidade = this.transacaoService.criarTransacao(transacaoEntidadeRequest);

        return ResponseEntity.ok(TransacaoMapper.criaTransacaoDtoResponse(transacaoEntidade));
    }

    @PutMapping("/quitar/{id}")
    public ResponseEntity<TransacaoDtoResponse> quitar(@PathVariable Long id) {
        TransacaoEntidade transacaoEntidade = this.transacaoService.quitarTransacao(id);

        return ResponseEntity.ok(TransacaoMapper.criaTransacaoDtoResponse(transacaoEntidade));
    }

    @PostMapping("/inativar/{id}")
    public void inativar(@PathVariable Long id) {
        this.transacaoService.inativarTransacao(id);
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

    @GetMapping("/{id}")
    public TransacaoDtoResponse getTranscao(@PathVariable Long id){
        TransacaoEntidade transacaoEntidade = this.transacaoService.getTransacaoById(id);

        return TransacaoMapper.criaTransacaoDtoResponse(transacaoEntidade);
    }
}

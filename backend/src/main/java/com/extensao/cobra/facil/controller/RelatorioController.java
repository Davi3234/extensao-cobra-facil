package com.extensao.cobra.facil.controller;

import com.extensao.cobra.facil.dto.relatorio.RelatorioSaldoDtoResponse;
import com.extensao.cobra.facil.dto.relatorio.RelatorioTransacaoDtoResponse;
import com.extensao.cobra.facil.service.RelatorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/relatorios")
public class RelatorioController {

    @Autowired
    private RelatorioService relatorioService;

    @GetMapping("/saldo")
    public ResponseEntity<RelatorioSaldoDtoResponse> saldoGeral() {
        return ResponseEntity.ok(relatorioService.calcularSaldo());
    }

    @GetMapping("/quitadas")
    public ResponseEntity<List<RelatorioTransacaoDtoResponse>> quitadas() {
        return ResponseEntity.ok(relatorioService.transacoesQuitadas());
    }

    @GetMapping("/atrasadas")
    public ResponseEntity<List<RelatorioTransacaoDtoResponse>> atrasadas() {
        return ResponseEntity.ok(relatorioService.transacoesAtrasadas());
    }

    @GetMapping("/filtro")
    public ResponseEntity<List<RelatorioTransacaoDtoResponse>> filtro(
            @RequestParam(required = false) Integer status,
            @RequestParam(required = false) LocalDate inicio,
            @RequestParam(required = false) LocalDate fim) {
        return ResponseEntity.ok(relatorioService.filtrar(status, inicio, fim));
    }
}

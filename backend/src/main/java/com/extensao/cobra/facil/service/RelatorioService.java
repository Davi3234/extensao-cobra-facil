package com.extensao.cobra.facil.service;

import java.time.LocalDate;
import java.util.List;

import com.extensao.cobra.facil.mapper.RelatorioMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.extensao.cobra.facil.dto.relatorio.RelatorioSaldoDtoResponse;
import com.extensao.cobra.facil.dto.relatorio.RelatorioTransacaoDtoResponse;
import com.extensao.cobra.facil.entity.TransacaoEntidade;
import com.extensao.cobra.facil.enums.StatusTransacaoEnum;
import com.extensao.cobra.facil.repository.TransacaoRepositorio;

@Service
public class RelatorioService {

    @Autowired
    private TransacaoRepositorio transacaoRepositorio;
    @Autowired
    private TransacaoService transacaoService;
    @Autowired
    private UsuarioService usuarioService;

    public RelatorioSaldoDtoResponse calcularSaldo() {

        Long idUsuario = this.usuarioService.getUsuarioLogado().get().getId();

        Double totalPagar = transacaoRepositorio.totalPagar(idUsuario);
        if (totalPagar == null) totalPagar = 0.0;

        Double totalReceber = this.transacaoRepositorio.totalReceber(idUsuario);

        Double saldo = totalReceber - totalPagar;

        return new RelatorioSaldoDtoResponse(
                totalReceber,
                totalPagar,
                saldo
        );
    }

    public List<RelatorioTransacaoDtoResponse> transacoesQuitadas() {

        Long idUsuario = this.usuarioService.getUsuarioLogado().get().getId();

        List<TransacaoEntidade> quitadas =
                transacaoRepositorio.findQuitadas(
                        idUsuario,
                        StatusTransacaoEnum.QUITADA.getValor()
                );

        return quitadas.stream()
                .map(RelatorioMapper::relatorioDtoResponse)
                .toList();
    }

    public List<RelatorioTransacaoDtoResponse> transacoesAtrasadas() {

        Long idUsuario = this.usuarioService.getUsuarioLogado().get().getId();

        List<TransacaoEntidade> atrasadas =
                transacaoRepositorio.findAtrasadas(
                        idUsuario,
                        StatusTransacaoEnum.PENDENTE.getValor()
                );

        return atrasadas.stream()
                .map(RelatorioMapper::relatorioDtoResponse)
                .toList();
    }
}

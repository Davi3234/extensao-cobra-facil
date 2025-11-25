package com.extensao.cobra.facil.mapper;

import com.extensao.cobra.facil.dto.relatorio.RelatorioTransacaoDtoResponse;
import com.extensao.cobra.facil.entity.TransacaoEntidade;

public class RelatorioMapper {
    public static RelatorioTransacaoDtoResponse relatorioDtoResponse(TransacaoEntidade transacaoEntidade) {
        return new RelatorioTransacaoDtoResponse(
                transacaoEntidade.getId(),
                transacaoEntidade.getValor(),
                transacaoEntidade.getDescricao(),
                transacaoEntidade.getDataVencimento(),
                transacaoEntidade.getDataPagamento(),
                transacaoEntidade.getStatus(),
                UsuarioMapper.criaUsuarioDtoResponse(transacaoEntidade.getUsuarioCredor()),
                UsuarioMapper.criaUsuarioDtoResponse(transacaoEntidade.getUsuarioDevedor()));
    }
}

package com.extensao.cobra.facil.mapper;

import com.extensao.cobra.facil.dto.transacao.TransacaoDtoRequest;
import com.extensao.cobra.facil.dto.transacao.TransacaoDtoResponse;
import com.extensao.cobra.facil.entity.TransacaoEntidade;
import com.extensao.cobra.facil.entity.UsuarioEntidade;

public class TransacaoMapper {

    public static TransacaoEntidade transacaoEntidade(TransacaoDtoRequest dto) {
        return new TransacaoEntidade()
                .setValor(dto.valor())
                .setDescricao(dto.descricao())
                .setDataVencimento(dto.dataVencimento());
    }

    public static TransacaoDtoResponse criaTransacaoDtoResponse(TransacaoEntidade transacaoEntidade) {
        return new TransacaoDtoResponse(
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

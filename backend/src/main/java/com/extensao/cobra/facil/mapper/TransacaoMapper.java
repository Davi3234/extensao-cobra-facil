package com.extensao.cobra.facil.mapper;

import com.extensao.cobra.facil.dto.transacao.CriaTransacaoDtoRequest;
import com.extensao.cobra.facil.dto.transacao.CriaTransacaoDtoResponse;
import com.extensao.cobra.facil.entity.TransacaoEntidade;

public class TransacaoMapper {

    public static TransacaoEntidade transacaoEntidade(CriaTransacaoDtoRequest dto) {
        return new TransacaoEntidade()
                .setValor(dto.valor())
                .setDescricao(dto.descricao())
                .setDataVencimento(dto.dataVencimento())
                .setStatus(dto.status());
    }

    public static CriaTransacaoDtoResponse criaTransacaoDtoResponse(TransacaoEntidade tx) {
        return new CriaTransacaoDtoResponse(
                tx.getId(),
                tx.getValor(),
                tx.getDescricao(),
                tx.getDataVencimento(),
                tx.getDataPagamento(),
                tx.getStatus());
    }
}

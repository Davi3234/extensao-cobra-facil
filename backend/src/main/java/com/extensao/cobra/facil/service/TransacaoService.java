package com.extensao.cobra.facil.service;

import com.extensao.cobra.facil.entity.TransacaoEntidade;
import com.extensao.cobra.facil.enums.StatusTransacaoEnum;
import com.extensao.cobra.facil.repository.TransacaoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepositorio transacaoRepositorio;

    public TransacaoEntidade criarTransacao(TransacaoEntidade transacao) {
        return this.transacaoRepositorio.save(transacao);
    }

    public void excluirTransacao(Long id) {
        this.transacaoRepositorio.deleteById(id);
    }

    public TransacaoEntidade quitarTransacao(Long id) {
        TransacaoEntidade transacaoEntidade = this.transacaoRepositorio.findById(id).get();
        transacaoEntidade
                .setStatus(StatusTransacaoEnum.QUITADA.getValor())
                .setDataPagamento(java.time.LocalDate.now());

        return this.transacaoRepositorio.save(transacaoEntidade);
    }
}

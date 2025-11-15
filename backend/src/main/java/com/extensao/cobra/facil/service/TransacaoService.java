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

    public TransacaoEntidade criar(TransacaoEntidade transacao) {
        return this.transacaoRepositorio.save(transacao);
    }

    public TransacaoEntidade atualizar(Long id, TransacaoEntidade nova) {
        TransacaoEntidade antiga = this.transacaoRepositorio.findById(id).get();

        antiga.setValor(nova.getValor());
        antiga.setDescricao(nova.getDescricao());
        antiga.setDataVencimento(nova.getDataVencimento());
        antiga.setContraparteId(nova.getContraparteId());
        antiga.setStatus(nova.getStatus());

        return this.transacaoRepositorio.save(antiga);
    }

    public void excluir(Long id) {
        this.transacaoRepositorio.deleteById(id);
    }

    public TransacaoEntidade marcarComoQuitada(Long id) {
        TransacaoEntidade tx = this.transacaoRepositorio.findById(id).get();
        tx.setStatus(StatusTransacaoEnum.QUITADA.getValor());
        tx.setDataPagamento(java.time.LocalDate.now());
        return this.transacaoRepositorio.save(tx);
    }
}

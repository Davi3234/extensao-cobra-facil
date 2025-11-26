package com.extensao.cobra.facil.service;

import com.extensao.cobra.facil.entity.TransacaoEntidade;
import com.extensao.cobra.facil.entity.UsuarioEntidade;
import com.extensao.cobra.facil.enums.StatusTransacaoEnum;
import com.extensao.cobra.facil.exception.TransacaoNaoEncontradaException;
import com.extensao.cobra.facil.exception.UsuarioNaoEncontradoException;
import com.extensao.cobra.facil.repository.TransacaoRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Service
public class TransacaoService {

    @Autowired
    private TransacaoRepositorio transacaoRepositorio;
    @Autowired
    private UsuarioService  usuarioService;

    public TransacaoEntidade criarTransacao(TransacaoEntidade transacao) {
        transacao.setStatus(StatusTransacaoEnum.PENDENTE.getValor());
        transacao.setAtivo(true);
        return this.transacaoRepositorio.save(transacao);
    }

    public void inativarTransacao(Long id) {
        TransacaoEntidade transacaoEntidade = this.getTransacaoById(id);
        transacaoEntidade.setAtivo(false);

        this.transacaoRepositorio.save(transacaoEntidade);
    }

    public TransacaoEntidade quitarTransacao(Long id) {
        TransacaoEntidade transacaoEntidade = this.getTransacaoById(id);
        transacaoEntidade
                .setStatus(StatusTransacaoEnum.QUITADA.getValor())
                .setDataPagamento(java.time.LocalDate.now());

        return this.transacaoRepositorio.save(transacaoEntidade);
    }

    public List<TransacaoEntidade> listarByUsuarioLogado(){
        Optional<UsuarioEntidade> usuarioLogado = this.usuarioService.getUsuarioLogado();
        return this.transacaoRepositorio.findByUsuario(usuarioLogado.get().getId());
    }

    public TransacaoEntidade getTransacaoById(Long id) throws TransacaoNaoEncontradaException {
        return this.transacaoRepositorio.findByIdAtivo(id)
                .orElseThrow(() -> new TransacaoNaoEncontradaException(id));
    }
}

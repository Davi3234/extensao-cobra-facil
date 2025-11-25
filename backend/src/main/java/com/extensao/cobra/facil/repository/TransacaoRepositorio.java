package com.extensao.cobra.facil.repository;

import com.extensao.cobra.facil.entity.TransacaoEntidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface TransacaoRepositorio extends JpaRepository<TransacaoEntidade, Long> {
    @Query("""
    SELECT t FROM tbtransacao t
     WHERE t.usuarioCredor.id = :idUsuario
        OR t.usuarioDevedor.id = :idUsuario
    """)
    List<TransacaoEntidade> findByUsuario(Long idUsuario);
}

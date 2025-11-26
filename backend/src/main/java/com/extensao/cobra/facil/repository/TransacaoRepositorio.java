package com.extensao.cobra.facil.repository;

import com.extensao.cobra.facil.entity.TransacaoEntidade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TransacaoRepositorio extends JpaRepository<TransacaoEntidade, Long> {
    @Query("""
    SELECT t FROM tbtransacao t
     WHERE t.ativo = true
        AND (t.usuarioCredor.id = :idUsuario
        OR t.usuarioDevedor.id = :idUsuario)
    """)
    List<TransacaoEntidade> findByUsuario(Long idUsuario);

    @Query("""
        SELECT t
          FROM tbtransacao t
         WHERE t.id = :id
           AND t.ativo = true
    """)
    Optional<TransacaoEntidade> findByIdAtivo(Long id);

    @Query("""
        SELECT SUM(t.valor)
        FROM tbtransacao t
        WHERE t.usuarioDevedor.id = :idUsuario
          AND t.ativo = true
          AND t.status <> 2
    """)
    Double totalPagar(Long idUsuario);

    @Query("""
        SELECT t
        FROM tbtransacao t
        WHERE (t.usuarioCredor.id = :id OR t.usuarioDevedor.id = :id)
          AND t.status = :status
          AND t.ativo = true
    """)
    List<TransacaoEntidade> findQuitadas(Long id, int status);

    @Query("""
        SELECT t
        FROM tbtransacao t
        WHERE (t.usuarioCredor.id = :id OR t.usuarioDevedor.id = :id)
          AND t.status = :status
          AND t.dataVencimento < CURRENT_DATE
          AND t.ativo = true
    """)
    List<TransacaoEntidade> findAtrasadas(Long id, int status);

    @Query("""
        SELECT SUM(t.valor)
        FROM tbtransacao t
        WHERE t.usuarioCredor.id = :idUsuario
          AND t.ativo = true
          AND t.status <> 2
    """)
    Double totalReceber(Long idUsuario);
}

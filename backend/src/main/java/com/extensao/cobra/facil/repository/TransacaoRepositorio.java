package com.extensao.cobra.facil.repository;

import com.extensao.cobra.facil.entity.TransacaoEntidade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TransacaoRepositorio extends JpaRepository<TransacaoEntidade, Long> {
//    Optional<TransacaoEntidade> findByUsuario;
}

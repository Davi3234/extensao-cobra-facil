package com.extensao.cobra.facil.repository;

import com.extensao.cobra.facil.entity.TransacaoEntidade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransacaoRepositorio extends JpaRepository<TransacaoEntidade, Long> {
}

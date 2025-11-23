package com.extensao.cobra.facil.repository;

import com.extensao.cobra.facil.entity.UsuarioEntidade;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsuarioRepositorio extends JpaRepository<UsuarioEntidade, Long> {
    Optional<UsuarioEntidade> findByEmail(String email);
}

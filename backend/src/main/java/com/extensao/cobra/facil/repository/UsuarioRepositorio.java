package com.extensao.cobra.facil.repository;

import com.extensao.cobra.facil.entity.UsuarioEntidade;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsuarioRepositorio extends JpaRepository<UsuarioEntidade, Long> {
}

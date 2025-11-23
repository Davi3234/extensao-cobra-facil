package com.extensao.cobra.facil.config;

import com.extensao.cobra.facil.entity.UsuarioEntidade;
import com.extensao.cobra.facil.repository.UsuarioRepositorio;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class InitUserConfig implements CommandLineRunner {

    private final UsuarioRepositorio repo;
    private final PasswordEncoder encoder;

    public InitUserConfig(UsuarioRepositorio repo, PasswordEncoder encoder) {
        this.repo = repo;
        this.encoder = encoder;
    }

    @Override
    public void run(String... args) {
        if (repo.findByEmail("admin@admin.com").isEmpty()) {

            UsuarioEntidade admin = new UsuarioEntidade();
            admin.setEmail("admin@admin.com");
            admin.setSenha(encoder.encode("123456"));
            admin.setAtivo(1);

            repo.save(admin);

            System.out.println("Usuário admin criado: admin@admin.com / 123456");
        }
    }
}


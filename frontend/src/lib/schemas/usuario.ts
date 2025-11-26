import z from 'zod'

export type RegistrarUsuarioData = z.input<typeof registrarUsuarioSchema>

export const atualizarUsuarioSchema = z.object({
  nome: z.string()
    .min(1, { error: 'Nome é obrigatório' }),
  email: z.email('E-mail inválido')
    .min(1, { error: 'E-mail é obrigatório' }),
  telefone: z.string(),
})

export const registrarUsuarioSchema = atualizarUsuarioSchema.extend({
  senha: z.string()
    .min(1, { error: 'Senha é obrigatório' })
})

export type LoginUsuarioData = z.input<typeof loginUsuarioSchema>

export const loginUsuarioSchema = z
  .object({
    email: z.email('E-mail inválido')
      .min(1, { error: 'E-mail é obrigatório' }),
    senha: z.string().min(1, { error: 'Senha é obrigatório' })
  })

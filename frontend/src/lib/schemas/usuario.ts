import z from 'zod'

export type RegistrarUsuarioData = z.input<typeof registrarUsuarioSchema>

export const registrarUsuarioSchema = z.object({
  nome: z.string().min(1, { error: 'Nome é obrigatório' }),
  email: z.email('E-mail inválido').min(1, { error: 'E-mail é obrigatório' }),
  telefone: z.string(),
  senha: z.string().min(1, { error: 'Senha é obrigatório' })
})

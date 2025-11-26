import z from 'zod'

export type RegistrarTransacaoData = z.input<typeof registrarTransacaoSchema>

export const registrarTransacaoSchema = z.object({
  valor: z.coerce
    .number({
      error: issue => issue.input === undefined ? 'Valor é obrigatório' : 'Valor inválido'
    })
    .min(1, { error: 'Valor deve ser maior que zero' }),
  descricao: z.string()
    .optional(),
  dataVencimento: z.date({
    error: issue => issue.input === undefined ? 'Data é obrigatório' : 'Valor inválido'
  })
    .optional()
    .refine(dataVencimento => {
      if (dataVencimento === undefined) {
        return true
      }

      const now = new Date()

      dataVencimento.setHours(0, 0, 0, 0)
      now.setHours(0, 0, 0, 0)

      return dataVencimento >= now
    }, { error: 'Data de vencimento deve ser maior ou igual a data de hoje' }),
  credorId: z.number({
    error: issue => !issue.input || isNaN(issue.input as any)
      ? 'Credor é obrigatório'
      : 'Valor inválido'
  })
    .int(),
  devedorId: z.number({
    error: issue => !issue.input || isNaN(issue.input as any)
      ? 'Devedor é obrigatório'
      : 'Valor inválido'
  })
    .int(),
})

import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export function formatPtBR(date: Date) {
  return format(date, 'dd \'de\' MMMM \'de\' yyyy', { locale: ptBR })
}

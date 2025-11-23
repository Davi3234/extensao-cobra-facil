import { API } from '@/util/api'
import { env } from '@/util/env'

export const api = new API({ baseUrl: env('API_URL') })

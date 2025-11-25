import { IResult, Result } from '@/util/result'

export type RequestApi = Omit<RequestInit, 'body'> & {
  body?: object
  onRequest?: (url: string, options?: RequestApi) => RequestApi | undefined
  onResponse?: (response: IResult<any>) => any
}

export async function createApi(prefix?: string, superOptions?: {
  onRequest?: (url: string, options?: RequestApi) => RequestApi | undefined
  onResponse?: (response: IResult<any>) => any
}) {
  return {
    get: async<TResponse = any>(url: string, options?: RequestApi) => {
      return await internalRequest<TResponse>(`${prefix}${url}`, { ...options, ...superOptions, method: 'GET' })
    },
    post: async<TResponse = any>(url: string, options?: RequestApi) => {
      return await internalRequest<TResponse>(`${prefix}${url}`, { ...options, ...superOptions, method: 'POST' })
    },
    put: async<TResponse = any>(url: string, options?: RequestApi) => {
      return await internalRequest<TResponse>(`${prefix}${url}`, { ...options, ...superOptions, method: 'PUT' })
    },
    delete: async<TResponse = any>(url: string, options?: RequestApi) => {
      return await internalRequest<TResponse>(`${prefix}${url}`, { ...options, ...superOptions, method: 'DELETE' })
    },
    options: async<TResponse = any>(url: string, options?: RequestApi) => {
      return await internalRequest<TResponse>(`${prefix}${url}`, { ...options, ...superOptions, method: 'OPTIONS' })
    },
  }
}

async function internalRequest<TResponse = any>(url: string, options?: RequestApi) {
  try {
    const optionsRequest = {
      ...options,
      body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
      headers: {
        ...options?.headers,
        'Content-Type': (options?.headers as any)?.['Content-Type'] || 'application/json',
      },
    }

    const fullOptions = options?.onRequest ? options?.onRequest(url, optionsRequest as any) || optionsRequest : optionsRequest

    const response = await fetch(url, fullOptions as any)

    if (!response.ok) {
      return Result.error<TResponse>(await getError(response))
    }

    const responseData = await response.json()

    if (Result.isResult<TResponse>(responseData)) {
      return responseData
    }

    return Result.ok<TResponse>(responseData as TResponse)
  } catch (error: any) {
    return Result.error<TResponse>(error.message)
  }
}

async function getError(response: Response) {
  try {
    const data = await response.clone().json()

    if (data?.error) {
      return data.error
    }

    return JSON.stringify(data)
  } catch { }

  switch (response.status) {
    case 401:
      return 'Usuário não autenticado'
    case 403:
      return 'Credenciais inválidas'
  }

  return response.statusText || 'Erro desconhecido'
}

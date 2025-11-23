import { Result } from '@/util/result'

export type RequestApi = Omit<RequestInit, 'body'> & { body?: object }

export class API {

  constructor(
    private _options: { baseUrl?: string } = {}
  ) { }

  async get<TResponse = any>(url: string, options?: RequestApi) {
    return API.request<TResponse>(`${this._options.baseUrl}${url}`, {
      ...options,
      method: 'GET',
    })
  }

  async post<TResponse = any>(url: string, options?: RequestApi) {
    return API.request<TResponse>(`${this._options.baseUrl}${url}`, {
      ...options,
      method: 'POST',
    })
  }

  async put<TResponse = any>(url: string, options?: RequestApi) {
    return API.request<TResponse>(`${this._options.baseUrl}${url}`, {
      ...options,
      method: 'PUT',
    })
  }

  async delete<TResponse = any>(url: string, options?: RequestApi) {
    return API.request<TResponse>(`${this._options.baseUrl}${url}`, {
      ...options,
      method: 'DELETE',
    })
  }

  async options<TResponse = any>(url: string, options?: RequestApi) {
    return API.request<TResponse>(`${this._options.baseUrl}${url}`, {
      ...options,
      method: 'OPTIONS',
    })
  }

  private static async request<TResponse = any>(url: string, options?: RequestApi) {
    try {
      const response = await fetch(url, {
        ...options,
        body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
        headers: {
          ...options?.headers,
          'Content-Type': (options?.headers as any)?.['Content-Type'] || 'application/json',
        },
      })

      if (!response.ok) {
        return Result.error<TResponse>(await API.getError(response))
      }

      const responseData = await response.json()

      return Result.ok<TResponse>(responseData as TResponse)
    } catch (error: any) {
      return Result.error<TResponse>(error.message)
    }
  }

  private static async getError(response: Response) {
    try {
      const data = await response.clone().json()

      if (data?.error) {
        return data.error
      }

      return JSON.stringify(data)
    } catch { }

    try {
      return await response.text()
    } catch { }

    return response.statusText || 'Erro desconhecido'
  }
}

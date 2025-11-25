export type IResult<T = any> = {
  ok: boolean
  value: T
  error: string | null
}

export class Result {

  private constructor() { }

  static ok<T = any>(value: T) {
    return { ok: true, value, error: null } as IResult<T>
  }

  static error<T = any>(error: string) {
    return { ok: false, value: null, error: error } as IResult<T>
  }

  static fromResult<T = any>({ ok, value, error }: { ok: boolean, value?: any | null, error?: string | null }) {
    return { ok, value: value || null, error: error || null } as IResult<T>
  }

  static isResult<T = any>(result: any): result is IResult<T> {
    return typeof result === 'object' &&
      result !== null &&
      typeof result.ok === 'boolean' &&
      'value' in result &&
      (typeof result.error === 'string' || result.error === null)
  }
}

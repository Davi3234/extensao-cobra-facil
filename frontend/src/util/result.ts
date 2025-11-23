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
}

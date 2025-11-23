export type IResult<T = any> = {
  ok: boolean
  value: T
  error: string | null
}

export class Result<T> implements IResult<T> {

  readonly value: T
  readonly error: string | null

  constructor(readonly ok: boolean, response?: { value?: T, error?: string }) {
    this.value = response?.value || null!
    this.error = response?.error || null!
  }

  static ok<T = any>(value: T) {
    return new Result<T>(true, { value })
  }

  static error<T = any>(error: string) {
    return new Result<T>(false, { error })
  }
}

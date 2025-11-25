export type Env = {
  API_URL: string
}

export function env<TEnv extends keyof Env>(name: TEnv): Env[TEnv] {
  return process.env[name] as Env[TEnv]
}

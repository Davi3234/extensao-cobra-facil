export const generateToken = (data: Record<string, any>) => {
  const payload = { ...data, exp: Date.now() + 1000 * 60 * 60 }

  return btoa(JSON.stringify(payload))
}

export const validateToken = (token: string) => {
  try {
    const payload = JSON.parse(atob(token))

    return payload.exp > Date.now()
  } catch {
    return false
  }
}

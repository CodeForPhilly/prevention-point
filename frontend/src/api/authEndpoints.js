import cookieValue, { setAuthCookie } from "./cookies"

export const createToken = api => async (username, password) => {
  const response = await api.post("/token/", { username, password })
  if (response.ok) {
    setAuthCookie("JWT_ACCESS", response.data.access)
    setAuthCookie("JWT_REFRESH", response.data.refresh)
  }
  return response
}

export const verifyToken = api => async () => {
  const accessToken = cookieValue("JWT_ACCESS")
  const response = await api.post("/token/verify/", { token: accessToken })
  return response
}

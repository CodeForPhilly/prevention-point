export const createToken = api => async (username, password) => {
  const response = await api.post("/token/", { username, password })
  if (response.ok) {
    localStorage.setItem("JWT_ACCESS", response.data.access)
    localStorage.setItem("JWT_REFRESH", response.data.refresh)
  }
  return response
}

export const verifyToken = api => async () => {
  const accessToken = localStorage.getItem("JWT_ACCESS")
  const response = await api.post("/token/verify/", { token: accessToken })
  return response
}

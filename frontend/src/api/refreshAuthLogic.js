const refreshAuthLogic = api => async failedRequest => {
  const refreshToken = localStorage.getItem("JWT_REFRESH")
  const tokenRefreshResponse = await api.post("/token/refresh/", {
    refresh: refreshToken,
  })
  localStorage.setItem("JWT_ACCESS", tokenRefreshResponse.data.token)
  failedRequest.response.config.baseURL = ""
  failedRequest.response.config.headers["Authentication"] = `Bearer ${
    tokenRefreshResponse.data.access
  }`
  return Promise.resolve()
}

export default refreshAuthLogic

const refreshAuthLogic = api => async failedRequest => {
  const refreshToken = localStorage.getItem("JWT_REFRESH")
  const tokenRefreshResponse = await api.post("/token/refresh/", {
    refresh: refreshToken,
  })
  localStorage.setItem("JWT_ACCESS", tokenRefreshResponse.data.access)
  failedRequest.response.config.baseURL = ""

  // the refreshed token should be in the post data for this url
  if (failedRequest.response.config.url === "/api/token/verify/") {
    failedRequest.response.config.data = {
      token: tokenRefreshResponse.data.access,
    }
  }

  // put the refreshed token in the header and retry the request
  failedRequest.response.config.headers["Authentication"] = `Bearer ${
    tokenRefreshResponse.data.access
  }`

  return Promise.resolve()
}

export default refreshAuthLogic

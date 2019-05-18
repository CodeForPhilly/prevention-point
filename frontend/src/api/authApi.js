import apisauce from "apisauce"
import createAuthRefreshInterceptor from "axios-auth-refresh"
import refreshAuthLogic from "./refreshAuthLogic"

const create = () => {
  const api = apisauce.create({
    baseURL: "/api",
  })

  createAuthRefreshInterceptor(api.axiosInstance, refreshAuthLogic(api))

  api.addRequestTransform(request => {
    const jwtAccess = localStorage.getItem("JWT_ACCESS")
    if (jwtAccess) {
      request.headers.Authorization = `Bearer ${jwtAccess}`
    }
  })

  const createToken = async (username, password) => {
    const response = await api.post("/token/", { username, password })
    if (response.ok) {
      localStorage.setItem("JWT_ACCESS", response.data.access)
      localStorage.setItem("JWT_REFRESH", response.data.refresh)
    }
    return response
  }

  const verifyToken = async () => {
    const accessToken = localStorage.getItem("JWT_ACCESS")
    const response = await api.post("/token/verify/", { token: accessToken })
    return response
  }

  return {
    createToken,
    verifyToken,
  }
}

export default create()

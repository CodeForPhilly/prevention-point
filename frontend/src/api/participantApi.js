import apisauce from "apisauce"
import createAuthRefreshInterceptor from "axios-auth-refresh"
import refreshAuthLogic from "./refreshAuthLogic"

const create = () => {
  const api = apisauce.create({
    baseURL: "/api",
  })

  createAuthRefreshInterceptor(api.axiosInstance, refreshAuthLogic(api))

  const getParticipants = async () => {
    const accessToken = localStorage.getItem("JWT_ACCESS")
    const response = await api.get("/participants/", { token: accessToken })
    return response
  }

  return {
    getParticipants,
  }
}

export default create()

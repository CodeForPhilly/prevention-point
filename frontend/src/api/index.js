import apisauce from "apisauce"
import createAuthRefreshInterceptor from "axios-auth-refresh"
import refreshAuthLogic from "./refreshAuthLogic"
import { createToken, verifyToken } from "./authEndpoints"
import { getQueue } from "./queueEndpoints"
import {
  getParticipants,
  getParticipant,
  updateParticipant,
  createParticipant,
} from "./participantEndpoints"
import { getVisits, updateVisits, createVisits } from "./visitsEnpoints"

const create = () => {
  const api = apisauce.create({
    baseURL: "/api",
  })

  createAuthRefreshInterceptor(api.axiosInstance, refreshAuthLogic(api))

  api.addRequestTransform(request => {
    if (!["/token/", "/token/verify/"].includes(request.url)) {
      const jwtAccess = localStorage.getItem("JWT_ACCESS")
      if (jwtAccess) {
        request.headers.Authorization = `Bearer ${jwtAccess}`
      }
    }
  })

  return {
    createToken: createToken(api),
    verifyToken: verifyToken(api),
    getQueue: getQueue(api),
    getParticipants: getParticipants(api),
    getParticipant: getParticipant(api),
    updateParticipant: updateParticipant(api),
    createParticipant: createParticipant(api),
    getVisits: getVisits(api),
    updateVisits: updateVisits(api),
    createVisits: createVisits(api),
  }
}

export default create()

import apisauce from "apisauce"
import createAuthRefreshInterceptor from "axios-auth-refresh"
import refreshAuthLogic from "./refreshAuthLogic"
import { getParticipants } from "./participantEndpoints"
import { createToken, verifyToken } from "./authEndpoints"
import { getQueue } from "./queueEndpoints"
import { postFrontDeskEvent } from "./frontDeskEventEndpoints"
import {
  getVisits,
  updateVisits,
  createVisits,
  patchVisit,
} from "./visitEndpoints"

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
    postFrontDeskEvent: postFrontDeskEvent(api),
    getParticipants: getParticipants(api),
    getVisits: getVisits(api),
    updateVisits: updateVisits(api),
    createVisits: createVisits(api),
    patchVisit: patchVisit(api),
  }
}

export default create()

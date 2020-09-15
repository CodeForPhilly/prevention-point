import apisauce from "apisauce"
import createAuthRefreshInterceptor from "axios-auth-refresh"
import refreshAuthLogic from "./refreshAuthLogic"
import {
  getParticipants,
  createParticipant,
  updateParticipant,
  getParticipantById,
} from "./participantEndpoints"
import { createToken, verifyToken } from "./authEndpoints"
import { getQueue } from "./queueEndpoints"
import { postFrontDeskEvent } from "./frontDeskEventEndpoints"
import {
  getVisits,
  updateVisits,
  createVisits,
  patchVisit,
} from "./visitEndpoints"
import { getInsurers } from "./insurersEndpoints"
import { getPrograms, getProgram, patchProgram } from "./programEndpoints"
import cookieValue from "./cookies"

const create = () => {
  const api = apisauce.create({
    baseURL: "/api",
  })

  createAuthRefreshInterceptor(api.axiosInstance, refreshAuthLogic(api))

  api.addRequestTransform(request => {
    if (!["/token/", "/token/verify/"].includes(request.url)) {
      const jwtAccess = cookieValue("JWT_ACCESS")
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
    createParticipant: createParticipant(api),
    updateParticipant: updateParticipant(api),
    getParticipantById: getParticipantById(api),
    getVisits: getVisits(api),
    updateVisits: updateVisits(api),
    createVisits: createVisits(api),
    patchVisit: patchVisit(api),
    getInsurers: getInsurers(api),
    getPrograms: getPrograms(api),
    getProgram: getProgram(api),
    patchProgram: patchProgram(api),
  }
}

export default create()

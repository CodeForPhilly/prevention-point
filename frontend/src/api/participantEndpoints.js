import queryString from "query-string"

const removeEmptyParams = params => {
  let filteredParams = {}
  for (const key in params) {
    if (["", null, undefined].includes(params[key])) continue
    filteredParams[key] = params[key]
  }
  return filteredParams
}

export const getParticipants = api => async params => {
  const queryParams = queryString.stringify(removeEmptyParams(params))
  return await api.get(
    queryParams ? `/api/participants/?${queryParams}` : "/api/participants/"
  )
}

export const getParticipantById = api => async id =>
  await api.get(`/api/participants/${id}/`)

export const getParticipantByName = api => async (firstname, lastname) =>
  await api.get(
    `/api/participants/?first_name=${firstname}&last_name=${lastname}`
  )

export const getParticipant = api => async id =>
  await api.get(`/api/participants/${id}`)

export const getParticipantVisits = api => async id =>
  await api.get(`/api/participants/${id}/visits/`)

export const updateParticipant = api => async (id, body) =>
  await api.put(`/api/participants/${id}/`, body)

export const createParticipant = api => async body =>
  await api.post("/api/participants/", body)

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
    queryParams ? `participants/?${queryParams}` : "participants/"
  )
}

export const getParticipantById = api => async id =>
  await api.get(`participants/${id}/`)

export const getParticipantByName = api => async (firstname, lastname) =>
  await api.get(`participants/?first_name=${firstname}&last_name=${lastname}`)

export const getParticipant = api => async id =>
  await api.get(`/participants/${id}`)

export const getParticipantVisits = api => async id =>
  await api.get(`/participants/${id}/visits/`)

export const updateParticipant = api => async (id, body) =>
  await api.put(`/participants/${id}/`, body)

export const createParticipant = api => async body =>
  await api.post("/participants/", body)

// export const postParticipant = api => async (id, body) =>
// await api.post(`/participant/${id}`, body)

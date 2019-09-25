export const getParticipants = api => async () => await api.get("participants/")

export const getParticipantById = api => async id =>
  await api.get(`participants/${id}/`)

export const getParticipantByName = api => async (firstname, lastname) =>
  await api.get(`participants/?first_name=${firstname}&last_name=${lastname}`)

export const getParticipant = api => async id =>
  await api.get(`/participant/${id}`)

export const postParticipant = api => async (id, body) =>
  await api.post(`/participant/${id}`, body)

export const getParticipants = api => async () => await api.get("participants/")

export const getParticipantById = api => async id =>
  await api.get(`participants/${id}/`)

export const getParticipantByName = api => async (firstname, lastname) =>
  await api.get(`participants/?first_name=${firstname}&last_name=${lastname}`)

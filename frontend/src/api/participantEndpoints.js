export const getParticipants = api => async params =>
  await api.get("participants/", params)

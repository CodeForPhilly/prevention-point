export const getParticipants = api => async params => {
  if (params) {
    await api.get("participants/", params)
  } else {
    await api.get("participants/")
  }
}

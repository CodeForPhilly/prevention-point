export const getQueue = api => async programId =>
  await api.get(`programs/${programId}/queue/`)

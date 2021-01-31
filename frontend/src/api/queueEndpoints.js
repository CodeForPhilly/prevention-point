export const getQueue = api => async programId =>
  await api.get(`/api/programs/${programId}/queue/`)

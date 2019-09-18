export const getQueue = api => async queueId =>
  await api.get(`programs/${queueId}/queue/`)

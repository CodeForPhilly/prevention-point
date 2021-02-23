export const getFrontDeskEvent = api => async id =>
  await api.get(`/api/front-desk-events/${id}/`)

export const postFrontDeskEvent = api => async data =>
  await api.post("/api/front-desk-events/", data)

export const patchFrontDeskEvent = api => async (id, data) =>
  await api.patch(`/api/front-desk-events/${id}/`, data)

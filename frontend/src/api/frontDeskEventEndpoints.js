export const getFrontDeskEvent = api => async id =>
  await api.get(`front-desk-events/${id}/`)

export const postFrontDeskEvent = api => async data =>
  await api.post("front-desk-events/", data)

export const patchFrontDeskEvent = api => async (id, data) =>
  await api.patch(`front-desk-events/${id}/`, data)

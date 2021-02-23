// "visits": "http://localhost:8000/api/visits/",

export const getVisits = api => async () => await api.get("/api/visits/")

export const updateVisits = api => async (id, body) =>
  await api.put(`/api/visits/${id}/`, body)

export const createVisits = api => async body =>
  await api.post("/api/visits/", body)

export const patchVisit = api => async (visitId, data) =>
  await api.patch(`/api/visits/${visitId}/`, data)

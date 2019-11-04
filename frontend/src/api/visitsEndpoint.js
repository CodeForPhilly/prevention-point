// "visits": "http://localhost:8000/api/visits/",

export const getVisits = api => async () => await api.get("visits/")

export const updateVisits = api => async (id, body) =>
  await api.put(`/visits/${id}/`, body)

export const createVisits = api => async body =>
  await api.post("/visits/", body)

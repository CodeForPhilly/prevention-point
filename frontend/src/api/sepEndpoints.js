export const createSEP = api => async body => await api.post("/api/sep/", body)
export const getSepDataByVisitId = api => async visitId =>
  await api.get(`/api/sep?visit_id=${visitId}`)

export const createSEP = api => async body => await api.post("/sep/", body)
export const getSepDataByVisitId = api => async visitId =>
  await api.get(`/sep?visit_id=${visitId}`)

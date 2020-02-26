// /api/program-service-map/
export const getProgramServiceMap = api => async () =>
  await api.get("program-service-map/")

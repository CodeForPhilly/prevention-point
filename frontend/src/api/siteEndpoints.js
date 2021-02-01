export const getSites = api => async () => await api.get("/api/sites/")
export const getSite = api => async siteId =>
  await api.get(`/api/sites/${siteId}`)

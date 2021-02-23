export const getServiceBySlug = api => async slug =>
  await api.get(`/api/services/?slug=${slug}`)

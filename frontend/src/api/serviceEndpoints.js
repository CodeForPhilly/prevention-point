export const getServiceBySlug = api => async slug =>
  await api.get(`services/?slug=${slug}`)

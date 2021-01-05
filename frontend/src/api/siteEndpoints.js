export const getSites = api => async () => await api.get("sites/")
export const getSite = api => async siteId => await api.get(`sites/${siteId}`)

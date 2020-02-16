export const getPrograms = api => async () => await api.get("programs/")
export const getProgram = api => async id => await api.get(`programs/${id}/`)
export const patchProgram = api => async (id, body) =>
  await api.patch(`programs/${id}/`, body)

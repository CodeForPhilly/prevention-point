export const getPrograms = api => async () => api.get("/api/programs/")
export const getProgram = api => async id => api.get(`/api/programs/${id}/`)
export const patchProgram = api => async (id, body) =>
  api.patch(`/api/programs/${id}/`, body)

document.getElementsByClassName("header")

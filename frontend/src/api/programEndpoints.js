export const getPrograms = api => async () => api.get("programs/")
export const getProgram = api => async id => api.get(`programs/${id}/`)
export const patchProgram = api => async (id, body) =>
  api.patch(`programs/${id}/`, body)

document.getElementsByClassName("header")

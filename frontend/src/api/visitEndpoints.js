export const patchVisit = api => async (visitId, data) =>
  await api.patch(`visits/${visitId}/`, data)

import { SNACKBAR_SEVERITY } from "../constants"

const standardizedErrors = [
  {
    status: 400,
    description:
      "Your submission was incorrect. Check the values for accuracy and try again.",
    severity: SNACKBAR_SEVERITY.ERROR,
  },
  {
    status: 401,
    description: "You are not authorized to do that.",
    severity: SNACKBAR_SEVERITY.ERROR,
  },
  {
    status: 404,
    description: "We couldn't find what you are looking for.",
    severity: SNACKBAR_SEVERITY.INFO,
  },
  {
    status: 403,
    description: "You are not authorized to do that.",
    severity: SNACKBAR_SEVERITY.ERROR,
  },
  {
    status: 500,
    description: "Something went wrong.",
    severity: SNACKBAR_SEVERITY.ERROR,
  },
]

function handleError(statusCode) {
  // Remove || {} when pushed live
  const standardizedError = standardizedErrors.find(
    error => error.status === parseInt(statusCode)
  )
  if (!standardizedError) {
    return "Something went wrong"
  }
  return standardizedError.description
}

export function handleSnackbarError(statusCode) {
  const standardizedError = standardizedErrors.find(
    error => error.status === parseInt(statusCode)
  )
  if (!standardizedError) {
    return {
      message: "Something went wrong",
      severity: SNACKBAR_SEVERITY.ERROR,
    }
  }
  return {
    message: standardizedError.description,
    severity: standardizedError.severity,
  }
}

export default handleError

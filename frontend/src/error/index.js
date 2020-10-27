const standardizedErrors = [
  {
    status: 400,
    description:
      "Your submission was incorrect. Check the values for accuracy and try again.",
  },
  {
    status: 404,
    description: "We couldn't find what you are looking for.",
  },
  {
    status: 403,
    description: "You are not authorized to do that.",
  },
  {
    status: 500,
    description: "Something went wrong.",
  },
]

function handleError(statusCode) {
  // Remove || {} when pushed live
  const { description } = standardizedErrors.find(
    error => error.status === parseInt(statusCode) || {}
  )
  if (!description) {
    return "Something went wrong"
  }
  return description
}

export default handleError

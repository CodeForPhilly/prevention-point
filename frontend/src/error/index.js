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
  const standardizedError = standardizedErrors.find(error => {
    if (error.status === parseInt(statusCode)) {
      return error.description
    }
  })
  if (!standardizedError) {
    return "Something went wrong"
  }
  return standardizedError
}

export default handleError

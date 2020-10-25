/* eslint-disable no-console */
import * as Yup from "yup"

const searchErrorMessage = "Please enter a participant id or a name"
const searchSchema = Yup.object().shape(
  {
    pp_id: Yup.string().when(["first_name", "last_name"], {
      is: (firstName, lastName) => !firstName && !lastName,
      then: Yup.string().required(searchErrorMessage),
    }),
    first_name: Yup.string().when(["pp_id", "last_name"], {
      is: (ppId, lastName) => !ppId && !lastName,
      then: Yup.string().required(searchErrorMessage),
    }),
    last_name: Yup.string().when(["pp_id", "first_name"], {
      is: (ppId, firstName) => !ppId && !firstName,
      then: Yup.string().required(searchErrorMessage),
    }),
  },
  [
    ["pp_id", "first_name"],
    ["pp_id", "last_name"],
    ["first_name", "last_name"],
  ]
)

// Options for Visit Schema:
// Strict doesn't coerce any values
// Abort Early bails out at the first sign of error
// Strip unknown removes unknown values, set to false because we don't expect any unknown values
const options = {
  strict: true,
  abortEarly: true,
  stripUnknown: false,
}

const visitSchema = Yup.object().shape({
  id: Yup.number()
    .required()
    .positive()
    .integer(),
  participant: Yup.number()
    .required()
    .positive()
    .integer(),
  // To do: validate that only services available for each program appear, using 'when' maybe?
  program: Yup.number()
    .required()
    .positive()
    .integer()
    .min(1)
    .max(10),
  service: Yup.number()
    .required()
    .positive()
    .integer(),
  notes: Yup.string().notRequired(),
  urgency: Yup.number()
    .required()
    .positive()
    .integer()
    .min(1)
    .max(4),
})

const validateVisitForm = data => {
  let valid = visitSchema
    .validate(data, options)
    .then(() => "Success")
    .catch(err => err)
  return valid
}

export { searchSchema, validateVisitForm }

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
  abortEarly: false,
  stripUnknown: false,
}

const visitSchema = Yup.object().shape({
  id: Yup.number()
    .defined()
    .positive()
    .integer(),
  participant: Yup.number().when("id", {
    is: null,
    then: Yup.number().defined(),
    otherwise: Yup.number()
      .required()
      .positive()
      .integer(),
  }),
  program: Yup.number()
    .required()
    .positive()
    .integer(),
  service: Yup.number()
    .required()
    .positive()
    .integer(),
  notes: Yup.string().notRequired(),
  urgency: Yup.number()
    .required()
    .positive()
    .integer(),
})

const validateVisitForm = data => {
  let errors = []
  return visitSchema
    .validate(data, options)
    .then(() => [])
    .catch(err => {
      err.inner.map(item => {
        let obj = { name: item.path, message: item.message }
        errors.push(obj)
      })
      return errors
    })
}

const SEPSearchErrorMessage = "Please enter a value in at least one field"
const SEPSearchSiteErrorMessage = "Please select a site"
const SEPSearchSchema = Yup.object().shape(
  {
    site_id: Yup.number().required(SEPSearchSiteErrorMessage),
    sep_id: Yup.string().when(["last_name", "date_of_birth", "maiden_name"], {
      is: (lastName, dateOfBirth, maidenName) =>
        !lastName && !dateOfBirth && !maidenName,
      then: Yup.string().required(SEPSearchErrorMessage),
    }),
    last_name: Yup.string().when(["sep_id", "date_of_birth", "maiden_name"], {
      is: (sepId, dateOfBirth, maidenName) =>
        !sepId && !dateOfBirth && !maidenName,
      then: Yup.string().required(SEPSearchErrorMessage),
    }),
    date_of_birth: Yup.string().when(["last_name", "sep_id", "maiden_name"], {
      is: (lastName, sepId, maidenName) => !lastName && !sepId && !maidenName,
      then: Yup.string().required(SEPSearchErrorMessage),
    }),
    maiden_name: Yup.string().when(["last_name", "date_of_birth", "sep_id"], {
      is: (lastName, dateOfBirth, sepId) => !lastName && !dateOfBirth && !sepId,
      then: Yup.string().required(SEPSearchErrorMessage),
    }),
  },
  [
    ["last_name", "date_of_birth"],
    ["last_name", "sep_id"],
    ["maiden_name", "date_of_birth"],
    ["sep_id", "date_of_birth"],
    ["sep_id", "maiden_name"],
    ["last_name", "maiden_name"],
  ]
)

const SEPNeedleErrorMessage = "Please complete all fields"
const SEPNeedleSchema = Yup.object().shape({
  needles_in: Yup.number().required(SEPNeedleErrorMessage),
  needles_out: Yup.number().required(SEPNeedleErrorMessage),
  visit_date: Yup.string().required(SEPNeedleErrorMessage),
})

// eslint-disable-next-line no-unused-vars
const participantSchema = Yup.object().shape({
  first_name: Yup.string()
    .required()
    .max(50),
  last_name: Yup.string()
    .required()
    .max(100),
  date_of_birth: Yup.date().required(),
  uuid: Yup.string()
    .required()
    .max(200),
  sep_id: Yup.number()
    .defined()
    .positive(),
  maiden_name: Yup.string()
    .notRequired()
    .max(100),
})

export { searchSchema, SEPSearchSchema, SEPNeedleSchema, validateVisitForm }

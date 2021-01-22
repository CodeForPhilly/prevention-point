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
  needles_exchanged: Yup.number().defined(SEPNeedleErrorMessage),
  visit_date: Yup.string().required(SEPNeedleErrorMessage),
})

// Options for Visit Schema:
// Strict doesn't coerce any values
// Abort Early bails out at the first sign of error
// Strip unknown removes unknown values, set to false because we don't expect any unknown values
const options = {
  strict: true,
  abortEarly: false,
  stripUnknown: false,
}

const VISIT_SCHEMA = "VISIT_SCHEMA"
const PARTICIPANT_SCHEMA = "PARTICIPANT_SCHEMA"

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

const participantSchema = Yup.object().shape({
  first_name: Yup.string()
    .required()
    .min(2)
    .max(50),
  last_name: Yup.string()
    .required()
    .min(2)
    .max(100),
  date_of_birth: Yup.date()
    .required()
    .min(new Date("1899-12-31"))
    .max(new Date(Date.now())),
  pp_id: Yup.string()
    .required()
    .min(4)
    .max(200),
  sep_id: Yup.string()
    .required()
    .matches(/^\d+$/),
  maiden_name: Yup.string()
    .notRequired()
    .max(100),
  is_insured: Yup.boolean().required(),
  insurer: Yup.string()
    .notRequired()
    .when("is_insured", {
      is: false,
      then: Yup.string().matches(/^\s*$/, { excludeEmptyString: true }),
      otherwise: Yup.string().matches(/^\d+$/),
    }),
})

const validateForm = (data, inputSchema) => {
  let errors = []
  let schema
  if (inputSchema === VISIT_SCHEMA) {
    schema = visitSchema
  } else {
    schema = participantSchema
  }
  return schema
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

export {
  searchSchema,
  SEPSearchSchema,
  SEPNeedleSchema,
  validateForm,
  VISIT_SCHEMA,
  PARTICIPANT_SCHEMA,
}

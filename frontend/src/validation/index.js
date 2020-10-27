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
    .integer()
    .min(1)
    .max(10),
  service: Yup.number()
    .when("program", {
      is: 1,
      then: Yup.number()
        .required()
        .positive()
        .integer()
        .min(1)
        .max(5),
    })
    .when("program", {
      is: 2,
      then: Yup.number()
        .required()
        .positive()
        .integer()
        .min(6)
        .max(10),
    })
    .when("program", {
      is: 3,
      then: Yup.number()
        .required()
        .positive()
        .integer()
        .min(11)
        .max(15),
    })
    .when("program", {
      is: 4,
      then: Yup.number()
        .required()
        .positive()
        .integer()
        .min(16)
        .max(19),
    })
    .when("program", {
      is: 5,
      then: Yup.number()
        .required()
        .positive()
        .integer()
        .min(20)
        .max(24),
    })
    .when("program", {
      is: 6,
      then: Yup.number()
        .required()
        .positive()
        .integer()
        .min(25)
        .max(29),
    })
    .when("program", {
      is: 7,
      then: Yup.number()
        .required()
        .positive()
        .integer()
        .min(30)
        .max(34),
    })
    .when("program", {
      is: 8,
      then: Yup.number()
        .required()
        .positive()
        .integer()
        .min(35)
        .max(39),
    })
    .when("program", {
      is: 9,
      then: Yup.number()
        .required()
        .positive()
        .integer()
        .min(40)
        .max(43),
    })
    .when("program", {
      is: 10,
      then: Yup.number()
        .required()
        .positive()
        .integer()
        .test(value => value === 44),
    }),
  notes: Yup.string().notRequired(),
  urgency: Yup.number()
    .required()
    .positive()
    .integer()
    .max(4),
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

export { searchSchema, validateVisitForm }

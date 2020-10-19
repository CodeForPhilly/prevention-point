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
const SEPSearchSchema = Yup.object().shape(
  {
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

export { searchSchema, SEPSearchSchema }

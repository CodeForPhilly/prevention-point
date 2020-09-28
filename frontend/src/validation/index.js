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

export { searchSchema }

import { createMuiTheme } from "@material-ui/core/styles"

const theme = createMuiTheme({
  palette: {
    primary: { main: "#086375", contrastText: "#ffffff" },
    secondary: { main: "#119da4", contrastText: "#ffffff" },
    background: {
      default: "#F2FCFF",
    },
  },
  typography: {
    h2: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    subtitle1: {
      fontWeight: 500,
      fontSize: "1.1rem",
      lineHeight: 1.1,
    },
    body1: {
      fontWeight: 400,
    },
  },
  props: {
    MuiFormControl: {
      fullWidth: true,
      margin: "normal",
    },
  },
})

export default theme

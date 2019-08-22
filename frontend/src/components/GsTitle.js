import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    borderRadius: 0,
    backgroundColor: "#F2FCFF",
  },
  input: {
    display: "none",
  },
}))

export default function GsTitle() {
  const classes = useStyles()

  return (
    <div>
      Welcome to
      <Button variant="contained" className={classes.button}>
        General Services
      </Button>
    </div>
  )
}

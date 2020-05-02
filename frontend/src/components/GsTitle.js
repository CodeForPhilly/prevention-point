import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import { Link } from "react-router-dom"

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    borderRadius: 0,
    backgroundColor: "#FFFCFF",
  },
  input: {
    display: "none",
  },
}))

const GsTitle = () => {
  const classes = useStyles()

  return (
    <>
      Welcome to
      <Link to="/">
        <Button variant="contained" className={classes.button}>
          General Services
        </Button>
      </Link>
    </>
  )
}

export default GsTitle

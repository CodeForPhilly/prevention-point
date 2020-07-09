import React from "react"
import PropTypes from "prop-types"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import PrevPointButton from "./PrevPointButton"

function WithSubmit({
  component: Component,
  handleSubmit,
  submitText,
  ...rest
}) {
  /*
    `Component` is a react fragment of Form inputs.
    withSubmit allows the whatever inputs are passed to it to be a standalone form
  */

  const onSubmit = e => {
    e.preventDefault()
    handleSubmit()
  }

  return (
    <Container maxWidth="md">
      <Grid container spacing={2} component="form" onSubmit={e => onSubmit(e)}>
        <Component {...rest} />
        <Grid item xs={12}>
          <PrevPointButton type="submit" size="large">
            {submitText}
          </PrevPointButton>
        </Grid>
      </Grid>
    </Container>
  )
}

WithSubmit.propTypes = {
  component: PropTypes.func,
  handleSubmit: PropTypes.func,
  submitText: PropTypes.node,
}

export default WithSubmit

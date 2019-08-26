/**
 * If youre having component problems and not seeing errors, wrap this component around your component for development and it will display errors.
 */

import React from "react"
import PropTypes from "prop-types"

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      info: null,
    }
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error: error,
      info: info,
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h1>Oops!!! Something went wrong</h1>
          <p>The error: {this.state.error.toString()}</p>
          <p>Where it occured: {this.state.info.componentStack}</p>
        </div>
      )
    } else {
      return this.props.children
    }
  }
}

// typechecking of children property.  Ensures the children props is of type "node" (any type)
ErrorBoundary.propTypes = {
  children: PropTypes.node,
}

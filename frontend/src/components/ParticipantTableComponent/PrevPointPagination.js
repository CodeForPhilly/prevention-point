import React from "react"
import PropTypes from "prop-types"
import { makeStyles } from "@material-ui/core/styles"
import Pagination from "@material-ui/lab/Pagination"

const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(2, 0),
  },
}))

const PrevPointPagination = ({ participants, page, setPage }) => {
  const classes = useStyles()
  const count = Math.ceil(participants.length / 50)

  return (
    participants.length > 50 && (
      <Pagination
        className={classes.root}
        count={count}
        page={page + 1}
        onChange={(e, value) => setPage(value - 1)}
      />
    )
  )
}

PrevPointPagination.propTypes = {
  participants: PropTypes.array,
  page: PropTypes.number,
  setPage: PropTypes.func,
}

export default PrevPointPagination

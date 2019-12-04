import React, { Fragment, useContext, useEffect, useState } from "react"
import { rootStoreContext } from "../stores/RootStore"
import Breadcrumbs from "@material-ui/core/Breadcrumbs"
import Typography from "@material-ui/core/Typography"
import Link from "@material-ui/core/Link"
import Table from "@material-ui/core/Table"
import TableBody from "@material-ui/core/TableBody"
import TableCell from "@material-ui/core/TableCell"
import TableHead from "@material-ui/core/TableHead"
import TableRow from "@material-ui/core/TableRow"
import Fab from "@material-ui/core/Fab"
import AddIcon from "@material-ui/icons/Add"
import { observer } from "mobx-react-lite"

import { makeStyles } from "@material-ui/core/styles"
import Popover from "@material-ui/core/Popover"

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
  },
}))

const ParticipantsList = observer(() => {
  const classes = useStyles()
  const rootStore = useContext(rootStoreContext)
  const participantsStore = rootStore.ParticipantStore
  const [isLoading, setIsLoading] = useState(false)

  const [anchorEl, setAnchorEl] = React.useState(null)
  // useEffect is a hook that gets called after every render/re-render.  Empty array second argument prevents it from running again.
  useEffect(() => {
    setIsLoading(true)
    participantsStore.getParticipants()
    setIsLoading(false)
  }, [])

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  return (
    <Fragment>
      {isLoading ? (
        <div>Loading ...</div>
      ) : (
        <div>
          <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link color="inherit" href="/">
              Home
            </Link>
            <Typography color="textPrimary">Search Results</Typography>
          </Breadcrumbs>
          <Typography variant="h5" color="textPrimary">
            Participants
          </Typography>
          <div className="participants">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <Typography>#</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>PPID</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>First Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Last Name</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Gender</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>DOB</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Race</Typography>
                  </TableCell>
                  <TableCell>
                    <Typography>Add</Typography>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {participantsStore.participants.map((participant, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Typography>Number</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{participant.pp_id} </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{participant.first_name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>{participant.last_name}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Gender</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>DOB</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography>Race</Typography>
                    </TableCell>
                    <TableCell>
                      <Fab
                        color="primary"
                        size="small"
                        aria-label="add"
                        onClick={handleClick}
                      >
                        <AddIcon />
                      </Fab>
                      <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "center",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "center",
                        }}
                      >
                        <Typography className={classes.typography}>
                          Step
                        </Typography>
                        <Typography className={classes.typography}>
                          Case Management
                        </Typography>
                        <Typography className={classes.typography}>
                          Legal
                        </Typography>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Fab color="primary" aria-label="add" size="large">
            <AddIcon />
          </Fab>
        </div>
      )}
    </Fragment>
  )
})

export default ParticipantsList

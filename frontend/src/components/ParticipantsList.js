import React, { useContext, useEffect } from "react"
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

const ParticipantsList = observer(() => {
  const rootStore = useContext(rootStoreContext)
  const participantsStore = rootStore.ParticipantStore

  // useEffect is a hook that gets called after every render/re-render.  Empty array second argument prevents it from running again.
  useEffect(() => {
    const fetchData = async () => {
      await participantsStore.getParticipants()
    }
    fetchData()
  }, [])

  return (
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
                <Typography>PPID</Typography>
              </TableCell>
              <TableCell>
                <Typography>First Name</Typography>
              </TableCell>
              <TableCell>
                <Typography>Last Name</Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participantsStore.participants.map((participant, index) => (
              <TableRow key={index}>
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
                  <Typography>Address</Typography>
                </TableCell>
                <TableCell>
                  <Typography>DOB</Typography>
                </TableCell>
                <TableCell>
                  <Typography>Add</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <p>{participantsStore.filter("T9FN3", null, null).first_name}</p>
      </div>
    </div>
  )
})

export default ParticipantsList

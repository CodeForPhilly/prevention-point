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

const ParticipantsList = observer(() => {
  const rootStore = useContext(rootStoreContext)
  const participantsStore = rootStore.ParticipantStore
  const [isLoading, setIsLoading] = useState(false)
  const [isEmpty, setIsEmpty] = useState(false)

  // useEffect is a hook that gets called after every render/re-render.  Empty array second argument prevents it from running again.
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      await participantsStore.searchForParticipant()
      let storedList = participantsStore.getStoredParticipantList()
      if (storedList === undefined || storedList.length == 0) {
        setIsEmpty(true)
      }
      setIsLoading(false)
    }
    fetchData()
  }, [participantsStore, participantsStore.participant])

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
            {isEmpty ? (
              <div>There are no results</div>
            ) : (
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
                        <Fab color="primary" size="small" aria-label="add">
                          <AddIcon />
                        </Fab>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
          <Fab color="primary" aria-label="add" size="large">
            <AddIcon />
          </Fab>
          <div>
            <p>{participantsStore.filter("T9FN3", null, null).first_name}</p>
          </div>
        </div>
      )}
    </Fragment>
  )
})

export default ParticipantsList

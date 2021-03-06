import React from "react"
import Grid from "@material-ui/core/Grid"
import { makeStyles } from "@material-ui/core"
import Paper from "@material-ui/core/Paper"
import Fab from "@material-ui/core/Fab"
import Container from "@material-ui/core/Container"
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser"
import { PrevPointCopy, PrevPointHeading } from "../Typography"
import PrevPointTableHead from "../ParticipantTableComponent/PrevPointTableHead"
import { TableBody, TableCell, TableRow, Table } from "@material-ui/core"
import PropTypes from "prop-types"
import { useEffect } from "react"

const VisitTable = ({
  fullName,
  getParticipantVisits,
  participantVisits,
  getProtectedVisitData,
}) => {
  const useStyles = makeStyles({
    visitTable: {
      marginTop: 50,
      width: "100%",
    },
  })

  const classes = useStyles()

  useEffect(() => {
    getParticipantVisits()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullName])

  const headerTitles = [
    { title: "Program", mobile: true },
    { title: "Service", mobile: true },
    { title: "Date", mobile: true },
    { title: "See Details", mobile: true },
    // { title: "a participant", mobile: true },
  ]

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12}>
          <div>
            <PrevPointHeading>
              {`${fullName}'s Previous Visits`}
            </PrevPointHeading>
          </div>
          <Paper>
            <Table className={classes.visitTable} aria-label="visits table">
              <PrevPointTableHead
                headerTitles={headerTitles}
                forParticipantTable={false}
              />
              <TableBody>
                {participantVisits.map(visit => (
                  <TableRow aria-label="visit row" key={visit.id}>
                    <TableCell>
                      <PrevPointCopy>{visit.program.name}</PrevPointCopy>
                    </TableCell>
                    <TableCell>
                      <PrevPointCopy>{visit.service.name}</PrevPointCopy>
                    </TableCell>
                    <TableCell>
                      <PrevPointCopy>
                        {new Date(visit.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            timeZone: "UTC", //the the database's Datefield is not timezone aware, so without the localestring assumes UTC. this was causing an off by one error
                          }
                        )}
                      </PrevPointCopy>
                    </TableCell>
                    <TableCell>
                      <Fab
                        color="primary"
                        size="small"
                        aria-label="get protected visit data"
                        onClick={() => getProtectedVisitData(visit.id)}
                      >
                        <VerifiedUserIcon />
                      </Fab>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

VisitTable.propTypes = {
  fullName: PropTypes.string,
  getParticipantVisits: PropTypes.func,
  participantVisits: PropTypes.array,
  getProtectedVisitData: PropTypes.func,
}

export default VisitTable

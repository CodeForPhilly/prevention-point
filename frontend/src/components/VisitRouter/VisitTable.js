import React from "react"
import { Link, useParams } from "react-router-dom"
import Grid from "@material-ui/core/Grid"
import Container from "@material-ui/core/Container"
import { PrevPointHeading } from "../Typography"
import PrevPointButton from "../PrevPointButton"
import PrevPointTableHead from "../ParticipantTableComponent/PrevPointTableHead"
import { TableBody, TableCell, TableRow, Table } from "@material-ui/core"
import PropTypes from "prop-types"

const VisitTable = ({ fullName /** current participants visits*/ }) => {
  const { participantId } = useParams()

  const mockHeaderTitles = [
    { title: "will be", mobile: true },
    { title: "for visits", mobile: true },
    { title: "relating to", mobile: true },
    { title: "a participant", mobile: true },
  ]

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12}>
          <div>
            <PrevPointHeading>
              {`${fullName}'s previous visits`}
            </PrevPointHeading>
          </div>
          <Table>
            <PrevPointTableHead headerTitles={mockHeaderTitles} />
            <TableBody>
              <TableRow>
                <TableCell>Lorem</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lorem</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lorem</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Lorem</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <div>
            <PrevPointButton
              component={Link}
              to={`/participants/${participantId}/visits/visitId`}
            >
              each row would have this button
            </PrevPointButton>
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

VisitTable.propTypes = {
  fullName: PropTypes.string,
}

export default VisitTable

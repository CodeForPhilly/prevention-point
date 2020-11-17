import React, { useContext, useEffect } from "react"
import { autorun, toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { useHistory } from "react-router-dom"
import WithSubmit from "../components/WithSubmit"
import handleError from "../error"
import { rootStoreContext } from "../stores/RootStore"
import ParticipantForm from "../components/ParticipantForm"
import { validateForm } from "../validation/index"

const NewParticipantView = observer(() => {
  const rootStore = useContext(rootStoreContext)
  const participantStore = rootStore.ParticipantStore
  const participantInfo = toJS(participantStore.participant)
  const insurers = toJS(participantStore.insurers)

  // set up history for routing pushes
  const history = useHistory()

  useEffect(() => {
    // reset participant state
    participantStore.setDefaultParticipant()
    // kick off api calls for insurance list from Mobx
    participantStore.getInsurers()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleSubmit = async () => {
    try {
      let validationErrors = await validateForm(
        participantInfo,
        "participantSchema"
      )
      if (validationErrors.length) {
        return validationErrors.map(error =>
          participantStore.setSnackbarState(
            `Theres an error in the ${error.name} field.`
          )
        )
      } else {
        participantStore.createParticipant()
      }
    } catch (err) {
      participantStore.setSnackbarState(handleError(err))
    }
    // after all api calls for submit have been completed route to QueueTable
    autorun(() => {
      if (participantStore.routeToQueueTable) {
        history.push("/existingParticipant")
      }
    })
  }

  // once the useEffect sets the default participant, the component can  render without error
  return (
    <>
      {Object.keys(participantInfo).length ? (
        <WithSubmit
          component={ParticipantForm}
          handleSubmit={handleSubmit}
          submitText="Add Participant"
          insurers={insurers}
          participantInfo={participantInfo}
          handleParticipantChange={eventTarget =>
            participantStore.handleParticipantChange(eventTarget)
          }
        />
      ) : null}
    </>
  )
})

export default NewParticipantView

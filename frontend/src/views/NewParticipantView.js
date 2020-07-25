import React, { useContext, useEffect } from "react"
import { autorun, toJS } from "mobx"
import { observer } from "mobx-react-lite"
import { useHistory } from "react-router-dom"
import WithSubmit from "../components/WithSubmit"
import { rootStoreContext } from "../stores/RootStore"
import ParticipantForm from "../components/ParticipantForm"

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

  const handleSubmit = () => {
    participantStore.createParticipant(false)
    // after all api calls for submit have been completed route to QueueTable
    autorun(() => {
      if (participantStore.routeToQueueTable) {
        history.push("/participantInfo")
      }
    })
  }

  // once the useEffect sets the default participant, the component can  render without error
  return (
    <>
      {Object.keys(participantInfo).length && (
        <WithSubmit
          component={ParticipantForm}
          handleSubmit={handleSubmit}
          submitText="Add Participant"
          insurers={insurers}
          participantInfo={participantInfo}
          handleParticipantChange={event =>
            participantStore.handleParticipantChange(event)
          }
        />
      )}
    </>
  )
})

export default NewParticipantView

import React, { useContext } from "react"
import { participantStoreContext } from "../stores/ParticipantStore"
import { observer } from "mobx-react-lite"

const Participants = observer(() => {
  const participants = useContext(participantStoreContext)

  return (
    <div className="participants">
      {participants.map(participant => (
        <li key={participant}>{participant}</li>
      ))}
    </div>
  )
})

export default Participants

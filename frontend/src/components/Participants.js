import React, { useContext } from "react"
import { participantStoreContext } from "../stores/ParticipantStore"

const Participants = () => {
  const participants = useContext(participantStoreContext)

  return (
    <div className="participants">
      {participants.map(participant => (
        <p key={participant}>{participant.first_name}</p>
      ))}
    </div>
  )
}

export default Participants

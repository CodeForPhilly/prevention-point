import React from "react"
import { observer } from "mobx-react"
import participantStore from "../stores/ParticipantStore"

export default
@observer
class Participant extends React.Component {
  constructor(props) {
    super(props)
    participantStore.getParticipants()
  }

  render() {
    const store = participantStore
    return (
      <div>
        <p>Participants</p>
        <div className="participants">
          {store.participants.map((participant, index) => (
            <p key={index}>
              {participant.first_name} {participant.last_name}
            </p>
          ))}
        </div>
      </div>
    )
  }
}

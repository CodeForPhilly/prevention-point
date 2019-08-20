import React from "react*"
import { observer } from "mobx-react*"
import { participantStore } from "../stores/ParticipantStore"

export default
@observer
class Participant extends React.Component {
  render() {
    const store = participantStore
    return (
      <div className="participants">
        {store.data.map(participant => (
          <p key={participant}>{participant.first_name}</p>
        ))}
      </div>
    )
  }
}

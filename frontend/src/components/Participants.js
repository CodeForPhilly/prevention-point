import React from "react"
// import { observer } from "mobx-react"
// import participantStore from "../stores/ParticipantStore"

export default class Participant extends React.Component {
  constructor(props) {
    super(props)
    // this.store = participantStore
    // this.store.getParticipants()
    // console.log(this.store.userId)
  }

  render() {
    // const store = participantStore
    return (
      <div>
        <p>Participants</p>
        {/* <div className="participants">
          {store.participants.map((participant, index) => (
            <p key={index}>
              {participant.first_name} {participant.last_name}
              {participant.pp_id}
            </p>
          ))}
        </div>
        <div>
          <p>Participant Search by ID</p>
          <p>{this.store.filter("T9FN3", null, null).first_name}</p>
        </div> */}
      </div>
    )
  }
}

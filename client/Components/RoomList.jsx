import React from 'react'
import RoomService from '../Services/RoomService.js'
import Modal from 'react-modal';

  const customStyles = {
  content : {
    top                   : '20%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

var roomServ = new RoomService()


class RoomList extends React.Component {
  constructor (props) {
    super(props)
    this.state = {rooms:[{position: 'janitor'}], modalIsOpen: false}

    roomServ.getThem(JSON.parse(localStorage.getItem('dbUser')).id)

    roomServ.on('got_rooms', (rooms) => {
      console.log('rooms',typeof rooms.data[0])
      this.setState({rooms: rooms.data})
    })

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.addAvailability = this.addAvailability.bind(this)

  }



  openModal() {
    this.setState({modalIsOpen: true});
    //this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }
  addAvailability(slotLength, slotInfo) {
    //create room
    var room = {}
    room.userid = JSON.parse(localStorage.getItem('dbUser')).id
    room.position = this.state.position
    roomServ.addRoom(room)
    this.setState({modalIsOpen: false});
  }

  handleChange(event) {
    this.setState({position: event.target.value});
  }



  render() {
    return (
      <div>
        <button className="btn btn-default z-depth-2" onClick={this.openModal}>Create Room</button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add Availability"
        >

          <h2 ref="subtitle">Create room</h2>
          <p>Create new room. a room is typically used for interviews of the same position as the room settings can be set to suit the type of interview. For example you might include code sharing, or you might have a different question list depending on the job you are interviewing for.</p>
          <p>Options regarding the room are still to come</p>
          <p>Job position the room is for?</p>

          <input type="text" value={this.state.position} onChange={this.handleChange.bind(this)} />

          <button className="clbtn" onClick={this.addAvailability}>Confirm</button>

          <button className="clbtn" onClick={this.closeModal}>close</button>
          <div>I am a modal</div>

        </Modal>

        <ul>
        {this.state.rooms.map(function(room) {
          return <li>{room.position}</li>
        })}
        </ul>

      </div>

      )

  }

}




module.exports = RoomList
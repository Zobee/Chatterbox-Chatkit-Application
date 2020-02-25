import React from 'react';
import Chatkit from '@pusher/chatkit-client';
import './App.css';
import MessageList from './Components/MessageList'
import NewRoomForm from './Components/NewRoomForm'
import RoomList from './Components/RoomList'
import SendMessageForm from './Components/SendMessageForm'
import SwitchUser from './Components/SwitchUser'

class App extends React.Component{
  constructor(){
    super();
    this.state = {
      messages: [],
      joinableRooms: [],
      joinedRooms: [],
      currentRoomId: '',
      currentUser: 'Youser',
      nightmode: false
    }
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this)
    this.createRoom = this.createRoom.bind(this)
    this.createUser = this.createUser.bind(this)
    this.nightMode = this.nightMode.bind(this)
  }

  /*
  componentWillMount(){
    let user = prompt("What is your username?")
    this.setState({
      currentUser : user
    })
  }
  */
  componentDidMount(){ //Holy shit, this actually worked
    const chatmanager = new Chatkit.ChatManager({
      instanceLocator : "v1:us1:0feff366-14f6-4c7d-84e8-08fa023dacc4",
      userId: this.state.currentUser,
      tokenProvider: new Chatkit.TokenProvider({
        url: "https://us1.pusherplatform.io/services/chatkit_token_provider/v1/0feff366-14f6-4c7d-84e8-08fa023dacc4/token"

      })
    })
    chatmanager.connect()
    .then(currentUser => {
      this.currentUser = currentUser;

      //Gets the info for roomslist
      
      this.getRooms()

    })
    .catch(error => {
      console.error("error:", error);
    });   

    
  }


  //Method for sending messages
  //text is the message text, and roomId is the current room you are in (defined by which room you're subscribed to)
  sendMessage(text){
    this.currentUser.sendMessage({
      text,
      roomId: this.state.currentRoomId
    })
  }

  //On-click. User will subscribe to room with id of roomID. Clickable rooms in roomlist component
  subscribeToRoom(roomID){
    this.setState({
      messages : []
    })
    this.currentUser.subscribeToRoom({
      roomId: roomID,
      hooks: {
        onMessage: message => {
          this.setState({
            messages : [...this.state.messages, message]
          })
        }
      }
    })
    .then(room => {
      //Sets the state for the current room id. I.E. you are in this room currently
      this.setState({
        currentRoomId: room.id
      })
      this.getRooms()
    })
    .catch(error => console.log('error on subscribing'));
  }

  getRooms(){
    this.currentUser.getJoinableRooms()
    .then(joinableRooms => {
      this.setState({
        joinableRooms,
        joinedRooms: this.currentUser.rooms
      })
    })
  }

  createRoom(name){
    this.currentUser.createRoom({
      name: name
    })
    .then(room => {
      this.subscribeToRoom(room.id)
    })
  }

  createUser(id, name){
    this.chatkit.createUser({
      id,
      name
    })
    .then(user => {
      this.setState({
        currentUser: user.userId
      })
    })
  }

  nightMode(){
    let root=document.documentElement;
    if (!this.state.nightMode){
      this.setState({
        nightMode:true
      })
      root.style.setProperty('--main-color', 'darkblue')
      root.style.setProperty('--secondary-color', 'black');
      root.style.setProperty('--send-message-form', 'darkgray');
      root.style.setProperty('--main-text-color', '#FEF');
    }
    else {
      this.setState({
        nightMode:false
      })
      root.style.setProperty('--main-color', '#5ea3d0');
      root.style.setProperty('--secondary-color', 'white');
      root.style.setProperty('--send-message-form', '#F5F5F5');
      root.style.setProperty('--main-text-color', '#3e5869');
      root.style.setProperty('--secondary-text-color', '#b0c7d6');
      
    }
    
  }

  render(){
    return (
      <div className={`app ${this.state.nightMode === true? 'night' : ''}`}>
        < RoomList 
        subscribeToRoom={this.subscribeToRoom} 
        rooms={[...this.state.joinableRooms, ...this.state.joinedRooms]}
        roomId={this.state.currentRoomId} 
        createUser={this.createUser}/>
        < MessageList currentUser={this.state.currentUser} messages={this.state.messages} roomId={this.state.currentRoomId} />
        < SendMessageForm sendMessage={this.sendMessage} roomId={this.state.currentRoomId} />
        < NewRoomForm createRoom={this.createRoom}/>
        < SwitchUser nightMode={this.nightMode} currentUser={this.state.currentUser}/>
      </div>
    );
  }

}

export default App;

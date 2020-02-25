import React from 'react'

class MessageList extends React.Component{
    constructor(){
        super()
        this.state = {
            userId: '',
            userName: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event){
        let state = event.target.name;
        this.setState({
            [state]: event.target.value
        })
    }

    handleSubmit(event){
        event.preventDefault()
        this.props.createUser(this.state.userId, this.state.userName)
        this.setState({
            userId: '',
            userName: ''
        })   
    }
    render(){
        const orderedRooms = [...this.props.rooms].sort((a,b) => a.id - b.id)

        if(this.props.rooms.length > 0){
            return<div className='rooms-list'>
            <ul>
                <h3>Rooms List:</h3>
                {orderedRooms.map(room => {
                    const active = this.props.roomId === room.id ? 'active' : ''; //adds the 'active' class to the room you are in by checking if the roomid of the room matches the roomid of the room you are currently in
                    return <li key={room.id} className={`room ${active}`}>
                            <a onClick={() => this.props.subscribeToRoom(room.id)} href='#'># {room.name}</a>
                           </li>
                })}
            </ul>
            </div>
        } else {
            return <div className='rooms-list'>
                <p>Looks like you aren't a user!</p>
                <form onSubmit={this.handleSubmit}>
                    <input 
                    type='text'
                    name='userId'
                    placeholder='Enter a user ID:'
                    value={this.state.userId}
                    onChange={this.handleChange}
                    required
                    />
                    <input 
                    type='text'
                    name='userName'
                    placeholder='Enter a username:'
                    value={this.state.userName}
                    onChange={this.handleChange}
                    required
                    />
                    <button type='submit'>Create!</button>
                </form>
                    </div>
        }
    }
}

export default MessageList; 
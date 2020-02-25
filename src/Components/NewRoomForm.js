import React from 'react'

class NewRoomForm extends React.Component{
    constructor(){
        super()
        this.state = {
            roomName: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e){
        let val = e.target.value;
        this.setState({
            roomName: val
        })
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.createRoom(this.state.roomName)
        this.setState({
            roomName : ''
        })
    }

    render(){
        return<div className='new-room-form'>
            <form onSubmit ={this.handleSubmit}>
                <input 
                onChange={this.handleChange}
                type='text'
                placeholder='Create New Room'
                value = {this.state.roomName}
                required
                />
            </form>
        </div>
    }
}

export default NewRoomForm;
import React from 'react'

class MessageList extends React.Component{
    constructor(){
        super()
        this.state = {
            message: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(event){
        let val = event.target.value;
        this.setState({
            message:val
        })
    }

    handleSubmit(event){
        event.preventDefault();

        this.props.roomId ? this.props.sendMessage(this.state.message) : alert('Join a room first')
        this.setState({
            message : '' 
        })
    }
    render(){
        return<form className='send-message-form' onSubmit={this.handleSubmit}>
                <input 
                onChange={this.handleChange} 
                placeholder='Type Here...' 
                type='text' 
                value={this.state.message} //Again, this is important. The state should be governing the component, not the other way around
                />
                <button onClick={this.handleSubmit}>Send</button>
              </form>
    }
}

export default MessageList;
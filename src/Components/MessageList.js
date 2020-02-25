import React from 'react'
import ReactDOM from 'react-dom'
import Message from './Message'

class MessageList extends React.Component{

    componentWillUpdate(){
        const node = ReactDOM.findDOMNode(this)
        this.shouldScrollToBottom = node.scrollTop + node.clientHeight + 100 >= node.scrollHeight;
    }

    componentDidUpdate(){
        if (this.shouldScrollToBottom){
            const node = ReactDOM.findDOMNode(this)
            node.scrollTop = node.scrollHeight
        }

    }

    render(){
        if(!this.props.roomId){
            return <div className='message-list'>
                    <div className='join-room'>
                        &larr; Join a room!
                    </div>
                   </div>
        }
        return<div className='message-list'>
            {
                //Takes the messages state passed in, maps through them, and returns a div with
                //the user's sender ID, and the message context. Each message is an object, so
                //senderID and text are obj properties
                this.props.messages.map((message, index) => {

                    return <Message key={index} currentUser={this.props.currentUser} username={message.senderId} text={message.text}/>
                        

                           
                        
                })}
        </div>   
    }
}

export default MessageList;
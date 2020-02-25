import React from 'react';

class SwitchUser extends React.Component{
    render(){
        return <div className='switch-user-form'>Current User: {this.props.currentUser}
        <button onClick={this.props.nightMode}>Toggle Night Mode</button>
        </div>
    }
}

export default SwitchUser;
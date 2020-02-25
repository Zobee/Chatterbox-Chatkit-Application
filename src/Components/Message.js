import React from 'react';

//When you have simple components that don't do much/don't require state. It's best practice to
//define them as functional components, instead of class components, as functional components are
//less prone to fuckery
//REMEMBER THAT YOU ONLY PASS PROPS AS A PARAMETER OF A FUNCTIONAL COMPONENT
function Message(props){
    let you = '';
    props.currentUser === props.username ? you = '-you' : you = '';
    return(
    <div className={`message${you}`}>
        <div className={`message${you}-username`}>{props.username}</div>
        <div className={`message${you}-text`}>{props.text}</div>
    </div>
    )
}

export default Message
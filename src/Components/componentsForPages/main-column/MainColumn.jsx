import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Container, Row, Col, Button, Modal, Form, Alert } from 'react-bootstrap'
import { useDatabase } from 'src/Services/Contexts/DatabaseContext';
import _ from 'lodash';
import './style.css';

const MainColumn = ({ model, setModel, params }) => {
  const [message, setMessage] = useState('')
  const { writeMessage } = useDatabase()

  // useEffect(() => {
  //   const lastMes = message
  //   console.log(message)
  //   console.log('changedChanged')
  //   const modelIsNull = _.isNil(model)
  //   if(!modelIsNull) {
  //     console.log('s')
  //     const currentChannelIsNull = _.isNil(model.currentChannel)
  //     if(!currentChannelIsNull) {
  //       console.log('e')
  //       const newModel = _.clone(model);
  
  //       const { [params.channelId]: channel } = model.channels
  //       const newChannel = {
  //         inputtedMessage: lastMes,
  //         ...channel
  //       }

  //       newModel.channels[params.channelId] = newChannel

  //       // newModel.currentChannel.inputtedMessage = message
  //       setModel(newModel);
  //       console.log(newModel)
  //       console.log(model)
  //     }
  //   }
  //   console.log('t')
  //   setMessage('')
  // }, [params.channelId])


  // useEffect(() => {
  //   setMessage('')
  //   const modelIsNull = _.isNil(model)
  //   if(!modelIsNull) {
  //     const currentChannelIsNull = _.isNil(model.currentChannel)
  //     if(!currentChannelIsNull) {
  //       console.log('f')
  //       setMessage(model.currentChannel.inputtedMessage)
  //     }
  //   }
  // }, [model.currentChannel])

  function handleMessageChange(e){
    e.preventDefault()

    setMessage(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    writeMessage(model.currentChannel.channelId, model.currentUser.uid, message)

    setMessage('')
  }

  //TODO: if(JSON.stringify(model.currentChannel) === null) show 'No chosen Channel'
  return (
    <div className='MainColumnMain'>
      <div className='messagesArea'>
        {JSON.stringify(model.currentChannel)}
      </div>
      <Form onSubmit={handleSubmit} className='inputMessageForm'>
        <Form.Group id="message" className="messageTextArea">
          <textarea
            name="message"
            id="messageTextArea"
            wrap='hard'
            value={message}
            className="messageTextAreaTA scrollbarstyle"
            onChange={handleMessageChange}/>
        </Form.Group>
        <button type="submit" className="messageSendButton">
            Send
        </button>
      </Form>
      {/* {
        { currentChannel } = model.channels
      } */}
      {/* {model.channels.find(el => el.)} */}
      {/* <h6>{JSON.stringify(users)}</h6>
      <h6>{JSON.stringify(channels)}</h6> */}
      {/* <button onClick={() => {}}>Create Channel</button> */}
    </div>
  )
}

export default MainColumn
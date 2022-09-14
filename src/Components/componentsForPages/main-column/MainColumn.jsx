import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Container, Row, Col, Button, Modal, Form, Alert } from 'react-bootstrap'
import { useDatabase } from 'src/Services/Contexts/DatabaseContext';
import _ from 'lodash';
import './style.css';

const MainColumn = ({ model, setModel, params }) => {
  const [message, setMessage] = useState('')
  const { writeMessage } = useDatabase()

  // useEffect(() => {
  //   console.log(model)
  // }, []);

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

  // message: message,
  // owner: owner,
  // datatime: new Date().toString()

  function getUserNickname(uid){
    if(_.isNil(model.users[uid])){
      return 'Unknown User'
    } else {
      return model.users[uid].nickname
    }
  }

  const messages = useMemo(() => {
    if(_.isNil(model.currentChannel)){
      return 'choose chanel first'
    }
    const result = [];
    console.log(model)
    const messToRender = model.channels[model.currentChannel.channelId].messageStack;

    if(_.isNil(messToRender)){
      return 'no messages in that channel'
    }

    messToRender.forEach((obj, ind) => {
      const isMine = obj.owner === model.currentUser.uid

      console.log(obj)

      result.push(
        <Row className='mt-2' key={model.currentChannel.channelId + 'mes' + ind}>
          { isMine && <Col sm={0} md={2} lg={3} xl={3} xxl={3} className='d-none d-md-block mr-1 ml-1'></Col>}
          <Col sm={12} md={10} lg={9} xl={9} xxl={9}>
            <div className='message'>
              <img className='messagAavatar avatar' alt='avatar' src={ 
                (model && 
                model.currentChannel && 
                model.currentChannel.photoUrl &&
                model.currentChannel.photoUrl.length > 0) ? model.currentChannel.photoUrl : '/images/noavatar.png'}
              />
              <div className='messageText'>
                <h6 className='ownerOfMessage'>{getUserNickname(obj.owner)}</h6>
                {obj.message}
              </div>
            </div>
            <div className='messageData'>
              {obj.datatime}
            </div>
          </Col>
          { !isMine && <Col sm={0} md={2} lg={3} xl={3} xxl={3} className='d-none d-md-block mr-1 ml-1'></Col>}
        </Row>
      )
    })

    return result.reverse();
  }, [model]);

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
      {/* {JSON.stringify(model.currentChannel)} */}
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
      <Container className='scrollbarstyle messageContainer messagesArea mb-4'>
        {messages}
      </Container>
    </div>
  )
}

export default MainColumn
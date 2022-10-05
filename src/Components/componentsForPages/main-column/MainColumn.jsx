import React, { useMemo, useState } from 'react'
import { Container, Row, Col, Form} from 'react-bootstrap'
import { useDatabase } from 'src/Services/Contexts/DatabaseContext';
import _ from 'lodash';
import './style.css';

const MainColumn = ({ model, refreshLocalDB }) => {
  const [message, setMessage] = useState('')
  const { writeMessage } = useDatabase()

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
    const messToRender = model.channels[model.currentChannel.channelId].messageStack;

    if(_.isNil(messToRender)){
      return 'no messages in that channel '
    }

    messToRender.forEach((obj, ind) => {
      const isMine = obj.owner === model.currentUser.uid
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

      const dataStyles = [isMine ? 'messageDataAlignRight' : 'messageDataAlignLeft']
      const messageStyles = ['messageOuterContainer', 
        isMine ? 'messageOuterContainerAlignRight' : 'messageOuterContainerAlignLeft']

      result.push(
        <Row className='mt-2' key={model.currentChannel.channelId + 'mes' + ind}>
          { isMine && <Col sm={0} md={2} lg={3} xl={3} xxl={3} className='d-none d-md-block mr-1 ml-1'></Col>}
          <Col sm={12} md={10} lg={9} xl={9} xxl={9} className={messageStyles}>
            <div className='message listElementBGColor'>
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
            <div className={dataStyles}>
              {new Date(obj.datatime).toLocaleDateString('en-US', options)}
            </div>
          </Col>
          { !isMine && <Col sm={0} md={2} lg={3} xl={3} xxl={3} className='d-none d-md-block mr-1 ml-1'></Col>}
        </Row>
      )
    })

    return result.reverse();
  }, [model.channels, model.currentChannel]);

  function handleMessageChange(e){
    e.preventDefault()

    setMessage(e.target.value)
  }

  function handleSubmit(e){
    e.preventDefault()
    writeMessage(model.currentChannel.channelId, model.currentUser.uid, message)
      .then(() => {
        refreshLocalDB('channels');
        setMessage('')
      })
  }

  //TODO: if(JSON.stringify(model.currentChannel) === null) show 'No chosen Channel'
  return (
    <div className='MainColumnMain scrollbarstyle backGroundColorBlack'>
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
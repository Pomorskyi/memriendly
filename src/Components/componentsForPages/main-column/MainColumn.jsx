import React, { useMemo, useState, useEffect } from 'react'
import { Container, Row, Col, Form} from 'react-bootstrap'
import { useDatabase } from 'src/Services/Contexts/DatabaseContext';
import _ from 'lodash';
import './style.css';
import constants from 'src/Services/constants/constants';

const MainColumn = ({ model, refreshLocalDB }) => {
  const [message, setMessage] = useState('')
  const [howBigArea, setHowBigArea] = useState(0)
  const { writeMessage } = useDatabase()

  useEffect(() => {
    var ta = document.getElementById('messageTextArea');
    var numberOfRows = ta.innerHTML.split('\n').length
    setHowBigArea(numberOfRows > 2 ? (numberOfRows < 6 ? numberOfRows : 6) : 2)
  }, [message])

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

      const imgSrc = model.users[obj.owner].photoURL ? model.users[obj.owner].photoURL : constants.NO_PHOTO_CHOOSEN_PATH
      
      result.push(
        <Row className='mt-2' key={model.currentChannel.channelId + 'mes' + ind}>
          { isMine && <Col sm={0} md={2} lg={3} xl={3} xxl={3} className='d-none d-md-block mr-1 ml-1'></Col>}
          <Col sm={12} md={10} lg={9} xl={9} xxl={9} className={messageStyles}>
            <div className='message listElementBGColor'>
              <img className='messageAvatar avatar' alt='avatar' src={imgSrc} />
              <div className='messageText'>
                <h6 className='ownerOfMessage'>{getUserNickname(obj.owner)}</h6>
                <p>{obj.message}</p>
              </div>
            </div>
            <div className={dataStyles}>
              {new Date(obj.datatime).toLocaleDateString('en-US', options) + ', ' + new Date(obj.datatime).getHours() + ':' + new Date(obj.datatime).getMinutes()}
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
    if(message.length > 0 && model.currentChannel){
      writeMessage(model.currentChannel.channelId, model.currentUser.uid, message)
        .then(() => {
          refreshLocalDB('channels');
          setMessage('')
        })
    }
  }

  //TODO: if(JSON.stringify(model.currentChannel) === null) show 'No chosen Channel'
  return (
    <div id='messageScrollbarHolder' className='MainColumnMain scrollbarstyle backGroundColorBlack'>
      <Form onSubmit={handleSubmit} className='inputMessageForm'>
        <Form.Group id="message" className="messageTextArea">
          <textarea
            name="message"
            id="messageTextArea"
            wrap='hard'
            rows={howBigArea}
            value={message}
            className="messageTextAreaTA scrollbarstyle"
            onChange={handleMessageChange}/>
        </Form.Group>
        <button type="submit" className="messageSendButton">
            <img src="/images/send.png" alt="send" />
        </button>
      </Form>
      <Container className='scrollbarstyle messageContainer messagesArea mb-4'>
        {messages}
      </Container>
    </div>
  )
}

export default MainColumn
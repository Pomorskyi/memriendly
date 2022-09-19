import React, { useState, useEffect, useCallback } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate  } from 'react-router-dom'
import {
  Header,
  ListOfChannels,
  MainColumn,
  AccountSection,
  Footer
} from '../../Components/componentsForPages'
import { useAuth } from '../../Services/Contexts/AuthContext';
import { useDatabase } from '../../Services/Contexts/DatabaseContext';
import { useParams } from "react-router-dom";
import MyAccountModal from '../../Components/Modals/MyAccountModal/MyAccountModal';
import CreateChannelModal from 'src/Components/Modals/CreateChannelModal/CreateChannelModal';
import _ from 'lodash';
import './style.css'

const FeedPage = () => {
  const [loading, setLoading ] = useState(true)
  const [model, setModel] = useState({})
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const { users, channels, writeChannelObj, writeUserObj, updateChannelsTable, updateUsersTable } = useDatabase()
  let params = useParams();
  const navigate = useNavigate()
  const [showSettings, setShowSettings] = useState(false);
  const [showCreateChannel, setShowCreateChannel] = useState(false);

  async function handleCloseSettings() {
    setShowSettings(false);
  }

  async function handleCloseCreateChannel() {
    setShowCreateChannel(false);
  }

  const subscribeToCurrentChannel = useCallback(() => {
    setLoading(true);

    if (model.currentChannel.subscribers === undefined || 
        !model.currentChannel.subscribers.includes(model.currentUser.uid)){
      const newChannel = _.clone(model.channels[model.currentChannel.channelId]);
      if(newChannel.subscribers) {
        newChannel.subscribers.push(model.currentUser.uid)
      } else {
        newChannel.subscribers = []
        newChannel.subscribers.push(model.currentUser.uid)
      }
    
      writeChannelObj(model.currentChannel.channelId, newChannel)
    }

    if (!model.users[model.currentUser.uid].listOfSubscribedChannels.includes(model.currentChannel.channelId)){
      const newUser = _.clone(model.users[model.currentUser.uid]);
      if(newUser.listOfSubscribedChannels) {
        newUser.listOfSubscribedChannels.push(model.currentChannel.channelId)
      } else {
        newUser.listOfSubscribedChannels = []
        newUser.listOfSubscribedChannels.push(model.currentChannel.channelId)
      }
      
      writeUserObj(model.currentUser.uid, newUser)
    }
    
    updateChannelsTable()
    updateUsersTable()
    
    setLoading(false);
  }, [model, currentUser])

  const handleShowSettings = () => setShowSettings(true);

  const handleShowCreateChannel = () => setShowCreateChannel(true);

  useEffect(() => {
    setLoading(true);
    const newModel = _.clone(model);
    newModel.currentUser = currentUser;
    newModel.channels = channels;
    newModel.users = users;

    function fetchCurrentChannelIntoModel() {
      if(_.isNil(params.channelId) || _.isNil(channels)) {
        return null
      }

      const isItRealUrl = channels.hasOwnProperty(params.channelId)
      if(isItRealUrl) {
        const { [params.channelId]: channel } = channels
        return {
          channelId: params.channelId,
          ...channel
        }
      } else {
        return null
      }
    }
    newModel.currentChannel = fetchCurrentChannelIntoModel()
    
    setModel(newModel);
    setLoading(false);
  }, [channels, currentUser, users, params.channelId])

  async function handleLogoutProp() {
    setError('')

    try{
      await logout()
      navigate('/signup')
     } catch {
      setError('Failed to log out')
     }
  }

  if(loading || _.isNil(model)) return <p>loading</p>
    else 
  return (
    <Container className='FeedPageContainer h-100 d-flex flex-column' fluid>
      <MyAccountModal handleClose={handleCloseSettings} model={model} show={showSettings} />
      <CreateChannelModal handleClose={handleCloseCreateChannel} setShowCreateChannel={setShowCreateChannel} model={model} show={showCreateChannel} />
      <Row style={{ height: '6vh' }}>
        <Col className='h-100'>
          <Header className='h-100' handleLogout={handleLogoutProp} model={model}></Header>
        </Col>
      </Row>
      <Row className='h-80' style={{ height: '89vh' }}>
        <Col sm={0} md={0} lg={3} xl={3} xxl={2} className='d-none d-lg-block' style={{ height: '100%' }}>
          <ListOfChannels className='listOfChannels' model={model} ></ListOfChannels>
        </Col>
        <Col sm={12} md={8} lg={6} xl={6} xxl={8} style={{ height: '100%' }}>
          <MainColumn className='mainColumn' model={model} setModel={setModel} params={params} ></MainColumn>
        </Col>
        <Col sm={0} md={4} lg={3} xl={3} xxl={2} className='d-none d-md-block'>
          <AccountSection 
            handleShowSettings={handleShowSettings} 
            handleShowCreateChannel={handleShowCreateChannel}
            subscribeToCurrentChannel={subscribeToCurrentChannel}
            model={model} 
            className='accountSection' />
        </Col>
      </Row>
      <Row style={{ height: '5vh' }}>
        <Col>
          <Footer />
        </Col>
      </Row>
    </Container>
  )
}

export default FeedPage
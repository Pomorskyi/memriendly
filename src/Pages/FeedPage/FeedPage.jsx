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
  const [subscribedChannels, setSubscribedChannels] = useState([])
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const { writeChannelObj, writeUserObj, updateTable, getAllTable } = useDatabase()
  let params = useParams();
  const navigate = useNavigate()
  const [showSettings, setShowSettings] = useState(false);
  const [showCreateChannel, setShowCreateChannel] = useState(false);

  useEffect(() => {
    setLoading(true);
    
    const newModel = {};
    newModel.currentUser = currentUser

    const promises = []
    promises.push(updateTable('users').then((res) => newModel.users = res))
    promises.push(updateTable('channels').then((res) => newModel.channels = res))
    Promise.all(promises)
    .then(() => {fetchCurrentChannelIntoModel().then(res => newModel.currentChannel = res)})
    .then(() => {setSubscribedChannels(getSubscribedChannels(newModel))})
    .then(() => {
      setModel(newModel)
      setLoading(false);
    })
  }, [])

  useEffect(() => {
    if(model && model.currentUser){
      setLoading(true);

      const newModel = _.clone(model);
      fetchCurrentChannelIntoModel(newModel).then(res => {
        newModel.currentChannel = res;
        console.log(newModel)
        setModel(newModel);
        setLoading(false);
      })
    }
  }, [params.channelId])

  // useEffect(() => {
  //   setLoading(true);
  //   const newModel = _.clone(model);

  //   new Promise(() => {
  //     setSubscribedChannels(getSubscribedChannels(newModel))
  //   }).then(() => {
  //     setModel(newModel)
  //     setLoading(false);
  //   })
  // }, [model.currentUser])

  function getSubscribedChannels(modelObj) {
      if(!_.isNil(modelObj.currentUser)){
        var displayedChannels = {}
        const copy = _.clone(modelObj)
        // console.log(copy)
        if(copy.users[copy.currentUser.uid].listOfSubscribedChannels){
          copy.users[copy.currentUser.uid].listOfSubscribedChannels.forEach(el => {
            // console.log(el)
            displayedChannels[el] = copy.channels[el]
          })
        }
        // console.log(displayedChannels)
        return displayedChannels
      }
  }

  function fetchCurrentChannelIntoModel(newModel) {
    return new Promise((resolve) => {
      if(_.isNil(newModel) ||_.isNil(params.channelId) || _.isNil(newModel.channels)) {
        resolve(null)
      }
  
      const isItRealUrl = newModel.channels.hasOwnProperty(params.channelId)
      if(isItRealUrl) {
        const { [params.channelId]: channel } = newModel.channels
        resolve({
          channelId: params.channelId,
          ...channel
        })
      } else {
        resolve(null)
      }
    })
  }

  function refreshLocalDB(name) {
    setLoading(true);
    const newModel = _.clone(model);

    new Promise((resolve) => {
      if(name === 'users'){
        updateTable('users').then((res) => newModel.users = res)
      } else if(name === 'channels'){
        console.log(1)
        updateTable('channels').then((res) => newModel.channels = res)
        setSubscribedChannels(getSubscribedChannels(newModel))
        console.log(2)
      }
      resolve()
    }).then(() => {
      console.log(3)
      console.log(newModel)
      setModel(newModel)
      setLoading(false);
      console.log(4)
    })
  }

  async function handleCloseSettings() {
    setShowSettings(false);
  }

  async function handleCloseCreateChannel() {
    setShowCreateChannel(false);
  }

  const subscribeToCurrentChannel = useCallback(() => {
    setLoading(true);

    if(_.isNil(model.currentChannel)){
      return null
    }

    if (_.isNil(model.currentChannel.subscribers) || 
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

    if (_.isNil(model.users[model.currentUser.uid].listOfSubscribedChannels) || 
      !model.users[model.currentUser.uid].listOfSubscribedChannels.includes(model.currentChannel.channelId)){
      const newUser = _.clone(model.users[model.currentUser.uid]);
      if(newUser.listOfSubscribedChannels) {
        newUser.listOfSubscribedChannels.push(model.currentChannel.channelId)
      } else {
        newUser.listOfSubscribedChannels = []
        newUser.listOfSubscribedChannels.push(model.currentChannel.channelId)
      }
      
      writeUserObj(model.currentUser.uid, newUser)
    }
    
    updateTable('channels')
    updateTable('users')
    
    setLoading(false);
  }, [model, currentUser])

  const handleShowSettings = () => setShowSettings(true);

  const handleShowCreateChannel = () => setShowCreateChannel(true);

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
      <CreateChannelModal
        handleClose={handleCloseCreateChannel}
        setShowCreateChannel={setShowCreateChannel}
        model={model}
        show={showCreateChannel}
        refreshLocalDB={refreshLocalDB}
        subscribeToCurrentChannel={subscribeToCurrentChannel}/>
      <Row style={{ height: '6vh' }}>
        <Col className='h-100'>
          <Header className='h-100' handleLogout={handleLogoutProp} model={model}></Header>
        </Col>
      </Row>
      <Row className='h-80' style={{ height: '89vh' }}>
        <Col sm={0} md={0} lg={3} xl={3} xxl={2} className='d-none d-lg-block' style={{ height: '100%' }}>
          <ListOfChannels className='listOfChannels' allChannels={model.channels} listOfSubscribedChannels={subscribedChannels}></ListOfChannels>
        </Col>
        <Col sm={12} md={8} lg={6} xl={6} xxl={8} style={{ height: '100%' }}>
          <MainColumn className='mainColumn' model={model} setModel={setModel} params={params} ></MainColumn>
        </Col>
        <Col sm={0} md={4} lg={3} xl={3} xxl={2} className='d-none d-md-block'>
          <AccountSection 
            handleShowSettings={handleShowSettings} 
            handleShowCreateChannel={handleShowCreateChannel}
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
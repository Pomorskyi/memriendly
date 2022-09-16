import React, { useState, useEffect, useMemo } from 'react'
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
import _ from 'lodash';
import './style.css'
import MyAccountModal from '../../Components/Modals/MyAccountModal/MyAccountModal';

const FeedPage = () => {
  const [loading, setLoading ] = useState(true)
  const [model, setModel] = useState({})
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const { users, channels, clearDuplicates } = useDatabase()
  let params = useParams();
  const navigate = useNavigate()
  const [showSettings, setShowSettings] = useState(false);

  async function handleCloseFunc() {
    setShowSettings(false);
  }
  const handleShow = () => setShowSettings(true);

  // useEffect(() => {
  //   console.log(users)
  // }, [users]);

  // useEffect(() => {
  //   clearDuplicates()
  // }, []);
  
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
      <MyAccountModal handleClose={handleCloseFunc} model={model} showSettings={showSettings} />
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
          <AccountSection handleShow={handleShow} model={model} className='accountSection'></AccountSection>
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
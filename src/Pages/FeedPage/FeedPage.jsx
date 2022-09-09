import React, { useState, useEffect } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { useNavigate  } from 'react-router-dom'
import {
  Header,
  ListOfChannels,
  MainColumn,
  AccountSection,
  Footer
} from '../../Components/componentsForPages'
import {
  Routes,
  Route,
  Link
} from "react-router-dom";
import { useAuth } from '../../Services/Contexts/AuthContext';
import { useDatabase } from '../../Services/Contexts/DatabaseContext';
import './style.css'
import MyAccountModal from '../../Components/Modals/MyAccountModal/MyAccountModal';

const FeedPage = () => {
  const [loading, setLoading ] = useState(true)
  // const [channelsRoutes, setChannelsRoutes] = useState([])
  const [model, setModel] = useState('')
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const { users, channels } = useDatabase()
  const navigate = useNavigate()
  const [showSettings, setShowSettings] = useState(false);

  async function handleCloseFunc() {
    setShowSettings(false);
    // await readData()
  }
  const handleShow = () => setShowSettings(true);

  useEffect(() => {
    setModel({
      listOfChannels: channels
    })
    
    // const res = []
    // Object.keys(channels).map((el) => {
    //   res.push(
        
    //   )        
    // })
    // console.log(res)
    // console.log(channels)
    // writeChannel(currentUser, 'a')
    // writeChannel(currentUser, 'b')
    // writeChannel(currentUser, 'c')
    // writeChannel(currentUser, 'd')
    setLoading(false)
  }, [channels])

  async function handleLogoutProp() {
    setError('')

    try{
      await logout()
      navigate('/signup')
     } catch {
      setError('Failed to log out')
     }
  }

  function testListOfChannels(){
    return {
      listOfChannels: channels
    }
  }

  if(loading) return <p>loading</p>
    else 
  return (
        <Container className='FeedPageContainer h-100 d-flex flex-column' fluid>
          <MyAccountModal handleClose={handleCloseFunc} currentUser={currentUser} showSettings={showSettings} />
          <Row className='h-10'>
            <Col className='h-100'>
              <Header className='h-100' handleLogout={handleLogoutProp} ></Header>
            </Col>
          </Row>
          <Row className='flex-grow-1 h-80'>
            <Col sm={0} md={0} lg={3} xl={3} xxl={2} className='d-none d-lg-block'>
              <ListOfChannels className='listOfChannels' model={model}></ListOfChannels>
            </Col>
            <Col sm={12} md={8} lg={6} xl={6} xxl={8}>
              <MainColumn className='mainColumn' currentUser={currentUser} users={users} channels={channels} ></MainColumn>
            </Col>
            <Col sm={0} md={4} lg={3} xl={3} xxl={2} className='d-none d-md-block'>
              <AccountSection handleShow={handleShow} currentUser={currentUser} className='accountSection'></AccountSection>
            </Col>
          </Row>
          <Row className='h-10'>
            <Col>
              <Footer />
            </Col>
          </Row>
        </Container>
  )
}

export default FeedPage
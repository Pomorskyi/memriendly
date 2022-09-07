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
import { useAuth } from '../../Services/Contexts/AuthContext';
import { useDb } from '../../Services/Contexts/DatabaseContext';
import './style.css'
import MyAccountModal from '../../Components/Modals/MyAccountModal/MyAccountModal';

const FeedPage = () => {
  const [error, setError] = useState('')
  const { currentUser, logout } = useAuth()
  const { readData } = useDb()
  const navigate = useNavigate()
  const [showSettings, setShowSettings] = useState(false);

  async function handleCloseFunc() {
    setShowSettings(false);
    // await readData()
  }
  const handleShow = () => setShowSettings(true);

  useEffect(() => {
    // readData()
    // console.log('testStarted')
    // console.log(currentUser)
    // const list = ['KJSd67', 'as8ISD7', 'KSdyoi8w']
    // updateProfileCustom({ listOfOwnGroups: list})

    // setTimeout(() => {
    //   console.log(currentUser)
    // }, 4000)
  }, [])

  async function handleLogoutProp() {
    setError('')

    try{
      await logout()
      navigate('/signup')
     } catch {
      setError('Failed to log out')
     }
  }

  return (
    <Container className='FeedPageContainer h-100 d-flex flex-column' fluid>
      <MyAccountModal handleClose={handleCloseFunc} currentUser={currentUser} showSettings={showSettings} />
      <Row className='h-10'>
        <Col className='h-100'>
          <Header className='h-100' handleLogout={handleLogoutProp} ></Header>
        </Col>
      </Row>
      <Row className='flex-grow-1 h-80'>
        <Col sm={0} md={0} lg={3} xl={2} xxl={2} className='d-none d-lg-block'>
          <ListOfChannels className='listOfChannels'></ListOfChannels>
        </Col>
        <Col sm={12} md={8} lg={6} xl={8} xxl={8}>
          <MainColumn className='mainColumn'></MainColumn>
        </Col>
        <Col sm={0} md={4} lg={3} xl={2} xxl={2} className='d-none d-md-block'>
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
import React, { useState } from 'react'
import { Container, Row, Col, Button } from 'react-bootstrap'
import { useNavigate  } from 'react-router-dom'
import {
  Header,
  ListOfChannels,
  MainColumn,
  AccountSection,
  Footer
} from '../../Components/componentsForPages'
import PropTypes from 'prop-types';
import { useAuth } from '../../Services/AuthContext/AuthContext';
import './style.css'

const FeedPage = ({ model }) => {
  const [error, setError] = useState('')
  const {currentUser, logout} = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
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
      <Row className='h-10'>
        <Col>
          <Header model={model}></Header>
        </Col>
      </Row>
      <Row className='flex-grow-1'>
        <Col sm={0} md={0} lg={3} xl={2} xxl={2} className='d-none d-lg-block'>
          <ListOfChannels model={model} className='listOfChannels'></ListOfChannels>
        </Col>
        <Col sm={12} md={8} lg={6} xl={8} xxl={8}>
          <MainColumn model={model} className='mainColumn'></MainColumn>
        </Col>
        <Col sm={0} md={4} lg={3} xl={2} xxl={2} className='d-none d-md-block'>
          <AccountSection model={model} className='accountSection'></AccountSection>
        </Col>
      </Row>
      <Row className='h-10'>
        <Col>
          <Footer handleLogout={handleLogout} />
        </Col>
      </Row>
    </Container>
  )
}

FeedPage.propTypes = {
  model: PropTypes.object.isRequired,
};

FeedPage.defaultProps = {
  model: {},
};

export default FeedPage
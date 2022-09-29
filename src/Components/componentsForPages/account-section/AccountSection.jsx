import React from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap';
import './style.css';

const AccountSection = ({ handleShowSettings, handleShowCreateChannel, subscribeToCurrentChannel, unSubscribeToCurrentChannel }) => {

  return (
    <div className='AccountSectionContainer'>
      <Container>
        <Row>
          <Col>
            <Button variant="primary customOperationalButton" onClick={handleShowSettings}>
              Settings
            </Button>
          </Col>
        </Row>
        <Row className='mt-2'>
          <Col>
            <Button variant="primary customOperationalButton" onClick={handleShowCreateChannel}>
              Create channel
            </Button>
          </Col>
        </Row>
        <Row className='mt-2'>
          <Col>
            <Button variant="primary customOperationalButton" onClick={subscribeToCurrentChannel}>
              Subscribe to current channel
            </Button>
          </Col>
        </Row>
        <Row className='mt-2'>
          <Col>
            <Button variant="primary customOperationalButton" onClick={unSubscribeToCurrentChannel}>
              Unsubscribe to current channel
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default AccountSection
import React, { useMemo } from 'react'
import { Button, Container, Row, Col } from 'react-bootstrap';
import { MyAccount } from 'src/Components/componentsForComponents';
import './style.css';

const AccountSection = ({ model, handleShowSettings, handleShowCreateChannel, subscribeToCurrentChannel, unSubscribeToCurrentChannel, handleShowChannelSettings }) => {
  
  const isMine = useMemo(() => {
    if(model.currentChannel){
      return model.currentChannel.owner === model.currentUser.uid
    } else {
      return false
    }
  }, [model.currentChannel])

  return (
    <div className='AccountSectionContainer'>
      <Container>
        <MyAccount model={model}/>
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
        {model.currentChannel &&
          <React.Fragment>
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
            {isMine && 
            <Row className='mt-2'>
            <Col>
              <Button variant="primary customOperationalButton" onClick={handleShowChannelSettings}>
                Channel settings
              </Button>
            </Col>
          </Row>}
          </React.Fragment>
        }
      </Container>
    </div>
  )
}

export default AccountSection
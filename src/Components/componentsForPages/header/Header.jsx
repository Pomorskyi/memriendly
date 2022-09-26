import React, { useMemo } from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { ButtonList, ToggleButton } from '../../componentsForComponents';
import { Navigate } from 'react-router-dom';
import "react-toggle/style.css"
import './style.css';

const Header = ({ model, handleLogout }) => {

  const unsubscribeLabel = useMemo(() => {
    if(model.currentChannel && model.currentUser && model.users[model.currentUser.uid].listOfSubscribedChannels){
      if(!model.users[model.currentUser.uid].listOfSubscribedChannels.includes(model.currentChannel.channelId)){
        return <h6 className='unsubscribedLabel m-3'>Unsubscribed</h6>
      }
    }
  }, [model, model.currentChannel])

  const titleOfHeader = useMemo(() => {
    return model && model.currentChannel ? model.currentChannel.name : ''
  }, [model, model.currentChannel])

  const handleTheme = (e) => {
    if (e) {
      document.documentElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
    }
    else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }    
  }

  return (
    <Row className='headerMain h-100 d-flex flex-row backGroundColorHeaderFooterBlack'>
      <Col className='text-center'>
        <img src='/images/logo.png' className='logo w-100 m-1' alt='logo' onClick={ () => {return <Navigate to="/" />} }/>
      </Col>
      <Col>
        <div className="hor-center ver-center channelTitle">{titleOfHeader} {unsubscribeLabel}</div>  
        <ButtonList />
      </Col>
      <Col className="text-center">
        <div className="hor-center ver-center">
          <ToggleButton className='m-3' onChange={handleTheme}/>
          <Button variant="primary customOperationalButton" onClick={handleLogout}>Log Out</Button>
        </div>
      </Col>
    </Row>
  )
}

export default Header
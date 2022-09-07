import React, { useState } from 'react'
import { Row, Col, Button, Input } from 'react-bootstrap'
import { ButtonList, ToggleButton } from '../../componentsForComponents';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import "react-toggle/style.css"
import './style.css';

const Header = ({ model, handleLogout }) => {

  return (
    <Row className='headerMain h-100 d-flex flex-row'>
      <Col className='text-center'>
        <img src='/images/logo.png' className='logo w-100 m-1' alt='logo' onClick={ () => {return <Navigate to="/" />} }/>
      </Col>
      <Col>
        <div className="hor-center ver-center">Buttons</div>  
        <ButtonList />
      </Col>
      <Col className="text-center">
        <div className="hor-center ver-center">
          <ToggleButton className='m-3' />
          <Button variant="primary" onClick={handleLogout}>Log Out</Button>
        </div>
      </Col>
    </Row>
  )
}

Header.propTypes = {
  model: PropTypes.object.isRequired,
};

Header.defaultProps = {
  model: {},
};

export default Header
import React from 'react'
import { Button, Container } from 'react-bootstrap';
import PropTypes from 'prop-types';
import './style.css';

const AccountSection = ({ handleShow }) => {



  return (
    <div className='AccountSectionMain'>
        <Button variant="primary" onClick={handleShow}>
          Settings
        </Button>
    </div>
  )
}

export default AccountSection
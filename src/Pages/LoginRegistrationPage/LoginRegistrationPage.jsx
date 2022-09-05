import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
// import { Form } from 'react-bootstrap';
// import {
//   Header,
//   ListOfChannels,
//   MainColumn,
//   AccountSection,
//   Footer
// } from '../../Components/componentsForPages'
import { RegistrationForm } from '../../Components/componentsForPages'
import PropTypes from 'prop-types';
import './style.css'

const LoginReginstrationPage = ({ model }) => {
  return (
    <Container className='LoginReginstrationPageMain' fluid>
      <Row className='h-100'>
        <Col sm={1} md={1} lg={3} xl={3} xxl={4}></Col>
        <Col sm={10} md={10} lg={6} xl={6} xxl={4} className='hor-center ver-center'>
          <div className='LoginReginstrationPageContainer hor-center ver-center'>
            <RegistrationForm model={model}/>
          </div>
        </Col>
        <Col sm={1} md={1} lg={3} xl={3} xxl={4}></Col>
      </Row>
    </Container>
  )
}

LoginReginstrationPage.propTypes = {
  model: PropTypes.object.isRequired,
};

export default LoginReginstrationPage
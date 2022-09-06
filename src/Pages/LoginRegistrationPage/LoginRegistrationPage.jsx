import React from 'react'
import { Container } from 'react-bootstrap'
import PropTypes from 'prop-types';
import './style.css'
import { SignUp } from '../../Components/componentsForComponents';

const LoginReginstrationPage = ({ model }) => {
  return (
    <Container className='d-flex align-items-center justify-content-center LoginRegistrationPageContainer' fluid>
      <div className='w-100 LoginRegistrationPageContainerInner'>
        <SignUp />
      </div>
    </Container>
  )
}

LoginReginstrationPage.propTypes = {
  model: PropTypes.object.isRequired,
};

LoginReginstrationPage.defaultProps = {
  model: {},
};

export default LoginReginstrationPage
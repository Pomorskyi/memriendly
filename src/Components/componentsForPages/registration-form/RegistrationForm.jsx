import React, { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import PropTypes from 'prop-types';
import './style.css';

const RegistrationForm = ({ model }) => {
  const [inputs, setInputs] = useState({});
  const [loginOrRegister, setLoginOrRegister] = useState('login');
  
  const auth = getAuth();

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }

  const checkAuth = () => {
    signInWithEmailAndPassword(auth, inputs.username, inputs.password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('Signed in redirect to feed')
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // errorCode = auth/user-not-found - propose to register
      // errorCode = auth/wrong-password - propose to check password
      console.log(errorCode)
      console.log(errorMessage)
      console.log('You need to register first')
      setLoginOrRegister('register')
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    checkAuth();
  }

  return (
    <form onSubmit={handleSubmit}>
      <Container fluid>
        <Row className='gy-3'>
          <Col className='hor-center ver-center' sm={12}>
            <h4>{loginOrRegister === 'login' ? 'Login' : 'Register'}</h4>

          </Col>
          <Col sm={6}>
            <label className="form-label">Username</label>
            <input type="text"
              className="form-control"
              name='username'
              value={inputs.username}
              onChange={handleChange}
              required />
          </Col>
          <Col sm={6}>
            <label className="form-label">Password</label>
            <input type="password"
              className="form-control mt-1"
              name='password'
              value={inputs.password}
              onChange={handleChange}
              required />
          </Col>
          
          {/* register */}
          {loginOrRegister === 'register' && 
            <>
              <Col sm={6}>
                <label className="form-label">Confirm username</label>
                <input type="text"
                  className="form-control"
                  name='confirmUsername'
                  value={inputs.confirmUsername}
                  onChange={handleChange}
                  required />
              </Col>
              <Col sm={6} visible={loginOrRegister === 'register'}>
                <label className="form-label">Confirm password</label>
                <input type="password"
                  className="form-control mt-1"
                  name='confirmPassword'
                  value={inputs.confirmPassword}
                  onChange={handleChange}
                  required />
              </Col>
            </>
          }

          <Col sm={12} className='hor-center ver-center'> 
            <input type="submit" value="Submit" />
          </Col>
        </Row>
      </Container>
    </form>
  );
}

RegistrationForm.propTypes = {
  model: PropTypes.object.isRequired,
};

export default RegistrationForm
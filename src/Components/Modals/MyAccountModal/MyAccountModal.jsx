import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Modal, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../../../Services/Contexts/AuthContext';
import { useDatabase } from 'src/Services/Contexts/DatabaseContext';
import { Avatar } from '../../componentsForComponents';
import './style.css';

const MyAccountModal = ({ handleClose, show }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [info, setInfo] = useState(false)
  const { currentUser, updateEmailCustom, updatePasswordCustom } = useAuth()
  const { updateNickname } = useDatabase()
  const emailRef = useRef()
  const nicknameRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()

  function handleSubmit(e){
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value){
      return setError('Password do not match')
    }

    if (nicknameRef.current.value === '' &&
        passwordRef.current.value === '' &&
        currentUser.email === emailRef.current.value){
      setInfo('You need to change fields below to update profile')
      return setTimeout(() => {setInfo('')}, 5000)
    }

    const promises = []
    setLoading(true)
    setError('')
    if (emailRef.current.value !== currentUser.email){
      promises.push(updateEmailCustom(emailRef.current.value))
    }
    if (passwordRef.current.value){
      promises.push(updatePasswordCustom(passwordRef.current.value))
    }
    if (nicknameRef.current.value){
      console.log(currentUser)
      promises.push(updateNickname(currentUser.uid, passwordRef.current.value))
    }

    Promise.all(promises).then(() => {
      setInfo('Profile updated succesfully')
      setTimeout(() => {setInfo('')}, 5000)
    }).catch(() => {
      setError('Failed to update account')
    }).finally(() => {
      setLoading(false)
    })
  }

  return (
    <Modal show={show} onHide={handleClose} className='modal-lg customModal'>
        <Modal.Header closeButton>
          <Modal.Title>Account Settings</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Row>
              <Col sm={12} lg={6}>
                <Avatar currentUser={currentUser} />
              </Col>
              <Col sm={12} lg={6}>
                <h1 className="display-6">Profile</h1>
                {error && <Alert variant="danger">{error}</Alert>}
                {info && <Alert variant="primary">{info}</Alert>}
                <Form onSubmit={handleSubmit}>
                  <Form.Group id="nickname">
                      <Form.Label>Nickname</Form.Label>
                      <Form.Control type="nickname" ref={nicknameRef} placeholder="Leave blank to keep the same"/>
                  </Form.Group>
                  <Form.Group id="email">
                      <Form.Label>Email</Form.Label>
                      <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                  </Form.Group>
                  <Form.Group id="password">
                      <Form.Label>Password</Form.Label>
                      <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"/>
                  </Form.Group>
                  <Form.Group id="password-confirmation">
                      <Form.Label>Password Confirmation</Form.Label>
                      <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same"/>
                  </Form.Group>
                  <Button disabled={loading} className="w-100 mt-4" type="submit">
                      Update
                  </Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        {/* <Modal.Footer> */}
          {/* <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button> */}
        {/* </Modal.Footer> */}
      </Modal>
  )
}

export default MyAccountModal
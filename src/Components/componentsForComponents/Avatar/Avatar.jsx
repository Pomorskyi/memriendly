import React, { useState, useEffect, useRef } from 'react'
import { Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../../Services/Contexts/AuthContext'
import _ from 'lodash'
import PropTypes from 'prop-types'
import './style.css';

const Avatar = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [info, setInfo] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState('')
  const { currentUser, updateProfile } = useAuth()
  
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    await updateProfile({ photoURL: "https://example.com/jane-q-user/profile.jpg" })
  }

  function handleAvatarChange(event){
    setAvatarUrl(event.target.value)
  } 

  useEffect(() => {
    setLoading(true)
    setAvatarUrl(_.isNil(currentUser.photoURL) ? '/images/noavatar.png' : currentUser.photoURL)
    setLoading(false)
  }, [])

  return (
    <Row>
      <h1 className="display-6">Avatar</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        {info && <Alert variant="primary">{info}</Alert>}
      <Col sm={6}>
        <img src={avatarUrl} className='avatar w-100 m-1' alt='avatar' />
      </Col>
      <Col sm={6}>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="avatar">
              <Form.Label>Choose avatar</Form.Label>
              <Form.Control type="file" className="form-control-sm" onChange={handleAvatarChange} required id="formFileSm" />
          </Form.Group>
          {/* <Button disabled={loading} className="w-100 mt-4" type="submit">
              Update avatar
          </Button> */}
          <Button disabled={true} className="w-100 mt-4" type="submit">
              Update avatar
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Avatar
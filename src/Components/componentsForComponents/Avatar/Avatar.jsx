import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../../Services/Contexts/AuthContext'
import constants from 'src/Services/constants/constants';
import _ from 'lodash'
import './style.css';

const Avatar = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [info, setInfo] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(constants.NO_PHOTO_CHOOSEN_PATH)
  const [avatarUrlLink, setAvatarUrlLink] = useState('')
  const { currentUser, updateProfileCustom } = useAuth()
  
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    new Promise((resolve, reject) => {
      if(avatarUrl !== '/images/noavatar.png'){
        updateProfileCustom({ photoURL: "" })
      }
      if(avatarUrlLink){
        updateProfileCustom({ photoURL: avatarUrlLink })
      }
      resolve('sucess')
    }).then((result) => {
      setAvatarUrl(avatarUrlLink)
    }, (error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false)
    })
  }

  function handleAvatarUrlLinkChange(event){
    setAvatarUrlLink(event.target.value)
  } 

  useEffect(() => {
    setLoading(true)
    if(currentUser.photoURL){
      setAvatarUrl(currentUser.photoURL)
    }
    setLoading(false)
  }, [])

  return (
    <Row>
      <h2>Avatar</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        {info && <Alert variant="primary">{info}</Alert>}
      <Col sm={6}>
        <img src={avatarUrl} className='avatar w-100 m-1' alt='avatar' />
      </Col>
      <Col sm={6}>
        <Form onSubmit={handleSubmit}>
          <Form.Group id="avatar">
              <Form.Label>Choose avatar</Form.Label>
              <Form.Control className='mt-3' type="text" placeholder="Input url" aria-label="avatar url" onChange={handleAvatarUrlLinkChange} required/>
          </Form.Group>
          <Button disabled={loading} className="w-100 mt-4" type="submit">
              Update avatar
          </Button>
        </Form>
      </Col>
    </Row>
  );
}

export default Avatar
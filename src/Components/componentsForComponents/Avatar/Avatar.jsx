import React, { useState, useEffect } from 'react'
import { Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../../../Services/Contexts/AuthContext'
import constants from 'src/Services/constants/constants';
import _ from 'lodash'
import './style.css';
import { useDatabase } from 'src/Services/Contexts/DatabaseContext';

const Avatar = ({ model, refreshLocalDB }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [info, setInfo] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(constants.NO_PHOTO_CHOOSEN_PATH)
  const { currentUser } = useAuth()
  const { writeUserObj } = useDatabase()
  
  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)

    new Promise((resolve, reject) => {
      console.log(avatarUrl)
      if(avatarUrl !== '/images/noavatar.png'){
        const userObj = {
          ...model.users[model.currentUser.uid],
          photoURL: avatarUrl
        }
        console.log(userObj)
        writeUserObj(model.currentUser.uid, userObj)
          .then(() => {
            refreshLocalDB('users');
            resolve('success');
          })
      }
    }).then((result) => {
      // setAvatarUrl(avatarUrl)
      setInfo('Avatar updated successfuly')
      setTimeout(() => {
        setInfo(false);
      }, 5000)
    }, (error) => {
      console.log(error)
    }).finally(() => {
      setLoading(false)
    })
  }

  function handleAvatarUrlChange(event){
    function checkURL(url) {
      return(url.match(/\.(jpeg|jpg|gif|png)$/) != null);
  }
    setAvatarUrl(
      event.target.value &&
      event.target.value.match(/\.(jpeg|jpg|gif|png)$/) != null
        ? event.target.value :
        constants.NO_PHOTO_CHOOSEN_PATH);
  } 

  useEffect(() => {
    setLoading(true)
    if(model.users[currentUser.uid].photoURL){
      setAvatarUrl(model.users[currentUser.uid].photoURL)
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
              <Form.Control className='mt-3' type="text" placeholder="Input url" aria-label="avatar url" onChange={handleAvatarUrlChange} required/>
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
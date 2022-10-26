import React, { useState, useRef, useEffect } from 'react'
import { useNavigate  } from 'react-router-dom'
import { Container, Row, Col, Button, Modal, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../../../Services/Contexts/AuthContext';
import { useDatabase } from 'src/Services/Contexts/DatabaseContext';
import constants from 'src/Services/constants/constants';
import './style.css';

const CreateChannelModal = ({ handleClose, show, model, setShowCreateChannel, refreshLocalDB, subscribeToCurrentChannel }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(constants.NO_PHOTO_CHOOSEN_PATH)
  const [info, setInfo] = useState(false)
  const { currentUser } = useAuth()
  const { createChannel } = useDatabase()
  const nameRef = useRef()
  const discriptionRef = useRef()
  const navigate  = useNavigate()

  useEffect(() => {
    setLoading(true)
    if(model.currentChannel && model.currentChannel.photoUrl && model.currentChannel.photoUrl !== constants.NO_PHOTO_CHOOSEN_PATH){
      setAvatarUrl(model.currentChannel.photoUrl)
    }
    setLoading(false)
  }, [])


  function handleSubmit(e){
    e.preventDefault()
    setLoading(true);

    createChannel(currentUser, nameRef.current.value, discriptionRef.current.value, avatarUrl)
      .then((idOfChannel) => {
        refreshLocalDB('channels').then(() => {
          setShowCreateChannel(false)
          subscribeToCurrentChannel().then(() => {
            navigate('/' + idOfChannel)
          })
        })
      }, (error) => {
        setError(error)
        setTimeout(() => {setError('')}, 5000)
      })
      .finally(() => {
        setLoading(false)
        console.log(model)
      });
  }

  function handleAvatarUrlLinkChange(event) {
    setAvatarUrl(event.target.value)
  }

  return (
    <Modal show={show} onHide={handleClose} className='modal-lg customModal'>
        <Modal.Header closeButton>
          <Modal.Title>Create channel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container fluid>
            <Form onSubmit={handleSubmit}>
              <Row>
                {error && <Alert variant="danger">{error}</Alert>}
                {info && <Alert variant="primary">{info}</Alert>}
                <Col sm={12} lg={6}>
                  <h2>Logo</h2>
                  <Row>
                    <Col sm={6}>
                      <img src={avatarUrl} className='avatar w-100 m-1 p-2' alt='logo' />
                    </Col>
                    <Col sm={6}>
                      <Form.Group id="logo">
                        <Form.Control type="text" placeholder="Input url" aria-label="avatar url" onChange={handleAvatarUrlLinkChange}/>
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col sm={12} lg={6}>
                  <Form.Group id="name">
                    <h2>Name</h2>
                    <Form.Control type="nickname" ref={nameRef} placeholder=""/>
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group id="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control type="nickname" ref={discriptionRef} placeholder=""/>
                  </Form.Group>
                </Col>
                <Button disabled={loading} className="w-100 mt-4 customOperationalButton" type="submit">
                  Create channel
                </Button>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
  )
}

export default CreateChannelModal
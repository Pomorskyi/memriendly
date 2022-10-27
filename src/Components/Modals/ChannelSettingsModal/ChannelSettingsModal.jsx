import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col, Button, Modal, Form, Alert } from 'react-bootstrap'
import { useDatabase } from 'src/Services/Contexts/DatabaseContext';
import constants from 'src/Services/constants/constants';
import './style.css';

const ChannelSettingsModal = ({ handleClose, show, model, setShowChannelSettings, refreshLocalDB }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(constants.NO_PHOTO_CHOOSEN_PATH)
  const [info, setInfo] = useState(false)
  const { updateChannel } = useDatabase()
  const nameRef = useRef()
  const discriptionRef = useRef()

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

    updateChannel(model.currentChannel.channelId, nameRef.current.value, discriptionRef.current.value, avatarUrl)
      .then(() => {
        refreshLocalDB('channels').then(() => {
          setShowChannelSettings(false)
        })
      }, (error) => {
        setError(error)
        setTimeout(() => {setError('')}, 5000)
      })
      .finally(() => {
        setLoading(false)
      });
  }

  function handleAvatarUrlLinkChange(event) {
    setAvatarUrl(event.target.value)
  }

  return (
    <Modal show={show} onHide={handleClose} className='modal-lg customModal'>
        <Modal.Header closeButton>
          <Modal.Title>Update channel</Modal.Title>
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
                    <Form.Control type="nickname" ref={nameRef} placeholder="Leave blank to keep the same" />
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group id="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control type="nickname" ref={discriptionRef} placeholder="Leave blank to keep the same" />
                  </Form.Group>
                </Col>
                <Button disabled={loading} className="w-100 mt-4 customOperationalButton" type="submit">
                  Update channel
                </Button>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
  )
}

export default ChannelSettingsModal
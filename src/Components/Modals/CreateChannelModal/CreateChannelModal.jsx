import React, { useState, useRef, useMemo, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types';
import { Container, Row, Col, Button, Modal, Form, Alert } from 'react-bootstrap'
import { useAuth } from '../../../Services/Contexts/AuthContext';
import { useDatabase } from 'src/Services/Contexts/DatabaseContext';
import { Avatar } from '../../componentsForComponents';
import constants from 'src/Services/constants/constants';
import './style.css';
import _ from 'lodash';

const CreateChannelModal = ({ handleClose, show, model, setShowCreateChannel }) => {
  const [loading, setLoading] = useState(false)
  const [logoPreview, setLogoPreview] = useState(constants.NO_PHOTO_CHOOSEN_PATH)
  const [error, setError] = useState(false)
  const [info, setInfo] = useState(false)
  const { currentUser } = useAuth()
  const { writeChannel, updateChannelsTable } = useDatabase()
  const nameRef = useRef()
  const discriptionRef = useRef()
  // const photoUrlRef = useRef()

  // useEffect(() => {
  //   setLogoPreview()
  // }, [])
  

  function handleSubmit(e){
    e.preventDefault()

    function haveDuplicateName(nameOfChannel) {
      const duplicateObj = Object.keys(model.channels).find(channelID => {
        return model.channels[channelID].name === nameOfChannel
      })

      return !_.isNil(duplicateObj);
    }

    if (!haveDuplicateName(nameRef.current.value)) {
      writeChannel(currentUser, nameRef.current.value, discriptionRef.current.value, logoPreview);
      updateChannelsTable()
      setShowCreateChannel(false)
    }

    // if (passwordRef.current.value !== passwordConfirmRef.current.value){
    //   return setError('Password do not match')
    // }

    // if (nicknameRef.current.value === '' &&
    //     passwordRef.current.value === '' &&
    //     currentUser.email === emailRef.current.value){
    //   setInfo('You need to change fields below to update profile')
    //   return setTimeout(() => {setInfo('')}, 5000)
    // }

    // const promises = []
    // setLoading(true)
    // setError('')
    // if (emailRef.current.value !== currentUser.email){
    //   promises.push(updateEmailCustom(emailRef.current.value))
    // }
    // if (passwordRef.current.value){
    //   promises.push(updatePasswordCustom(passwordRef.current.value))
    // }
    // if (nicknameRef.current.value){
    //   console.log(currentUser)
    //   promises.push(updateNickname(currentUser.uid, passwordRef.current.value))
    // }

    // Promise.all(promises).then(() => {
    //   setInfo('Profile updated succesfully')
    //   setTimeout(() => {setInfo('')}, 5000)
    // }).catch(() => {
    //   setError('Failed to update account')
    // }).finally(() => {
    //   setLoading(false)
    // })
  }

  const handleLogoChange = (e) => {
    e.preventDefault()
    
    // var blobObj = new Blob([atob(e.target.value)], { type: "application/pdf" });
    var url = window.URL.createObjectURL(e.target.value,);
    console.log(url)
    // document.getElementById("iframe-target").setAttribute("src", url);

    setLogoPreview(url)

    console.log()
  }

  return (
    <Modal show={show} onHide={handleClose} className='modal-lg'>
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
                  <Row>
                    <Col sm={6}>
                      <img src={logoPreview} className='avatar w-100 m-1 p-2' alt='logo' />
                    </Col>
                    <Col sm={6}>
                      <Form.Group id="logo">
                        <Form.Control type="file" className="form-control-sm" onChange={handleLogoChange} id="formFileSm" />
                      </Form.Group>
                    </Col>
                  </Row>
                </Col>
                <Col sm={12} lg={6}>
                  <Form.Group id="name">
                      <Form.Label>Name</Form.Label>
                      <Form.Control type="nickname" ref={nameRef} placeholder=""/>
                  </Form.Group>
                </Col>
                <Col sm={12}>
                  <Form.Group id="description">
                      <Form.Label>Description</Form.Label>
                      <Form.Control type="nickname" ref={discriptionRef} placeholder=""/>
                  </Form.Group>
                </Col>
                <Button disabled={loading} className="w-100 mt-4" type="submit">
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
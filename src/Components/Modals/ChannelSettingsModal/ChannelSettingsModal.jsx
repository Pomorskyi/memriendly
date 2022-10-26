import React, { useState, useRef, useEffect } from 'react'
import { Container, Row, Col, Button, Modal, Form, Alert } from 'react-bootstrap'
import { useNavigate  } from 'react-router-dom'
import { useAuth } from '../../../Services/Contexts/AuthContext';
import { useDatabase } from 'src/Services/Contexts/DatabaseContext';
import constants from 'src/Services/constants/constants';
import { Avatar } from '../../componentsForComponents';
import './style.css';

const ChannelSettingsModal = ({ handleClose, show, model, setShowChannelSettings, refreshLocalDB }) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [avatarUrl, setAvatarUrl] = useState(constants.NO_PHOTO_CHOOSEN_PATH)
  const [info, setInfo] = useState(false)
  const { currentUser } = useAuth()
  const { updateChannel } = useDatabase()
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

    // createChannel(currentUser, nameRef.current.value, discriptionRef.current.value, avatarUrl)
    //   .then((idOfChannel) => {
    //     refreshLocalDB('channels').then(() => {
    //       setShowChannelSettings(false)
    //       subscribeToCurrentChannel().then(() => {
    //         navigate('/' + idOfChannel)
    //       })
    //     })
    //   }, (error) => {
    //     setError(error)
    //     setTimeout(() => {setError('')}, 5000)
    //   })
    //   .finally(() => {
    //     setLoading(false)
    //     console.log(model)
    //   });
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

// const ChannelSettingsModal = ({ handleClose, show, model, refreshLocalDB }) => {
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState(false)
//   const [info, setInfo] = useState(false)
//   const { currentUser, updateEmailCustom, updatePasswordCustom } = useAuth()
//   const { updateNickname } = useDatabase()
//   const emailRef = useRef()
//   const nicknameRef = useRef()
//   const passwordRef = useRef()
//   const passwordConfirmRef = useRef()

//   function handleSubmit(e){
//     e.preventDefault()
//     if (passwordRef.current.value !== passwordConfirmRef.current.value){
//       return setError('Password do not match')
//     }

//     if (nicknameRef.current.value === '' &&
//         passwordRef.current.value === '' &&
//         currentUser.email === emailRef.current.value){
//       setInfo('You need to change fields below to update profile')
//       return setTimeout(() => {setInfo('')}, 5000)
//     }

//     const promises = []
//     setLoading(true)
//     setError('')
//     if (emailRef.current.value !== currentUser.email){
//       promises.push(updateEmailCustom(emailRef.current.value))
//     }
//     if (passwordRef.current.value){
//       promises.push(updatePasswordCustom(passwordRef.current.value))
//     }
//     if (nicknameRef.current.value){
//       promises.push(updateNickname(currentUser.uid, nicknameRef.current.value))
//     }

//     Promise.all(promises).then(() => {
//       refreshLocalDB('users');
//       setInfo('Profile updated succesfully')
//       setTimeout(() => {setInfo('')}, 5000)
//     }).catch(() => {
//       setError('Failed to update account. Try again later')
//     }).finally(() => {
//       setLoading(false)
//     })
//   }

//   return (
//     <Modal show={show} onHide={handleClose} className='modal-lg customModal'>
//         <Modal.Header closeButton>
//           <Modal.Title>Channel Settings</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Container fluid>
//             <Row>
//               <Col sm={12} lg={6}>
//                 <Avatar currentUser={currentUser} model={model} refreshLocalDB={refreshLocalDB} />
//               </Col>
//               <Col sm={12} lg={6}>
//                 <h2>Profile</h2>
//                 {error && <Alert variant="danger">{error}</Alert>}
//                 {info && <Alert variant="primary">{info}</Alert>}
//                 <Form onSubmit={handleSubmit}>
//                   <Form.Group id="nickname">
//                       <Form.Label>Nickname</Form.Label>
//                       <Form.Control type="nickname" ref={nicknameRef} placeholder="Leave blank to keep the same"/>
//                   </Form.Group>
//                   <Form.Group id="email">
//                       <Form.Label>Email</Form.Label>
//                       <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
//                   </Form.Group>
//                   <Form.Group id="password">
//                       <Form.Label>Password</Form.Label>
//                       <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"/>
//                   </Form.Group>
//                   <Form.Group id="password-confirmation">
//                       <Form.Label>Password Confirmation</Form.Label>
//                       <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same"/>
//                   </Form.Group>
//                   <Button disabled={loading} className="w-100 mt-4" type="submit">
//                       Update
//                   </Button>
//                 </Form>
//               </Col>
//             </Row>
//           </Container>
//         </Modal.Body>
//         <Modal.Footer>
//           <h5>To not change a channel leave blank</h5>
//         </Modal.Footer>
//       </Modal>
//   )
// }

export default ChannelSettingsModal
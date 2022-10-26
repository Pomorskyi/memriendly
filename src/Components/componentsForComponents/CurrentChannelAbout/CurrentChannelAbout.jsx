import React, { useMemo, useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import constants from 'src/Services/constants/constants';
import _ from 'lodash'
import './style.css';

const CurrentChannelAbout  = ({ model }) => {
  const [isShown, setIsShown] = useState('false')

  useEffect(() => {
    setIsShown(!_.isNil(model.currentChannel))
  }, [model.currentChannel])

  const rowClasses = useMemo(() => {
    if(isShown){
      return ['pb-3']
    } else {
      return []
    }
    
  } ,[isShown]);

  const description = useMemo(() => {
    if(model.currentChannel && model.channels[model.currentChannel.channelId].description){
      return model.channels[model.currentChannel.channelId].description;
    } else {
      return null
    }
  }, [model.currentChannel, model.channels])

  const image = useMemo(() => {
    const url = model.currentChannel &&
      model.channels[model.currentChannel.channelId].photoUrl ?
        model.channels[model.currentChannel.channelId].photoUrl :
        constants.NO_PHOTO_CHOOSEN_PATH
    return <img src={url} className='avatar w-100' alt='bigAvatar' />
  }, [model.currentChannel, model.channels]);

  const name = useMemo(() => {
    if(model.currentChannel) {
      return model.channels[model.currentChannel.channelId].name ? model.channels[model.currentChannel.channelId].name : 'no-name';
    }
  }, [model.currentChannel, model.channels])

  const admin = useMemo(() => {
    if(model.currentChannel){
      const owner = model.users[model.currentChannel.owner];
      const isMyChannel = model.currentChannel.owner === model.currentUser.uid
      const photoUrl = owner.photoURL ? owner.photoURL : constants.NO_PHOTO_CHOOSEN_PATH
      if(owner) {
        return (
          <div className='admin'>
            <img className='avatar p-1' src={photoUrl} alt='userPhoto' />
            <h6 className='administratorNickname threeDotsInTheEnd'>{owner.nickname}</h6>
            {isMyChannel && <h6 className='administratorNickname'><span className='itIsMineChannel'> (you)</span></h6>}
          </div>
        )
      }
    }
  }, [model.currentChannel])

  if(isShown){
    return (
      <React.Fragment>
        <Row id='currentChannelAboutLogoBigRow' className={rowClasses} >
          <Col>
            {image}
          </Col>
        </Row>
        <Row>
          <Col>
            <h3 className='channelName'>{name}</h3>
          </Col>
        </Row>
        {description && <Row className='channelDescription pb-3'><Col>{description}</Col></Row>}
        <Row className='channelDescription'>
          <Col>
            Administrator
          </Col>
        </Row>
        <Row className='mb-3'>
          <Col>
            {admin}
          </Col>
        </Row>
      </React.Fragment>
   );
  }
}

export default CurrentChannelAbout 
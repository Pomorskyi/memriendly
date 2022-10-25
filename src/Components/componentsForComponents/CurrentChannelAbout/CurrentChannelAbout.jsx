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
    if(model.currentChannel && model.currentChannel.description){
      return model.currentChannel.description;
    } else {
      return null
    }
  }, [model.currentChannel])

  const image = useMemo(() => {
    const url = model.currentChannel && model.currentChannel.photoUrl ? model.currentChannel.photoUrl : constants.NO_PHOTO_CHOOSEN_PATH
    return <img src={url} className='avatar w-100' alt='bigAvatar' />
  }, [model.currentChannel]);

  if(isShown){
    return (
      <React.Fragment>
        <Row id='currentChannelAboutLogoBigRow' className={rowClasses} >
          <Col>
            {image}
          </Col>
        </Row>
        {description && <Row className='channelDescription pb-3'><Col>{description}</Col></Row>}
      </React.Fragment>
   );
  }
}

export default CurrentChannelAbout 
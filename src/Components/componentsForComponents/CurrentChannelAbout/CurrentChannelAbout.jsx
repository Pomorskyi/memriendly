import React, { useMemo, useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import _ from 'lodash'
import './style.css';

const CurrentChannelAbout  = ({ model }) => {
  const [isShown, setIsShown] = useState('false')

  useEffect(() => {
    setIsShown(!_.isNil(model.currentChannel))
  }, [model.currentChannel])

  const rowClasses = useMemo(() => {
    if(isShown){
      return ['']
    } else {
      return []
    }
    
  } ,[isShown]);

  const image = useMemo(() => {
    // const url = _.isNil(model.currentChannel) ? '/images/noavatar.png' : model.currentChannel.photoUrl // TODO
    const url = '/images/noavatar.png'
    if(model.currentChannel) {
      return <img src={url} className='avatar w-100 m-1' alt='bigAvatar' />
    }
  }, [model.currentChannel]);

  if(isShown){
    return (
     <Row id='currentChannelAboutLogoBigRow' className={rowClasses} >
       <Col>
         {image}
       </Col>
     </Row>
   );
  }
}

export default CurrentChannelAbout 
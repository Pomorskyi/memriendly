import React, { useMemo } from 'react'
// import { Container, Row } from 'react-bootstrap'
// import { ButtonList } from '../../componentsForComponents';
import PropTypes from 'prop-types';
import './style.css';

const MainColumn = ({ model }) => {

  //TODO: if(JSON.stringify(model.currentChannel) === null) show 'No chosen Channel'
  return (
    <div className='MainColumnMain'>
      {JSON.stringify(model.currentChannel)}
      {/* {
        { currentChannel } = model.channels
      } */}
      {/* {model.channels.find(el => el.)} */}
      {/* <h6>{JSON.stringify(users)}</h6>
      <h6>{JSON.stringify(channels)}</h6> */}
      {/* <button onClick={() => {}}>Create Channel</button> */}
    </div>
  )
}

export default MainColumn
import React from 'react'
// import { Container, Row } from 'react-bootstrap'
// import { ButtonList } from '../../componentsForComponents';
import PropTypes from 'prop-types';
import './style.css';

const ListOfChannels = ({ model }) => {
  return (
    <div className="ListOfChannelsMain"></div>
  )
}

ListOfChannels.propTypes = {
  model: PropTypes.object.isRequired,
};

export default ListOfChannels
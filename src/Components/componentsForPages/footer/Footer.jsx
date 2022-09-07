import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import PropTypes from 'prop-types';
import './style.css';

const Footer = () => {

  return (
    <Row className='footerMain'>
      <Col>
        SADSD
      </Col>
    </Row>
  )
}

Footer.propTypes = {
  handleLogout: PropTypes.func.isRequired,
};

Footer.defaultProps = {
  handleLogout: () => {},
};

export default Footer
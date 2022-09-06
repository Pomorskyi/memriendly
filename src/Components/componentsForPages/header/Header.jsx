import React from 'react'
import { Row, Col } from 'react-bootstrap'
import { ButtonList } from '../../componentsForComponents';
import PropTypes from 'prop-types';
import './style.css';

const Header = ({ model }) => {



  return (
    <Row className='headerMain'>
      <Col>
        <p className="hor-center ver-center logo">Memriendly</p>
      </Col>
      <Col>
        <div className="hor-center ver-center">Buttons</div>  
        <ButtonList />
      </Col>
      <Col>
      <div className="hor-center ver-center">Panel</div>  
      </Col>
    </Row>
  )
}

Header.propTypes = {
  model: PropTypes.object.isRequired,
};

Header.defaultProps = {
  model: {},
};

export default Header
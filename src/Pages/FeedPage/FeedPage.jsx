import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import {
  Header,
  ListOfChannels,
  MainColumn,
  AccountSection,
  Footer
} from '../../Components/componentsForPages'
import PropTypes from 'prop-types';
import './style.css'

const FeedPage = ({ model }) => {
  return (
    <Container className='FeedPageContainer h-100 d-flex flex-column' fluid>
      <Row className='h-10'>
        <Col>
          <Header model></Header>
        </Col>
      </Row>
      <Row className='flex-grow-1'>
        <Col sm={0} md={0} lg={3} xl={2} xxl={2} className='d-none d-lg-block'>
          <ListOfChannels model className='listOfChannels'></ListOfChannels>
        </Col>
        <Col sm={12} md={8} lg={6} xl={8} xxl={8}>
          <MainColumn model className='mainColumn'></MainColumn>
        </Col>
        <Col sm={0} md={4} lg={3} xl={2} xxl={2} className='d-none d-md-block'>
          <AccountSection model className='accountSection'></AccountSection>
        </Col>
      </Row>
      <Row className='h-10'>
        <Col>
          <Footer></Footer>
        </Col>
      </Row>
    </Container>
  )
}

FeedPage.propTypes = {
  model: PropTypes.object.isRequired,
};

export default FeedPage
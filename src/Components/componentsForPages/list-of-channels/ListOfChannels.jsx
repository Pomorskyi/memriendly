import React, { useEffect } from 'react'
// import { Container, Row } from 'react-bootstrap'
// import { ButtonList } from '../../componentsForComponents';
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import './style.css';

const ListOfChannels = ({ model }) => {
  console.log(model)

  function getListOfElements() {
    const res = []
    Object.keys(model.listOfChannels).map((el) => {
      console.log(el)
      console.log(model.listOfChannels[el])
      res.push(
        <li className='listElement'>
          <Link
            to={'/channel/' + el}
          >
            {model.listOfChannels[el].name}
          </Link>
        </li>
      )
    })
    console.log(res)
    return <ul className='listOfElementsLi hor-center'>{res}</ul>
  }

  return (
    <div className="ListOfChannelsMain text-center">
      {getListOfElements()}
    </div>
  )
}

export default ListOfChannels
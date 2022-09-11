import React from 'react'
import { Link } from "react-router-dom";
import './style.css';

const ListOfChannels = ({ model }) => {

  function getListOfElements() {
    const res = []
    Object.keys(model.channels).map((el) => {
      res.push(
        <li className='listElement mb-2' key={el}>
          <Link
            className='listElementLink'
            to={'/channel/' + el}
          >
            <div className="listElementLinkContainer">
              <img className='avatar' alt='avatar' src={
                model.channels[el].photoUrl.length > 0 ? model.channels[el].photoUrl : '/images/noavatar.png'}
              />
              <div className='listElementLinkText ml-2'>{model.channels[el].name}</div>
            </div>
          </Link>
        </li>
      )
    })
    return <ul className='listOfElementsUl hor-center'>{res}</ul>
  }

  return (
    <div className="ListOfChannelsMain scrollbarstyle">
      {getListOfElements()}
    </div>
  )
}

export default ListOfChannels
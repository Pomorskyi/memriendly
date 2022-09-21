import _ from 'lodash';
import React, { useState, useEffect, useCallback } from 'react'
import { Link } from "react-router-dom";
import './style.css';

const ListOfChannels = ({ listOfSubscribedChannels, allChannels }) => {
  const [currentInput, setCurrentInput] = useState('')
  const [showSearching, setShowSearching] = useState(false)

  const handleCurrentInputChange = (e) => {
    setCurrentInput(e.target.value)
    setShowSearching(e.target.value !== '')
  }

  const renderedListOfAllChannels = useCallback(() => {
    console.log('allChannels', allChannels)
    return getListOfElements(allChannels, currentInput)
  }, [allChannels, currentInput])

  const renderedListOfSubscribedChannels = useCallback(() => {
    console.log('listOfSubscribedChannels', listOfSubscribedChannels)
    return getListOfElements(listOfSubscribedChannels)
  }, [listOfSubscribedChannels])

  function getListOfElements(list, serachingValue = '') {
    console.log(list)
    const res = []
    var objKeys = []

    if(serachingValue !== '' && !_.isNil(list)){
      objKeys = Object.keys(list)
      .filter((el) => {
        return list[el].name.toUpperCase().includes(currentInput.toUpperCase())
      })
    } else {
      objKeys = Object.keys(list)
    }

    objKeys.map((el) => {
      res.push(
        <li className='listElement mb-2' key={el}>
          <Link
            className='listElementLink'
            to={'/channel/' + el}
          >
            <div className="listElementLinkContainer">
              <img className='avatar' alt='avatar' src={
                list[el].photoUrl.length > 0 ? list[el].photoUrl : '/images/noavatar.png'}
              />
              <h6 className='listElementLinkText ml-2'>{list[el].name}</h6>
            </div>
          </Link>
        </li>
      )
    })
    return <ul className='listOfElementsUl hor-center'>{res}</ul>
  };

  function closeSearch() {
    setCurrentInput('')
    setShowSearching(false)
  }

  return (
    <div className="ListOfChannelsMain scrollbarstyle">
      <input className='searchChannel' type="text" onChange={handleCurrentInputChange} value={currentInput}/>
      { !showSearching && renderedListOfSubscribedChannels() }
      { showSearching && <div className='listOfElementsUl hor-center' >
        <div className="searchNav">
          <h5 className='searchLabel'>Search</h5>
          <button className='closeSearchBtn' onClick={() => closeSearch()}>X</button>
        </div>
        <ul className='listOfElementsUl hor-center'>{ renderedListOfAllChannels() }</ul>
      </div> }
    </div>
  )
}

export default ListOfChannels
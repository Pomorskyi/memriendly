import React, { useState, useEffect } from 'react'
import { useMemo } from 'react';
import { Link } from "react-router-dom";
import './style.css';

const ListOfChannels = ({ model }) => {
  const [currentInput, setCurrentInput] = useState('')
  const [showSearching, setShowSearching] = useState(false)

  const handleCurrentInputChange = (e) => {
    setCurrentInput(e.target.value)
    setShowSearching(e.target.value !== '')
  }

  const getListOfElements = useMemo(() => {
    const res = []
    var objKeys = []

    if(currentInput){
      objKeys = Object.keys(model.channels)
      .filter((el) => {
        return model.channels[el].name.toUpperCase().includes(currentInput.toUpperCase())
      })
    } else {
      objKeys = Object.keys(model.channels)
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
                model.channels[el].photoUrl.length > 0 ? model.channels[el].photoUrl : '/images/noavatar.png'}
              />
              <h6 className='listElementLinkText ml-2'>{model.channels[el].name}</h6>
            </div>
          </Link>
        </li>
      )
    })
    return <ul className='listOfElementsUl hor-center'>{res}</ul>
  }, [currentInput, model.channels])

  function closeSearch() {
    setCurrentInput('')
    setShowSearching(false)
  }

  return (
    <div className="ListOfChannelsMain scrollbarstyle">
      <input className='searchChannel' type="text" onChange={handleCurrentInputChange} value={currentInput}/>
      { !showSearching && getListOfElements }
      { showSearching && <div className='listOfElementsUl hor-center' >
        <div className="searchNav">
          <h5 className='searchLabel'>Search</h5>
          <button className='closeSearchBtn' onClick={() => closeSearch()}>X</button>
        </div>
        <ul className='listOfElementsUl hor-center'>{getListOfElements}</ul>
      </div> }
    </div>
  )
}

export default ListOfChannels
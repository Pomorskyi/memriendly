import _ from 'lodash';
import React, { useState, useCallback } from 'react'
import { Link } from "react-router-dom";
import './style.css';

const ListOfChannels = ({ subscribedChannels, allChannels, model }) => {
  const [currentInput, setCurrentInput] = useState('')
  const [showSearching, setShowSearching] = useState(false)

  const handleCurrentInputChange = (e) => {
    setCurrentInput(e.target.value)
    setShowSearching(e.target.value !== '')
  }

  const renderedListOfAllChannels = useCallback(() => {
    return getListOfElements(allChannels, currentInput, true, true)
  }, [allChannels, currentInput])

  const renderedListOfSubscribedChannels = useCallback(() => {
    if(Object.keys(subscribedChannels).length > 0){
      return getListOfElements(subscribedChannels)
    } else {
      return <div className='noSubscribedChannels'><p>you have no subscribed channels</p></div>
    }
  }, [subscribedChannels])

  function getListOfElements(list, serachingValue = '', showSubscribing = false, showFollowers = false) {
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

    function getSubscribedLabel (el) {
      var res = ''
      console.log(model)
      const isSubscribed = showSubscribing && model.channels[el].subscribers &&
        model.channels[el].subscribers.includes(model.currentUser.uid)
      const numOfSubscribers = model.channels[el].subscribers ? model.channels[el].subscribers.length : 0

      if(isSubscribed){
        res = 'Subscribed '.concat(showFollowers ? '(' + numOfSubscribers + ' followers)' : '')
      } else {
        res = showFollowers ? numOfSubscribers + ' followers' : ''
      }

      return res
    }

    objKeys.map((el) => {
      res.push(
        <li className='listElement mb-2 listElementBGColor' key={el}>
          <Link
            className='listElementLink'
            to={'/channel/' + el}
          >
            <div className="listElementLinkContainer">
              <img className='p-2 avatar' alt='avatar' src={
                list[el].photoUrl.length > 0 ? list[el].photoUrl : '/images/noavatar.png'}
              />
              <h6 className='listElementLinkText ml-2'>{list[el].name}</h6>
              <h6 className='subscribedLabel ml-2'>{getSubscribedLabel(el)}</h6>
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
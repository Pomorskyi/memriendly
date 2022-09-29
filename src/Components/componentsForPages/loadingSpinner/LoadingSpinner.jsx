import React from 'react'
import { useMemo } from 'react';
import './style.css';

const LoadingSpinner = ({show}) => {

  const bgStyle = useMemo(() => {
    const bgStyles = ['spinner-container']
    if(show){
      bgStyles.push('loadingBackground')
    } else {
      if(bgStyles.includes('loadingBackground')){
        bgStyles.splice(bgStyles.findIndex('loadingBackground'), 1)
      }
    }
    return bgStyles.toString().replace(',', ' ')
  }, [show])

  if(show)
  return (
    <div className={bgStyle}>
      <div className="loading-spinner">
      </div>
    </div>
  )
}

export default LoadingSpinner
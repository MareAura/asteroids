import React from 'react'

export default function LoadingSpinner({isLoading, children}) {
  return (
    isLoading 
    ? <div className='loader'><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
    : children
  )
}

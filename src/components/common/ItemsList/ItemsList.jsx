import React from 'react'
import './_ItemsList.scss'

const ItemsList = ({ children }) => {
  return (
    <div className='itemsList'>
        {children}
    </div>
  )
}

export default ItemsList
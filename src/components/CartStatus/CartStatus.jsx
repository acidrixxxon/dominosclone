import React from 'react'
import './_CartStatus.scss'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { GlobalContext } from '../../App'
import { Link } from 'react-router-dom'

const CartStatus = () => {

  const { globalState: { cart } } = React.useContext(GlobalContext)

  
  return (
    <Link to="/cart" className='cartStatus'>
        <span className='cartStatus-count'>
            {cart === null ? '00' : cart.totalItems === 0 ? '00' : cart?.totalItems < 10 ? `0${cart?.totalItems}` : cart?.totalItems}
            <AiOutlineShoppingCart />
        </span>

        <span className="cartStatus-price">
            {cart === null ? 0 : cart.totalCost}.00 грн
        </span>

        <span to="/cart" className="cartStatus-orderBtn">
            Замовити
        </span>
    </Link>
  )
}

export default CartStatus
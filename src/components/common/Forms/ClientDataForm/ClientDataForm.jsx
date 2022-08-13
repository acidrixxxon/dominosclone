import React from 'react'
import { GlobalContext } from '../../../../App'

const ClientDataForm = () => {

  const { changeOrderDetails,globalState: { cart: { details: { client }}} } = React.useContext(GlobalContext)

  const changeHandler = (e) => {
    changeOrderDetails('client',e.target.name,e.target.value)
  }

  return (
    <div className="cartPage-contactForm form-title">
        <h4 className="cartPage-title">
            Контакти
        </h4>

        <div className="form-row cols-3">
            <input type='text' placeholder='Імя' name='name' value={client.name} onChange={changeHandler} className='cart-defaultInput'/>
            <input type='text' placeholder='Телефон' name='phone' value={client.phone} onChange={changeHandler} className='cart-defaultInput'/>
            <input type='text' placeholder='Email' name='email' value={client.email} onChange={changeHandler} className='cart-defaultInput'/>
        </div>
    </div>
  )
}

export default ClientDataForm
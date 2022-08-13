import React from 'react'
import { GlobalContext } from '../../../../App'
import { paymentTypes } from '../../../../mockdata'
import Toggler from '../../Toggler/Toggler'
import './_DeliveryOrderForm.scss'

const DeliveryOrderForm = () => {
  const [ showPaymentVariants,setShowPaymentVariants ] = React.useState(false)
  const paymentEl = React.useRef(null)

  const { globalState: { cart: { totalCost,details: {address,paymentType} }},changeOrderDetails,changePaymentType } = React.useContext(GlobalContext)
  const { globalState: { cart }} = React.useContext(GlobalContext)
  

  const togglePaymentVariants = () => setShowPaymentVariants(state => !state)

  //close payment variants on outside click
  React.useEffect(() => {
    const handleClickOutside = (e) => {
      const path = e.path || (e.composedPath && e.composedPath());
      if (!path.includes(paymentEl.current)) {
          setShowPaymentVariants(false)
      }
    }

    document.addEventListener('click',handleClickOutside)

    return () => document.removeEventListener('click',handleClickOutside)
  },[])

  const changeHandler = (e) => {
    changeOrderDetails('address',e.target.name,e.target.value)
  }

  const createOrderHandler = () => {
    const newOrder = {
      items: cart.items,
      totalItems: cart.totalItems,
      totalCost: cart.totalCost,
      ...cart.details.client,
      ...cart.details.address,
      payment: paymentType
    }

    //validation,error handling
    console.log(newOrder)
  }

  return (
    <div className='deliveryOrder'>
      <div className="deliveryOrder-infoBlock">
        <h4 className="deliveryOrder-title form-title">
          Адреса
        </h4>

        <div className="form-row">
          <input type="text" placeholder='Вулиця' name='street' value={address.street} onChange={changeHandler} className="deliveryOrder-input cart-defaultInput" />
        </div>

        <div className="form-row cols-3">
          <input type="text" placeholder='Будинок' name='house' value={address.house} onChange={changeHandler} className='deliveryOrder-input cart-defaultInput'/>
          <input type="text" placeholder='Квартира' name='room' value={address.room} onChange={changeHandler} className='deliveryOrder-input cart-defaultInput'/>
          <input type="text" placeholder='Поверх' name='floor' value={address.floor} onChange={changeHandler} className='deliveryOrder-input cart-defaultInput'/>
        </div>

        <div className="form-row textarea">
          <textarea placeholder='Коментар' name='comments' value={address.comments} onChange={changeHandler}  className='cartPage-textarea cart-defaultInput'></textarea>
        </div>
      </div>

      <div className="deliveryOrder-infoBlock">
        <h4 className="deliveryOrder-title form-title">
          Оплата
        </h4>

        <div className="form-row cols-3">
          <div className="cart-payment dropdown" onClick={togglePaymentVariants} ref={paymentEl}>
            {paymentType === null ? 'Тип оплати' : paymentType.title}
            
            <svg width="10" className={showPaymentVariants ? 'rotated' : ''} height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" fill="#2C2C2C"></path></svg>

            {showPaymentVariants && 
              <ul className="cart-paymentList dropdown-variants">
                {paymentTypes.map((item) => (
                  <li className="cart-paymentItem" key={item.id} onClick={() => changePaymentType(item)}>
                    {item.title}
                  </li>
                ))}
              </ul>}
          </div>

          {paymentType?.id === 0 && <input type="text" placeholder='Решта з...' disabled={paymentType?.change === 0} onChange={(e) => changePaymentType({...paymentType,change: Number(e.target.value)})} className='deliveryOrder-input cart-defaultInput'/>}
          {paymentType?.id === 0 && <Toggler label='Без решти' onToggle={() => changePaymentType({...paymentType,change: paymentType.change === 0 ? null : 0})}/> }

        </div>
      </div>

      <div className="deliveryOrder-total">
        <h4 className="deliveryOrder-totalTitle">Усьго</h4>
        <div className="deliveryOrder-totalPrice">
          <span className="number">{totalCost}.00</span>
          <span className="text">грн</span>
        </div>
        <button className="deliveryOrder-totalConfirm" onClick={createOrderHandler}>Замовити</button>
      </div>
    </div>
  )
}

export default DeliveryOrderForm
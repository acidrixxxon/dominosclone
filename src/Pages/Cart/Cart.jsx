import React from 'react'
import Container from '../../components/common/Container/Container'
import './_Cart.scss'
import DeliveryIcon from './../../components/common/Icons/DeliveryIcon'
import DineInIcon from './../../components/common/Icons/DineInIcon'
import DeliveryOrderForm from '../../components/common/Forms/DeliveryOrderForm/DeliveryOrderForm'
import DineinOrderForm from '../../components/common/Forms/DineinOrderForm/DineinOrderForm'
import { GlobalContext } from '../../App'
import CartItemComponent from '../../components/common/CartItemComponent/CartItemComponent'
import ClientDataForm from '../../components/common/Forms/ClientDataForm/ClientDataForm'


const Cart = () => {
  const [ orderType,setOrderType ] = React.useState(0)

  const { globalState: { cart },clearCart } = React.useContext(GlobalContext)

  return (
    <div id="cartPage">
      <Container>
        <div className="cartPage-wrapper">
          <div className="cartPage-info">
            <h4 className="cartPage-title">Оформлення замовлення</h4>

            <div className="cartPage-orderTypes">
              <button 
                onClick={() => setOrderType(0)}
                className={orderType === 0 ? "cartPage-orderTypes__variant active" : "cartPage-orderTypes__variant"}>
                <DeliveryIcon />
                Доставка
              </button>
              <button 
                onClick={() => setOrderType(1)}
                className={orderType === 1 ? "cartPage-orderTypes__variant active" : "cartPage-orderTypes__variant"}>
                <DineInIcon />
                З собою
              </button>
            </div>

            <div className="cartPage-orderForm">
              <ClientDataForm />

              {orderType === 0 ? <DeliveryOrderForm /> : <DineinOrderForm />}
            </div>
          </div>

          <div className="cartPage-items">
            <h4 className="cartPage-title">Ваше замовлення</h4>

            <div className="cartPage-totalItems">
              <ul className="cartPage-totalItemsList">
                {cart.items.map((item) => <CartItemComponent item={item} />)}
              </ul>
              <div className="cartPage-totalItemsFooter">
                {cart.items.length > 0 &&<button className='cartPage-clearCartBtn' onClick={clearCart}>Очистити корзину</button>}

                <h4 className="cartPage-totalCost">
                <span className="number">{cart.totalCost}.00</span>
                <span className="currency">грн</span>
              </h4>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Cart
import React from 'react';
import './App.scss';
import { Route,Routes } from 'react-router-dom'
import Header from './components/Header/Header';
import HomePage from './Pages/Home/HomePage';
import Cart from './Pages/Cart/Cart'
import LocalStorageService from './Services/LocalStorageService';
import PizzaDetails from './Pages/PizzaDetails/PizzaDetails';

export const GlobalContext = React.createContext()

function App() {
  
  React.useEffect(() => {
    LocalStorageService.initLocalStorage()
  },[])

  const [ globalState,setGlobalState ] = React.useState({
    category: 0,
    sortType: 0,
    cart: localStorage.getItem('cart') === null ? {
      items: [],
      totalCost: 0,
      totalItems: 0,
      details: {
        client: {
          name: '',
          phone: '',
          email: ''
        },
        address: {
          street: '',
          house: '',
          room: '',
          floor: '',
          comments: ''
        },
        paymentType: null
      }
    } : JSON.parse(localStorage.getItem('cart')),
    pizzaDetails: {
      ingridients: []
    }
  })
 
  console.log(globalState)

  const addItemToCart = (item) => {
    const alreadyInCart = globalState.cart.items.find(product => product.id === item.id)

    if (alreadyInCart) {
      const itemsIndex = globalState.cart.items.findIndex(product => product.id === item.id)

      let prod = globalState.cart.items[itemsIndex]
      prod.qty += 1

      const itemsArr = globalState.cart.items
      itemsArr[itemsIndex] = prod
      return setGlobalState({...globalState,cart: {...globalState.cart,items: itemsArr,totalCost: globalState.cart.totalCost + item.price,totalItems: globalState.cart.totalItems + 1}})
    }


    setGlobalState({...globalState,cart: {...globalState.cart,items: [...globalState.cart.items,item],totalItems: globalState.cart.totalItems + 1,totalCost: globalState.cart.totalCost + item.price}})
  }

  const changeOrderDetails = (type,field,value) => {
    if (type === 'client') {
      setGlobalState(state => ({
        ...state,
        cart: {
          ...state.cart,
          details: {
            ...state.cart.details,
            client: {
              ...state.cart.details.client,
              [field]: value
            }
          }
        }
      }))
    } else if (type === 'address') {
      setGlobalState(state => ({
        ...state,
        cart: {
          ...state.cart,
          details: {
            ...state.cart.details,
            address: {
              ...state.cart.details.address,
              [field]: value
            }
          }
        }
      }))
    }
  }

  const changePaymentType = (payment) => {
    setGlobalState(state => ({
      ...state,
      cart: {
        ...state.cart,
        details: {
          ...state.cart.details,
          paymentType: payment
        }
      }
    }))
  }

  const changeQty = (type,id) => {
    if (type === 'plus') {
      let item = globalState.cart.items.find(product => product.id === id)

      if (item) {
        item.qty += 1

        const itemIndex = globalState.cart.items.findIndex(product => product.id === item.id)
        const itemsArr = globalState.cart.items

        itemsArr[itemIndex] = item

        setGlobalState({...globalState,cart: {...globalState.cart,items: itemsArr,totalItems: globalState.cart.totalItems + 1,totalCost: globalState.cart.totalCost + item.price}})
        console.log(globalState.cart)
        // LocalStorageService.saveCart(globalState.cart)
      } else {
        return console.log('no item in cart!')
      }

    } else if (type === 'minus') {
      let item = globalState.cart.items.find(product => product.id === id)

      if (item) {
        if (item.qty === 1) {
          removeItemFromCart(item)
        } else {
          item.qty -= 1

          const itemIndex = globalState.cart.items.findIndex(product => product.id === item.id)
          const itemsArr = globalState.cart.items

          itemsArr[itemIndex] = item

          setGlobalState({...globalState,cart: {...globalState.cart,items: itemsArr,totalItems: globalState.cart.totalItems - 1,totalCost: globalState.cart.totalCost - item.price}})
        }
      } else {
        return console.log('no item in cart!')
      }
    }
  }

  const removeItemFromCart = (product) => {
    return setGlobalState({...globalState,cart: {...globalState.cart,items: globalState.cart.items.filter(item => item.id !== product.id),totalItems: globalState.cart.totalItems - product.qty,totalCost: globalState.cart.totalCost - (product.qty * product.price)}})
  }

  const clearCart = () => {
    return setGlobalState({
      ...globalState,
      cart: {
        ...globalState.cart,
        totalCost: 0,
        totalItems: 0,
        items: []
      }
    })
  }

  const setPizzaDetails = (details) => {
    setGlobalState(state => ({
      ...state,
      pizzaDetails: details
    }))
  }


  return (
    <GlobalContext.Provider value={{globalState,setGlobalState,setPizzaDetails,addItemToCart,removeItemFromCart,clearCart,changeQty,changeOrderDetails,changePaymentType}}>
      <div className="app">
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} exact />
          <Route path="/pizza/:id" element={<PizzaDetails />} exact />
        </Routes>
      </div>
    </GlobalContext.Provider>
  );
}

export default App;

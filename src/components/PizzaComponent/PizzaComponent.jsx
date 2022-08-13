import React from 'react'
import './_PizzaComponent.scss'
import { Link } from 'react-router-dom'
import { GlobalContext } from '../../App'
import { ingridientsList } from '../../mockdata'

const PizzaComponent = ({ pizza }) => {
    const [ activeSize,setActiveSize ] = React.useState(0)
    const [ activeType,setActiveType ] = React.useState(0)

    const changePizzaSize = (id) => {
        setActiveType(0)
        setActiveSize(id)
    }

    const resetButtonsStatus = () => {
        setActiveSize(0)
        setActiveType(0)
    }

    const { addItemToCart,globalState: { cart } } = React.useContext(GlobalContext)
   
    const addToCart = (item) => {
        const itemObj = {
            ...item.variants[activeSize].variants[activeType],
            imageUrl: item.imageUrl,
            qty: 1,
            title: item.title,
            ingridients: pizza.ingridients
        }

        addItemToCart(itemObj)
        resetButtonsStatus()
    }

    return (
        <div className='pizza-wrapper'>
            <Link to={`/pizza/${pizza.id}`} className='pizza-image'>
                <img src={pizza.imageUrl} alt="pizza-image1" />
            </Link>

            <div className="pizza-description">

                <Link className="pizza-title" to={`/pizza/${pizza.id}`}>
                    {pizza.title}
                </Link>

                <p className="pizza-toppings">
                    {pizza.ingridients ? pizza.ingridients.map((item,index) => {
                        const prod = ingridientsList.find(prod => prod.id === item.id)
                        return <span>{prod.title}{item.qty > 1 && '(Подвійна порція)'}{pizza.ingridients.length === index + 1 ? null : ', '}</span>
                    }) : 'Гриби, Моцарела, Пепероні, Соус Альфредо'}
                </p> 
            </div>

            <div className="pizza-variants">
                <div className="pizza-variantsList pizza-sizes">
                    {pizza.variants.map((item,index) => {
                        return (
                            <button 
                                key={index}
                                onClick={() => changePizzaSize(index)}
                                className={activeSize === index ? 'pizza-variantsButton active' : 'pizza-variantsButton'}>
                                {item.title}
                            </button>
                        )
                    })}
                </div>

                <div className="pizza-variantsList">
                    {pizza.variants[activeSize].variants.map((item,index) => {
                        return (
                            <button 
                                key={index}
                                disabled={!item.inSell}
                                onClick={() => setActiveType(index)}
                                className={activeType === index ? 'pizza-variantsButton active' : 'pizza-variantsButton'}>
                                    {item.title}
                            </button>
                        )
                    })}
                </div>
            </div>

            <div className="pizza-footer">
                <div className="pizza-price">
                    <span className='pizza-priceNumber'>{pizza.variants[activeSize].variants[activeType].price}</span>
                    <span className='pizza-priceText'>грн</span> 
                </div>
                <button className="pizza-addToCart" onClick={() => addToCart(pizza)}>В кошик</button>
            </div>
        </div>
    )
}

export default PizzaComponent
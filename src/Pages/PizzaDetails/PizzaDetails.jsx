import React from 'react'
import { useParams } from 'react-router-dom'
import Container from '../../components/common/Container/Container'
import { ingridientsList } from '../../mockdata'
import ProductService from '../../Services/ProductService'
import './_PizzaDetails.scss'
import { AiOutlineClose,AiOutlinePlus } from 'react-icons/ai'
import AddIngridientsModal from '../../components/common/AddIngridientsModal/AddIngridientsModal'
import ReactPortal from '../../components/common/ReactPortal/ReactPortal'
import { GlobalContext } from '../../App'



const PizzaDetails = () => {
    const [ loading,setLoading ] = React.useState(false)
    const [ activeSize,setActiveSize ] = React.useState(0)
    const [ activeType,setActiveType ] = React.useState(0)
    const [ modalVisibility,setModalVisibility ] = React.useState(false)
    const [ staticDetails,setStaticDetails ] = React.useState({})

    const { setPizzaDetails,addItemToCart,globalState: { pizzaDetails } } = React.useContext(GlobalContext)

    const { id } = useParams()

    console.log(pizzaDetails)

    React.useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true)

            const data = await ProductService.getPizzaById(id)

            setLoading(false)
            setPizzaDetails(data)
            setStaticDetails(data)
        }

        fetchProduct()
    },[])

    if(loading) {
        return <span>Loading...</span>
    }

    const changeSizeHandler = (size) => {
        setActiveSize(size)
        setActiveType(0)
    }

    const deleteIngridient = (id) => {
        setPizzaDetails({
            ...pizzaDetails,
            ingridients: pizzaDetails.ingridients.filter(item => item.id !== id)
        })
    }

    const resetAllStates = () => {
        setActiveSize(0)
        setActiveType(0)
    }
    const closeModal = () => setModalVisibility(false)   

    const addToCart = (item) => {
        const itemObj = {
            ...item.variants[activeSize].variants[activeType],
            imageUrl: item.imageUrl,
            qty: 1,
            title: item.title,
            ingridients: pizzaDetails.ingridients
        }

        addItemToCart(itemObj)
        resetAllStates()

        setPizzaDetails({
            ...staticDetails,
            ingridients: pizzaDetails.ingridients.map(ingr => {
                return {
                    ...ingr,
                    qty: 1
                }
            })
        })
    }

    const changeQty = (type,ingridient) => {
        const prod = ingridientsList.find(item => item.id === ingridient.id)
        const index = pizzaDetails.ingridients.findIndex(item => item.id === ingridient.id)
        const updatedArr = pizzaDetails.ingridients

        if (type === 'add') {
            if(pizzaDetails.ingridients[index].qty < 2) {
                updatedArr[index].qty +=1

                const updatedVariants = pizzaDetails.variants.map(variant => {
                    return {
                      ...variant,
                      variants: variant.variants.map((crust) => {
                        return {
                          ...crust,
                          price: crust.price + prod.addPrice
                        }
                      })
                    }
                  })

                  setPizzaDetails({
                    ...pizzaDetails,
                    ingridients: updatedArr,
                    variants: updatedVariants
                })
            }

        } else if (type === 'minus') {
            if(ingridient.qty === 1) {
                deleteIngridient(ingridient.id)
            } else {
                updatedArr[index].qty -=1

                const updatedVariants = pizzaDetails.variants.map(variant => {
                    return {
                      ...variant,
                      variants: variant.variants.map((crust) => {
                        return {
                          ...crust,
                          price: crust.price - prod.addPrice
                        }
                      })
                    }
                  })

                setPizzaDetails({
                    ...pizzaDetails,
                    ingridients: updatedArr,
                    variants: updatedVariants
                })
            }
        }
    }

    return (
        <div id='pizzaDetails-page'>
            <Container>
                <div className="pizzaDetails-image">
                    <img src={pizzaDetails.fullImageUrl} alt={pizzaDetails.title} />
                </div>

                <div className="pizzaDetails-info">
                    <h4 className="pizzaDetails-title">{pizzaDetails.title}</h4>

                    <div className="pizzaDetails-ingridients">
                        <span>Інгрідієнти</span>

                        <ul className="pizzaDetails-ingridientsList">
                            {pizzaDetails.ingridients && pizzaDetails.ingridients.map((ingridient) => {
                                const prod = ingridientsList.find(product => product.id === ingridient.id)

                                return (
                                    <li className="pizzaDetails-ingridientItem">
                                        <span className='remove-icon' onClick={() => deleteIngridient(ingridient.id)}>
                                            <AiOutlineClose />
                                        </span>

                                        <div className="pizzaDetails-ingridientImage">
                                            <img src={prod.imageUrl} alt={prod.title} />
                                        </div>

                                        <span className="pizzaDetails-ingridientTitle">{prod.title} {ingridient.qty > 1 && '(Подвійна порція)'}</span>

                                        <div className="pizzaDetails-ingridientQty">
                                            <span className="minus" onClick={() => changeQty('minus',ingridient)}>
                                                -
                                            </span> 

                                            <span className="qty">
                                                {ingridient.qty}
                                            </span>
                                            <span className="plus" onClick={() => changeQty('add',ingridient)}>
                                                +
                                            </span>
                                        </div>
                                    </li>
                                )
                            })}

                                <li className="pizzaDetails-ingridientItem addIngridient" onClick={() => setModalVisibility(true)}>
                                        <div className="pizzaDetails-ingridientImage">
                                            <AiOutlinePlus />
                                        </div>
                                </li>
                        </ul>
                    </div>

                    <div className="pizzaDetails-additionals">
                        <div className="pizzaDetails-left">
                            <h4 className="pizzaDetails-blockTitle">
                                Розміри:
                            </h4>

                            <ul className="pizzaDetails-sizesList">
                                {pizzaDetails.variants && pizzaDetails.variants.map((item,index) => {

                                    return (
                                        <li className="pizzaDetails-sizesItem" onClick={() => changeSizeHandler(index)}>
                                            <div className="pizzaDetails-sizesCheckbox">
                                                <input type="checkbox" checked={activeSize === index}/>
                                                {item.title}
                                            </div>
                                            <div className="pizzaDetails-sizesPrice">
                                                від {item.variants[0].price}.00 грн
                                            </div>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>

                        <div className="pizzaDetails-right">
                                <h4 className="pizzaDetails-blockTitle">
                                    Тісто:
                                </h4>

                                <ul className="pizzaDetails-crustList">
                                    {pizzaDetails.variants && pizzaDetails.variants[activeSize].variants.map((item,index) => {
                                        return (
                                            <li className="pizzaDetails-crustItem" onClick={() => setActiveType(index)}>
                                                <div className="pizzaDetails-sizesCheckbox">
                                                    <input type="checkbox" checked={activeType === index}/>
                                                    {item.title}
                                                </div>

                                                <div className="pizzaDetails-sizesPrice">
                                                    від {item.price}.00 грн
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                        </div>
                    </div>

                    <div className="pizzaDetails-totalPrice">

                        <div className="row">
                            <span>{pizzaDetails.variants && pizzaDetails.variants[activeSize].variants[activeType].price}.00 грн</span>

                            <button className="pizzaDetails-addToCart" onClick={() => addToCart(pizzaDetails)}>В кошик</button>
                        </div>
                    </div>
                </div>
            </Container>

            <ReactPortal wrapperId='root'>
                <AddIngridientsModal visible={modalVisibility} onClose={closeModal} />
            </ReactPortal>
        </div>
    )
}

export default PizzaDetails
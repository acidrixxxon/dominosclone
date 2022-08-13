import React from 'react'
import './_IngridientCategoryItem.scss'
import { AiOutlinePlus } from 'react-icons/ai'
import { GlobalContext } from '../../../../../App'
import { AnimatePresence, motion } from 'framer-motion'

const IngridientCategoryItem = ({ item }) => {
  const { setPizzaDetails,globalState: { pizzaDetails } } = React.useContext(GlobalContext)

  const addToPizza = () => {
    const arr = pizzaDetails.ingridients
    const alreadyInPizza = pizzaDetails.ingridients.find(ingr => ingr.id == item.id)
    
    //if already added item
    if (alreadyInPizza) {
      const index = pizzaDetails.ingridients.findIndex(it => it.id === item.id)
    
      if(arr[index].qty < 3) {
        arr[index].qty += 1
        console.log(arr)
      }
    } else {
      arr.push({id: item.id,qty: 1})
    }

    

    const updatedVariants = pizzaDetails.variants.map(variant => {
      return {
        ...variant,
        variants: variant.variants.map((crust) => {
          return {
            ...crust,
            price: crust.price + item.addPrice
          }
        })
      }
    })

    setPizzaDetails({
      ...pizzaDetails,
      ingridients: arr,
      variants: updatedVariants
    })
  }

    return (
      <AnimatePresence>
        <motion.li 
          transition={{ duration: 0.5 }}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          className='ingridientCategoryItem' 
          onClick={addToPizza}>
            <img src={item.imageUrl} alt={item.title} className="ingridientCategoryItem-image" />

            <h6 className="ingridientCategoryItem-title">{item.title}</h6>

            <span className="ingridientCategoryItem-add">
              <AiOutlinePlus />
            </span>
        </motion.li>
      </AnimatePresence>
    )
}

export default IngridientCategoryItem
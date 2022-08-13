import React from 'react'
import { HiArrowSmRight } from 'react-icons/hi'
import './_IngridientsCategories.scss'
import { AnimatePresence, motion } from 'framer-motion'
import IngridientCategoryItem from './IngridientCategoryItem/IngridientCategoryItem'
import { GlobalContext } from '../../../../App'

const IngridientsCategories = ({cat,ingridients,visible}) => {
    const [ visibleList,setVisibleList ] = React.useState(false)

    const toggleList = () => setVisibleList(state => !state)

    const { globalState: { pizzaDetails }} = React.useContext(GlobalContext) 

    //hide list after close add modal
    React.useEffect(() => {
        if (visible === false) setVisibleList(false)
    },[visible])


    return (
        <div className='ingridientCategory'>
            <div className="ingridientCategory-header" onClick={toggleList}>
                <span className='ingridientCategory-title'>{cat.title}</span>

                <span className={visibleList ? "ingridientCategory-arrow half-rotated" : "ingridientCategory-arrow"}>
                    <HiArrowSmRight />
                </span>
            </div>  

            <AnimatePresence>
                {visibleList && (
                        <motion.ul 
                            initial={{height: 0,opacity: 0}}
                            animate={{height: 'auto',opacity: 1}}
                            exit={{height: 0,opacity: 0}}
                            transition={{ duration: .2 }}
                            className="ingridientCategory-list">
                                {ingridients.map((ingridient,index) => <IngridientCategoryItem item={ingridient} />)}
                        </motion.ul>)
                }
            </AnimatePresence>
        </div>
    )
}

export default IngridientsCategories
import React from 'react'
import './_AddIngridientsModal.scss'
import { AiOutlineClose } from 'react-icons/ai'
import { ingridientsCategories, ingridientsList } from '../../../mockdata'
import IngridientsCategories from './IngridientsCategories/IngridientsCategories'

const AddIngridientsModal = ({ visible,onClose }) => {
  
  return (
    <div className={visible? 'addModal visible' : 'addModal'} onClick={onClose}>

      <div className="addModal-content" onClick={(e) => e.stopPropagation()}>
        <span className="addModal-closeIcon" onClick={onClose}>
          <AiOutlineClose />
        </span>

        <h4 className="addModal-title">Оберіть інгредієнти</h4>

        <div className="addModal-ingridients">
          {ingridientsCategories.map((cat,index) => {
            const items = ingridientsList.filter(item => item.category === cat.id)

            return <IngridientsCategories cat={cat} ingridients={items} visible={visible} />
          })}
        </div>
      </div>
    </div>
  )
}

export default AddIngridientsModal
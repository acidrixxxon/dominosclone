import React from 'react'
import { GlobalContext } from '../../App'
import './_MenuNavigation.scss'

const MenuNavigation = () => {
  const categories = ['Піца','Сайди','Напої','Десерти']

  const { globalState ,setGlobalState } = React.useContext(GlobalContext)

  return (
    <nav id='navigation'>
        <ul className='navigation-list'>
            {categories.map((item,index) => {
              return (
                <li
                  onClick={() => setGlobalState({...globalState,sortType: 0,category: index})} 
                  className={globalState.category === index ? 'navigation-item active' : 'navigation-item'} 
                  key={index}>
                    {item}
                </li>
              )
            })}
        </ul>
    </nav>  
  )
}

export default MenuNavigation
import React from 'react'
import { GlobalContext } from '../../../App'
import ItemsList from '../../common/ItemsList/ItemsList'
import SideComponents from '../../SideComponent/SideComponents'
import './_SideList.scss'

const SidesList = () => {
  const [ items,setItems ] = React.useState([])
  const [ loading,setLoading ] = React.useState(true)

  React.useEffect(() => {
      fetch('https://62c897d28c90491c2cb80379.mockapi.io/sides')
          .then(res => res.json())
          .then(res => setItems(res))
  },[])

  const { globalState: { sortType }} = React.useContext(GlobalContext)

  return (
    <>
      {items.map(side => {
        return (
          <>
            <h4 className="side-categoryTitle">{side.title}</h4>
            <ItemsList>
              {side.items.map(item => {
                return (
                  <SideComponents side={item} key={item.id}/>
                )
              })}
            </ItemsList>
          </>
          )
        })}
    </>
  )
}

export default SidesList
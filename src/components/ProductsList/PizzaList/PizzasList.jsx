import React from 'react'
import { GlobalContext } from '../../../App'
import ItemsList from '../../common/ItemsList/ItemsList'
import Pagination from '../../common/Pagination/Pagination'
import Skeleton from '../../common/Skeleton/Skeleton'
import PizzaComponent from '../../PizzaComponent/PizzaComponent'
import './_PizzaList.scss'

const PizzasList = () => {
  const [ pizzas,setPizzas ] = React.useState([])
  const [ loading,setLoading ] = React.useState(true)
  const [ limit,setLimit ] = React.useState(4)
  const [ pageNumber,setPageNumber ] = React.useState(1)
  const [ pages,setPages ] = React.useState(2)

  console.log(pizzas)
  const pizzasCategories = [{id: 0,title: 'Краща ціна'},{id: 1,title: 'Герої'},{id: 2,title: 'Дивина'},{id: 3,title: 'Файнест'},{id: 4,title: 'Гурме'}]

  const { globalState: { sortType,category } } = React.useContext(GlobalContext)
  
  React.useEffect(() => {
    const getData = async () => {
      if (sortType === 0) {
        setPizzas([])
        setLoading(true)
        setPageNumber(1)

        fetch('https://62c897d28c90491c2cb80379.mockapi.io/pizza?sortBy=rating&order=desc')
        .then(res => res.json())
        .then(res => {
          setPizzas(res)
          setLoading(false)
        })
      } else if (sortType === 1) {
        setPizzas([])
        setLoading(true)

        fetch(`https://62c897d28c90491c2cb80379.mockapi.io/pizza?sortBy=defaultPrice&order=desc&page=${pageNumber}&limit=${limit}`)
        .then(res => res.json())
        .then(res => {
          setPizzas(res)
          setLoading(false)
        })
      } else if (sortType === 2) {
        setPizzas([])
        setLoading(true)

        fetch(`https://62c897d28c90491c2cb80379.mockapi.io/pizza?sortBy=defaultPrice&order=asc&page=${pageNumber}&limit=${limit}`)
        .then(res => res.json())
        .then(res => {
          setPizzas(res)
          setLoading(false)
        })
      }
    }

    getData()
  },[sortType,pageNumber])
  
 
  if (loading) {
    return [...new Array(8)].map((item) => <Skeleton />)
  }

  return (
    <>
      {sortType === 0 && pizzasCategories.map(cat => {
        const items = pizzas.filter(pizza => pizza.category === cat.id)

        if(items.length > 0)
        return (
          <>
            <h4 className='itemsList-title'>Піца: {cat.title}</h4>
            <ItemsList>
              {items.map(item => <PizzaComponent key={item.id} pizza={item} />)}
            </ItemsList>
          </>
        )
      })}


      {sortType !== 0 && (
        <>
          <ItemsList>
            {pizzas.map(pizza => <PizzaComponent key={pizza.id} pizza={pizza} />
            )}
          </ItemsList>
          <Pagination pages={pages} limit={limit} page={pageNumber} changePage={(page) => setPageNumber(page)} />
        </>
      )}
    </>
  )
}

export default PizzasList
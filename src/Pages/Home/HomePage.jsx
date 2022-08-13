import React from 'react'

import Container from '../../components/common/Container/Container'
import MenuNavigation from '../../components/MenuNavigation/MenuNavigation'
import Sort from '../../components/Sort/Sort'


import SidesList from './../../components/ProductsList/SidesList/SidesList'
import PizzasList from './../../components/ProductsList/PizzaList/PizzasList'

import './_HomePage.scss'
import { GlobalContext } from '../../App'


const HomePage = () => {
    const { globalState: {category } } = React.useContext(GlobalContext)

    return (
        <div id="home">
            <Container>
                <div className="home_top-content">
                    <MenuNavigation  />
                    <Sort  />
                </div>

                <div className="home__main-content">
                    { category === 0 && <PizzasList  />}
                    { category === 1 && <SidesList  />}
                </div>
            </Container>
        </div>
    )
}

export default HomePage
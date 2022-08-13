import React from 'react'
import CartStatus from '../CartStatus/CartStatus'
import Container from '../common/Container/Container'
import Logotype from '../common/Logotype/Logotype'
import MobileNavigation from '../common/MobileNavigation/MobileNavigation'
import Search from '../Search/Search'
import './_Header.scss'

const Header = () => {
  return (
    <header id='header'>
        <Container>
            <Logotype />
            <Search />
            <CartStatus />
            <MobileNavigation />
        </Container>
    </header>
  )
}

export default Header
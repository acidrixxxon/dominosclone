import React from 'react'
import CartStatus from '../CartStatus/CartStatus'
import Container from '../common/Container/Container'
import Logotype from '../common/Logotype/Logotype'
import MobileNavigation from '../common/MobileNavigation/MobileNavigation'
import Search from '../Search/Search'
import './_Header.scss'

const Header = () => {
  const headerEl = React.useRef(null)

  const isSticky = () => {
    const scrollTop = window.scrollY;

    scrollTop >= 70 ? headerEl.current.classList.add('is-sticky') : headerEl.classList.remove('is-sticky');
  }

  React.useEffect(() => {
    window.addEventListener('scroll',isSticky)

    return () => window.removeEventListener('scroll',isSticky)
  },[])

  return (
    <header id='header' ref={headerEl}>
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
import React from 'react'
import { FiMenu } from 'react-icons/fi'
import './_MobileNavigation.scss'
import MobileLogotype from './../MobileLogotype'
import PizzaIcon from './../Icons/PizzaIcon'
import SideIcon from './../Icons/SideIcon'
import DrinkIcon from './../Icons/DrinkIcon'
import DesertIcon from './../Icons/DesertIcon'
import { AiOutlineClose } from 'react-icons/ai'


const MobileNavigation = () => {
    const [ showMenu,setShowMenu ] = React.useState(false)
    const menuEl = React.useRef(null)

    const closeMenu = () => setShowMenu(false)
    const openMenu = () => setShowMenu(true)

    React.useEffect(() => {
        const outSideMenuClick = (e) => {
            const path = e.path || (e.composedPath && e.composedPath());
            if (!path.includes(menuEl.current)) {
                setShowMenu(false)
            }
        }

        document.addEventListener('click',outSideMenuClick)

        return () => {
            document.removeEventListener('click',outSideMenuClick)
        }
    },[])

    return (
        <div className='mobileNav' ref={menuEl}>
            <FiMenu className='mobileNav-hamburger' onClick={openMenu}/>

            <div className={showMenu ? 'mobileNav-menu visible' : 'mobileNav-menu'}>
                <div className="mobileNav-header">
                    <MobileLogotype />

                    <AiOutlineClose className='mobileNav-closeIcon' onClick={closeMenu} />
                </div>

                <ul className="mobileNav-list">
                    <li className="mobileNav-item">
                        <PizzaIcon />
                        Піци
                    </li>
                    <li className="mobileNav-item">
                        <DrinkIcon />
                        Сайди
                    </li>
                    <li className="mobileNav-item">
                        <SideIcon />
                        Напої
                    </li>
                    <li className="mobileNav-item">
                        <DesertIcon />
                        Десерти
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default MobileNavigation
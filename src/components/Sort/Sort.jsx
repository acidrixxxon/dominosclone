import React from 'react'
import { useRef } from 'react'
import { GlobalContext } from '../../App'
import './_Sort.scss'

const Sort = () => {
    const sortVariants = ['популярністю','ціною (найдорожчі)','ціною (дешевші)']

    const [ visibleSortMenu,setVisibleSortMenu ] = React.useState(false)
    const sortEl = useRef(null)

    const { globalState,setGlobalState } = React.useContext(GlobalContext)

    const toggleSortMenu = () => {
        setVisibleSortMenu(state => !state)
    }

    const onSortChange = (id) => {
        setGlobalState({...globalState,sortType: id})
        setVisibleSortMenu(false)
    }
    
    React.useEffect(() => {
        const handleClickOutside = (e) => {
            const path = e.path || (e.composedPath && e.composedPath());
            if (!path.includes(sortEl.current)) {
                setVisibleSortMenu(false)
            }
        }

        document.addEventListener('click',handleClickOutside)

        return () => document.removeEventListener('click',handleClickOutside)
    },[])


    return (
        <>
            {globalState.category !== 1 && (
                <div ref={sortEl} className='sort'>
                    <span className="sort-label">
                        <svg width="10" className={visibleSortMenu ? 'rotated' : ''} height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z" fill="#2C2C2C"></path></svg>
                        Сортування за:
                    </span>

                    <span className="sort-title" onClick={toggleSortMenu}>
                        {sortVariants[globalState.sortType]}
                    </span>

                    { visibleSortMenu && (
                        <ul className="sort-list">
                            {sortVariants.map((item,index) => {
                                return (
                                    <li 
                                        onClick={() => onSortChange(index)}
                                        className={globalState.sortType === index ? 'sort-item active' : 'sort-item'}>{item}</li>
                                )
                            })}
                        </ul>
                    )}
                </div>
            )}
        </>
    )
}

export default Sort
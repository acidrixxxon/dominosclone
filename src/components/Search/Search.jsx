import React from 'react'
import './_Search.scss'
import { AiOutlineSearch,AiOutlineClose } from 'react-icons/ai'
import { GlobalContext } from '../../App'
import debounce from 'lodash.debounce'
import Spinner from '../common/Spinner/Spinner'

const Search = () => {
    const [ searchValue,setSearchValue ] = React.useState('')
    const [ searchResults,setSearchResults ] = React.useState(null)
    const [ loading,setLoading ] = React.useState(false)

    const searchEl = React.useRef(null)
    
    const { globalState,setGlobalState } = React.useContext(GlobalContext)

    const clearField = () => setSearchValue('')

    const onInputChange = (value) => {
        setSearchValue(value)
        debounceFunc(value)
    }

    const debounceFunc = React.useCallback(debounce(async (value) => {
        setLoading(true)
        setSearchResults(null)
        const res = await fetch(`https://62c897d28c90491c2cb80379.mockapi.io/global?title=${value}`)
        const data = await res.json()
        
        setLoading(false)
        setSearchResults(data)
        return data
    },250),[])

    React.useEffect(() => {
        const handleOutsideClick = (e) => {
            const path = e.path || (e.composedPath && e.composedPath());
            if (!path.includes(searchEl)) {
                setSearchValue('')
                setSearchResults(null)
                setLoading(false)
            }
        }

        document.addEventListener('click',handleOutsideClick)

        return () => document.removeEventListener('click',handleOutsideClick) 
    },[])

    return (
        <div className='search' ref={searchEl}>
            <AiOutlineSearch className='search-searchIcon'/>
            <input type="text" value={searchValue} onChange={(e) => onInputChange(e.target.value)} className='search-field' placeholder='Пошук піцци...'/>
            { searchValue !== '' && <AiOutlineClose className='search-clearIcon' onClick={clearField} /> }

            {searchValue !== '' && 
                <div className="search-results">
                    {loading && <Spinner />}
                    {searchResults !== null && (
                        searchResults.length > 0 ? (
                            <ul className='search-resultsList'>
                                {searchResults.length > 4 && (
                                    <>
                                        {searchResults.slice(0,4).map((item) => {
                                            return <>
                                                    <li className='search-resultsItem'>
                                                        <div className="search-resultsImage">
                                                            <img src={item.imageUrl} alt="" />
                                                        </div>

                                                        <div className="search-resultsContent">
                                                            <h4 className="search-resultsTitle">
                                                                {item.title}
                                                            </h4>
                                                        </div>
                                                    </li>
                                            </> 
                                    })}
                                    <span className='search-watchMore'>Дивитися результати</span>
                                    </>

                                )}
                                {searchResults.length < 4 && (searchResults.map((item) => {
                                    return <li className='search-resultsItem'>
                                                <div className="search-resultsImage">
                                                    <img src={item.imageUrl} alt="" />
                                                </div>

                                                <div className="search-resultsContent">
                                                    <h4 className="search-resultsTitle">
                                                        {item.title}
                                                    </h4>
                                                </div>
                                            </li>
                                }))}
                            </ul>)
                            :   'Ничего не найдено'
                    )}
                </div>
            }
        </div>
    )
}

export default Search
import React from 'react'
import { Link } from 'react-router-dom'
import './_SideComponent.scss'

const SideComponents = ({ side }) => {
    const [ activeSize,setActiveSize ] = React.useState(0)
    
    return (
        <div className="side-wrapper">
            <Link to={`/product/${side.id}`} className='side-image'>
                <img src={side.imageUrl} alt='sideImage' />
            </Link>
            
            <h4 className='side-title'>{side.title}</h4>

            <div className="side-variants">
                {side.variants.map((item,index) => {
                    return (
                        <button
                            onClick={() => setActiveSize(index)} 
                            className={activeSize === index ? 'side-variantsItem active' : 'side-variantsItem'}>{item.size}</button>
                    )
                })}
            </div>

            <div className="side-footer">
                <div className="side-price">
                    <span className="side-priceNubmer">
                        {side.variants[activeSize].price}
                    </span>

                    <span className="side-priceText">
                        грн
                    </span>
                </div>

                <button className="side-addToCart addToCart-button">
                    В кошик
                </button>
            </div>
        </div>
    )
}

export default SideComponents
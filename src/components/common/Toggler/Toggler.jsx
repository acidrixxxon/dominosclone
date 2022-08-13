import React from 'react'
import './Toggler.scss'

const Toggler = ({ label,onToggle }) => {
    const [ toggled,setToggled ] = React.useState(false)

    const toggle = () => {
        onToggle()
        setToggled(state => !state)
    }

    return (
        <div className='toggler'>
            <div className={toggled ? "toggler-block active" : "toggler-block"} onClick={toggle}>
                <div className={toggled ? "toggler-dot toggled" : "toggler-dot"}>

                </div>
            </div>

            <span className={toggled ? "toggler-label active" : "toggler-label"}>
                {label}
            </span>
        </div>
    )
}

export default Toggler
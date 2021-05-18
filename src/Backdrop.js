import React from 'react'
import './Backdrop.css'

export const Backdrop = (props) => {
    return (
        props.show ? <div onClick={() => props.clicked()} className="Backdrop"></div> : null
    )
}

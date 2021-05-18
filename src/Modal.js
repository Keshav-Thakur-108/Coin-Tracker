import React from 'react'
import {Backdrop} from './Backdrop'
import './Modal.css'

export const Modal = (props) => {
    return (
        <>
        <Backdrop show={props.show} clicked={props.clicked}/>
        <div className="Modal">
            {props.children}
        </div>
        </>
    
    )
}

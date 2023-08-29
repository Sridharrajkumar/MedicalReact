import React, { Fragment } from 'react'
import ReactDOM from 'react-dom'
import classes from './Modal.module.css'

const Overlay = (props) => {
  return (
    <div className={classes.backdrop} onClick={props.Close}>

    </div>
  )
}

const ModelOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  )
}

const ModalElement = document.getElementById('modal');

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDOM.createPortal(<Overlay />, ModalElement)}
      {ReactDOM.createPortal(<ModelOverlay>{ props.children}</ModelOverlay>, ModalElement)}
    </Fragment>
  )
}

export default Modal
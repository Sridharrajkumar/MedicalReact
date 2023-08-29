import React, { useContext } from 'react'
import classes from './NavButton.module.css'
import CartContext from '../../store/Cart-Context'

const NavButton = (props) => {

  const cartctx = useContext(CartContext)
  
  const NumberOfCarttem = cartctx.products.reduce((curNumber, product) => {
    return curNumber + product.amount;
  },0)

  return (
    <div>
      <button className={classes.navbtn} onClick={props.showCart}>
        <span>Your Cart</span>
        <span className={classes.amount}>{NumberOfCarttem}</span>
      </button>
    </div>
  )
}

export default NavButton
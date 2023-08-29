import React from 'react'
import classes from './CartList.module.css';

const CartList = (props) => {
  return (
      <li className={classes.list}>
          <div className={classes.details}>
              <h3 className={classes.name}>{props.name}</h3>
              <span className={classes.price}>Price:{props.price}</span>
              <span className={classes.amount}> x{props.amount}</span>
          </div>
          <div className={classes.btn}>
              <button onClick={props.OnAdd}>+</button>
              <button onClick={props.OnRemove}>-</button>
          </div>
    </li>
  )
}

export default CartList
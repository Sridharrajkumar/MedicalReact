import React, { useContext, useRef } from 'react'
import classes from './ProductList.module.css'
import CartContext from '../../store/Cart-Context';
const ProductList = ({ name, description, price }) => {

    const cartctx = useContext(CartContext);

    const Amountref = useRef();
     
    const submitHandler = (e) => {
        e.preventDefault();

        const enteredAmount = Amountref.current.value;
        const enteredAmountInInt = +enteredAmount;

        cartctx.addProduct({
            name: name,
            price: Number(price),
            amount: enteredAmountInInt
        });
        
    }




  return (
      <li className={classes.list}>
          <div className={classes.product}> 
              <h3 className={classes.name}>{name}</h3>
              <div className={classes.description}>{description}</div>
              <div className={classes.price}>&#8377;{price}</div>
          </div>
          <form className={classes.form} onSubmit={submitHandler} >
              <div>
                    <label>Amount:</label>
                    <input type="number" ref={Amountref} min={1} max={10} defaultValue={1}></input>
              </div>
              <button>Add Cart</button>
          </form>
          
     </li>
  )
}

export default ProductList
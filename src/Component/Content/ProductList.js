import React, { useContext, useRef } from 'react'
import classes from './ProductList.module.css'
import CartContext from '../../store/Cart-Context';
const ProductList = ({ name, description, price }) => {

    const cartctx = useContext(CartContext);

    const Amountref = useRef();
    const api = 'https://react-medicals-default-rtdb.firebaseio.com';
     
    const submitHandler = (e) => {
        e.preventDefault();

        const enteredAmount = Amountref.current.value;
        const enteredAmountInInt = +enteredAmount;
        let product = {
            name: name,
            price: Number(price),
            amount:enteredAmountInInt
        }

        cartctx.addProduct(product);
        FechFun(product);
    }

    const FechFun = async(product) => {
        const response = await fetch(`${api}/cart.json`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: product.name,
                price: product.price,
                amount:product.amount
            })
        })
        if (!response.ok) throw new Error('Fetch Function Failed');
        const data = await response.json();
    }

  return (
      <li className={classes.list} key={name}>
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
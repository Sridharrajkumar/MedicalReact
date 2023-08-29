import React, { useContext } from 'react'
import classes from './Cart.module.css';
import Modal from './Modal';
import CartContext from '../../store/Cart-Context';
import CartList from './CartList';


const Cart = (props) => {
 
  const Cartctx = useContext(CartContext);

  const cartAddHandler = (product) => {
    Cartctx.addProduct({...product,amount:1})
  }

  const cartRemoveHandler = (product) => {
    Cartctx.removeProduct(product);
  }





    const CartItems = (
        <ul className={classes['cart-items']}>
          {Cartctx.products.map((product) => (
            <CartList key={Math.random()}
              name={product.name}
              amount={product.amount}
              price={product.price} 
              OnAdd={cartAddHandler.bind(null, product)}
              OnRemove={cartRemoveHandler.bind(null,product)}
            />
          ))}
        </ul>
      );
   
  return (
      <Modal> 
           {CartItems}
           <div className={classes.total}>
              <span>Total Amount</span>
              <span>{Cartctx.totalAmount}</span>
          </div>
          <div className={classes.actions}>
              <button onClick={props.close}>Close</button>
              <button>Print Bill</button>
          </div>
     </Modal>
  )
}

export default Cart
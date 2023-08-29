import React, { useReducer } from 'react'
import CartContext from './Cart-Context'

const initialState = {
  products: [],
  totalAmount:0,
}

const Reducer = (state, action) => {
  
  if (action.type === 'ADD')
  {

    const updateTotalPrice = state.totalAmount + action.product.price * action.product.amount;

    const ExistingCartItem = state.products.findIndex(
      (product) => product.name === action.product.name
    );

    const existingItem = state.products[ExistingCartItem];

    let updatedproducts;

    if (existingItem)
    {
      const UpdateProduct = {
        ...existingItem,
        amount: existingItem.amount + action.product.amount,
      };
      updatedproducts = [...state.products];
      updatedproducts[ExistingCartItem] = UpdateProduct; 
    }
    else
    {
      updatedproducts = state.products.concat(action.product);
     }
    
    
    return {
          products: updatedproducts,
          totalAmount:updateTotalPrice
    }
    
  }
  if (action.type === 'REMOVE')
  {
    const ExistingCartItem = state.products.findIndex(
      (product) => product.name === action.product.name
    );

    const existingproduct=state.products[ExistingCartItem]

    

    const updateTotalAmount = state.totalAmount-existingproduct.price ;
    console.log(updateTotalAmount);
    
    let updateProducts=[];
    if (existingproduct.amount === 1)
    {
      updateProducts = state.products.filter((product) => product.name !== action.product.name);
    }
    else
    {
      const updateproduct = {
        ...existingproduct,
        amount: existingproduct.amount - 1
      };
      updateProducts = [...state.products]
      updateProducts[ExistingCartItem]=updateproduct
    }
    return {
      products: updateProducts,
      totalAmount:updateTotalAmount
    }

  }

  return initialState
  
}

const CartProvider = (props) => {

  const [state, dispatch] = useReducer(Reducer, initialState)
  
  const AddProductToCart = (product) => {
    dispatch({type:'ADD' , product:product})
  }

  const RemoveProductToCart = (product) => {
    dispatch({type:'REMOVE' , product:product})
  }

  const cartContext = {
    products: state.products,
    totalAmount: state.totalAmount,
    addProduct: AddProductToCart,
    removeProduct: RemoveProductToCart
  }

  return (
    <CartContext.Provider value={cartContext}>
       {props.children}
     </CartContext.Provider>
  )
}

export default CartProvider
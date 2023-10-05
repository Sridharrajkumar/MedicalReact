import React, { useEffect,useReducer } from 'react'
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
  const api='https://react-medicals-default-rtdb.firebaseio.com/cart.json'
  
  const AddProductToCart = (product) => {
    dispatch({ type: 'ADD', product: product })
  }

  const RemoveProductToCart = (product) => {
    dispatch({type:'REMOVE' , product:product})
  }

  const fetchFun = async () => {
    const response = await fetch(`${api}`);
    if (!response.ok) throw new Error('fetching product failed');
    const data = await response.json();
    console.log(data);
    let product = [];
    for (let key in data) {
        product.push({
            name: data[key].name,
          price: data[key].price,
           amount:data[key].amount
            
        })
    }
    product.forEach((item) => {
        dispatch({ type: 'ADD', product: item })
    })
  }
  
  useEffect(() => {
    fetchFun();
  }, []);


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


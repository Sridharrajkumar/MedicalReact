

import React, { useReducer } from 'react'
import ProductContext from './Product-Context'

const initialProducts = {
    products: [],
};

const Reducer = (state, action) => {
    
    if (action.type === 'ADD_TO_CARD')
    {
        
        return {
             products:[...state.products,action.product]
         }
    }
    
}

 

const ProductProvider = (props) => {
    const [state, dispatch] = useReducer(Reducer, initialProducts);

    const AddtoCard = (product) =>
    {
        dispatch({ type: 'ADD_TO_CARD', product: product });
    }

    
    const productContext = {
        products: state.products,
        addtocard: AddtoCard,
        
    }
    console.log(productContext);
    
  return (
      <ProductContext.Provider value={productContext}>
          {props.children}
      </ProductContext.Provider>
  )
}

export default ProductProvider
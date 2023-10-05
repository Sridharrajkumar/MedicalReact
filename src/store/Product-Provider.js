

import React, { useEffect, useReducer, useState } from 'react'
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
    const api = 'https://react-medicals-default-rtdb.firebaseio.com/product.json';
    const fetchFun = async () => {
        const response = await fetch(`${api}`);
        if (!response.ok) throw new Error('fetching product failed');
        const data = await response.json();
        let product = [];
        for (let key in data) {
            product.push({
                name: data[key].name,
                description: data[key].description,
                price: data[key].price
            })
        }
        product.forEach((item) => {
            dispatch({ type: 'ADD_TO_CARD', product: item })
        })
    }

    useEffect(() => {
        console.log('useEffect is running');
        fetchFun();
    }, []);

    const AddtoCard = (product) =>
    {
        dispatch({ type: 'ADD_TO_CARD', product: product });
    }

    
    const productContext = {
        products: state.products,
        addtocard: AddtoCard,
        
    }
    
  return (
      <ProductContext.Provider value={productContext}>
          {props.children}
      </ProductContext.Provider>
  )
}

export default ProductProvider


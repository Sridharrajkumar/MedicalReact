import React, { useContext } from 'react'
import ProductList from './ProductList'
import classes from './ProductDisplay.module.css'
import ProductContext from '../../store/Product-Context'


const ProductDisplay = ({ products }) => {
  
  const productctx = useContext(ProductContext);



  return (
    <div className={classes.card}>
      <h3>Products</h3>
      <ul>
        {productctx.products.map((product) => (
          <ProductList
            name={product.name}
            description={product.description}
            price={product.price}   
           />
      ))}
      </ul>
    </div>
  )
}

export default ProductDisplay
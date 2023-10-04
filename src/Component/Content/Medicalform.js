

import React, { useContext, useRef } from 'react'
import classes from './MedicalForm.module.css'
import ProductContext from '../../store/Product-Context';

const Medicalform = () => {
    const nameRef = useRef();
    const DescriptionRef = useRef();
    const PriceRef = useRef();
    const productctx = useContext(ProductContext);
    const api='https://react-medicals-default-rtdb.firebaseio.com'

    const ProductHandler = (event) => {
        event.preventDefault();
        const enteredname = nameRef.current.value;
        const enteredDescription = DescriptionRef.current.value;
        const enteredPrice = PriceRef.current.value;
        const enterprice = +enteredPrice;
        

        const newproduct ={
            name: enteredname,
            description: enteredDescription,
            price: enterprice
        }
        productctx.addtocard(newproduct);
        fetchfun(newproduct);
        nameRef.current.value = '';
        DescriptionRef.current.value = '';
        PriceRef.current.value = '';

    }

    const fetchfun = async (product) => {
        
        const response = await fetch(`${api}/product.json`, {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                name: product.name,
                description: product.description,
                price:product.price
                })
        });
        if (!response.ok) throw new Error('fech function failed');
        const data = await response.json();
        
    }

   
  return (
      <form onSubmit={ProductHandler} className={classes.form}>
          <h3>Add Product</h3>
          <input type="text" placeholder='product Name'  ref={nameRef} required></input>
          <input type="text" placeholder='product Description' ref={DescriptionRef} required></input>
          <input type="number" placeholder='product Price' ref={PriceRef} required></input>
          <button>Add Product</button>
     </form>
  )
}

export default Medicalform
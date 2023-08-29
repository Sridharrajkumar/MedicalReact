

import React, { useContext, useRef } from 'react'
import classes from './MedicalForm.module.css'
import ProductContext from '../../store/Product-Context';

const Medicalform = () => {
    const nameRef = useRef();
    const DescriptionRef = useRef();
    const PriceRef = useRef();
    const productctx = useContext(ProductContext);

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


        nameRef.current.value = '';
        DescriptionRef.current.value = '';
        PriceRef.current.value = '';
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
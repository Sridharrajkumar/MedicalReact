
import { useState } from 'react';
import './App.css';
import Medicalform from './Component/Content/Medicalform';
import Navbar from './Component/Navbar/Navbar';
import ProductDisplay from './Component/Content/ProductDisplay';

import ProductProvider from './store/Product-Provider';
import CartProvider from './store/Cart-Provider';
import Cart from './Component/Cart/Cart';


function App() {
  
  const [showCart, setShowCart] = useState(false);


  const handleShowCart = ()=> {
    setShowCart(true);
  }

  const hideCart = () => {
    setShowCart(false);
  }


  return (
    
      <CartProvider >
        {showCart && <Cart close={hideCart} />}
        <Navbar showCart={handleShowCart} />
          <ProductProvider>
            <Medicalform  />
            <ProductDisplay />
          </ProductProvider>
      </CartProvider>
    
  );
}

export default App;



import React from 'react'

const ProductContext = React.createContext({
    products: [],
    addtocard: (product) => {},
    
})



export default ProductContext


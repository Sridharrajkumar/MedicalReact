import React from 'react'
import NavButton from './NavButton'
import classes from './Navbar.module.css'

const Navbar = (props) => {
  return (
      <div className={classes.navbar}>
         <h1>React MEDICALS</h1>
      <NavButton showCart={props.showCart} />
     </div>
  )
}

export default Navbar
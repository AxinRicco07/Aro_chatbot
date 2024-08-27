import React, { useState } from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'

 const Navbar = () => {
  const [menu,setMenu] = useState("home")
  return (
    <div className='navbar'><header>
    <div class="container">
      <p  class="logo"> <b>ARO</b></p>
      <ul class="links">
        <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration:'none'}} to='/'>Home</Link>{menu==="home"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("aboutus")}} id="aboutUs"><Link to='/aboutus' style={{textDecoration:'none'}}>About Us</Link>{menu==="aboutus"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("work")}}><Link style={{textDecoration:'none'}} to='/HealthAdvice'>Work</Link>{menu==="work"?<hr/>:<></>}</li>
        <li onClick={()=>{setMenu("info")}}><Link style={{textDecoration:'none'}} to ='/Info'>Info</Link>{menu==="info"?<hr/>:<></>}</li>
        <li ><Link to='welcome' style={{textDecoration:'none'}}>Get Started</Link ></li>
      </ul>
    </div>
    
  </header></div>
  )
}

export default Navbar

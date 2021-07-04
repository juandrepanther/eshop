import {PureComponent} from 'react'
import '../styles/NavBar.css'
import Logo from '../media/Logo.png'
import Basket from '../media/Basket.png'

import {NavLink} from 'react-router-dom'

class NavBar extends PureComponent {

    render() {
        return (
          <>
           <div className='navbar-container'>
               <div className="navbar-wrapper">
               <div className='navbar-container-one'>
                   <ul className='nav-menu'>
                        <NavLink to='/clothes'><li className='nav-item'>CLOTHES</li></NavLink>
                        <NavLink to='/tech'><li className='nav-item'>TECH</li></NavLink>
                        <NavLink to='/kids'><li className='nav-item'>KIDS</li></NavLink>
                        
                   </ul>
               </div>
               <div className='navbar-container-two'>
                   <img src={Logo} alt="" className="logo" />
                </div>
                <div className="navbar-container-three">
                    <select className="currency">
                        <option value="1" className="option"></option>
                        <option value="2" className="option"></option>
                        <option value="3" className="option"></option>
                        <option value="4" className="option"></option>
                    </select>
                    <img src={Basket} alt="" className="basket" />
                </div>
                </div>
           </div>
           
           </>  
        )
    }
        
    
}

export default NavBar
import {PureComponent} from 'react'
import {connect} from 'react-redux'
import { addValue } from "../redux/rootReducers";

//needed for multiple default export at the end of component

import '../styles/NavBar.css'
import Logo from '../media/Logo.png'
import Basket from '../media/Basket.png'

import {NavLink} from 'react-router-dom'

class NavBar extends PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            value: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.update = this.update.bind(this)
        
    }
        handleChange = (e) => {
            console.log(e.target.value);
        this.setState({
            value: e.target.value
        })   
        }

        update = () => {
            const {addValue} = this.props
            addValue(this.state.value)
        }

    render() {
        console.log(this.props);
        return (
          <>
           <div className='navbar-container'>
               <div className="navbar-wrapper">
               <div className='navbar-container-one'>
                   <ul className='nav-menu'>
                        <NavLink to='/clothes'><li className='nav-item' value='clothes'>CLOTHES</li></NavLink>
                        <NavLink to='/tech'><li className='nav-item' value='tech'>TECH</li></NavLink>
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


                <div>
        <input type='text' value={this.state.value} onChange={this.handleChange}></input>
        
        <button onClick={this.update}>
          Update
        </button>
        
        </div>


           </div>
           
           </>  
        )
    }
        
    
}

//code ralted to REDUX states


const mapStateToProps = (state) => ({
    count: state.counter.value
  });
  
  const mapDispatchToProps = { addValue };

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

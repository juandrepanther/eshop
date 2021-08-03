import { PureComponent } from 'react'
import { connect } from 'react-redux'
import { changeCurrency } from '../redux/currencyReducer'
import { showCartOverlay } from '../redux/cartOverlayReducer'
import { showPdp } from '../redux/showPdpReducer'
import '../styles/NavBar.css'
import Logo from '../media/Logo.png'
import Basket from '../media/Basket.png'
import { NavLink } from 'react-router-dom'
//import utility
import itemBasketCount from '../utils/itemBasketCount'

class NavBar extends PureComponent {
 constructor(props) {
  super(props)
  this.handleCurrency = this.handleCurrency.bind(this)
  this.showCartOverlay = this.showCartOverlay.bind(this)
  this.renderBasketCount = this.renderBasketCount.bind(this)
 }

 handleCurrency = (e) => {
  const { changeCurrency } = this.props
  changeCurrency(e.target.value)
 }

 showCartOverlay = () => {
  const { showCartOverlay } = this.props
  showCartOverlay()
 }

 renderBasketCount() {
  const allItems = this.props.items
  if (allItems.length !== 0) {
   return (
    <div className='small-basket-counter'>{itemBasketCount(allItems)}</div>
   )
  }
 }

 renderNavLinks() {
  return (
   <div className='navbar-container-one'>
    <ul className='nav-menu'>
     <NavLink exact to='/' activeClassName='selected'>
      <li className='nav-item' value='all'>
       ALL
      </li>
     </NavLink>
     <NavLink to='/clothes' activeClassName='selected'>
      <li className='nav-item' value='clothes'>
       CLOTHES
      </li>
     </NavLink>
     <NavLink to='/tech' activeClassName='selected'>
      <li className='nav-item' value='tech'>
       TECH
      </li>
     </NavLink>
    </ul>
   </div>
  )
 }

 renderSelectCurrency() {
  return (
   <select
    className='currency-options-bar'
    value={this.props.currency}
    onChange={this.handleCurrency}>
    <option value='USD' className='option'>
     $ USD
    </option>
    <option value='GBP' className='option'>
     £ GBP
    </option>
    <option value='AUD' className='option'>
     $ AUD
    </option>
    <option value='JPY' className='option'>
     ¥ JPY
    </option>
    <option value='RUB' className='option'>
     ₽ RUB
    </option>
   </select>
  )
 }

 render() {
  return (
   <>
    <div className='navbar-container'>
     <div className='navbar-wrapper'>
      {this.renderNavLinks()}
      <div className='navbar-container-two'>
       <img src={Logo} alt='' className='logo' />
      </div>
      <div className='navbar-container-three'>
       {this.renderSelectCurrency()}
       <div className='basket-wrapper'>
        <img
         src={Basket}
         alt=''
         className='basket'
         onClick={() => this.showCartOverlay()}
        />
        {this.renderBasketCount()}
       </div>
      </div>
     </div>
    </div>
   </>
  )
 }
}

const mapStateToProps = (state) => ({
 currency: state.currency.currency,
 items: state.items.items,
})

const mapDispatchToProps = { changeCurrency, showPdp, showCartOverlay }
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

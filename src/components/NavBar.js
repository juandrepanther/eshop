import { PureComponent } from 'react'
import { connect } from 'react-redux'
import { changeCurrency } from '../redux/currencyReducer'
import { showCartOverlay } from '../redux/cartOverlayReducer'
import '../styles/NavBar.css'
import Logo from '../media/Logo.png'
import UpArrow from '../media/upArrow.png'
import DownArrow from '../media/downArrow.png'
import Basket from '../media/Basket.png'
import { NavLink } from 'react-router-dom'
import CartOverlay from './CartOverlay'
//import utilities
import itemBasketCount from '../utils/itemBasketCount'
import currencySymbol from '../utils/currencySymbol'
class NavBar extends PureComponent {
 constructor(props) {
  super(props)
  this.state = { isClicked: false, isOverlay: false }
  this.handleCurrency = this.handleCurrency.bind(this)
  this.showCartOverlay = this.showCartOverlay.bind(this)
  this.renderBasketCount = this.renderBasketCount.bind(this)
 }

 handleCurrency = (e) => {
  const clickedValue = e.target.attributes[0].nodeValue
  const { changeCurrency } = this.props
  changeCurrency(clickedValue)
  this.setState({ isClicked: false })
 }

 showCartOverlay = () => {
  const { showCartOverlay } = this.props
  showCartOverlay()
 }
 showCartOverlayNavBar = () => {
  const { showCartOverlay } = this.props
  showCartOverlay(false)
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
   <div
    className='navbar-container-one'
    onClick={(e) => this.showCartOverlayNavBar(e)}>
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

 showOptions = () => {
  this.showCartOverlayNavBar()
  this.setState({ isClicked: !this.state.isClicked })
 }

 renderSelectCurrency() {
  return (
   <div className='currency-options-bar' onChange={this.handleCurrency}>
    <div
     className='currency-options-wrapper'
     onClick={() => this.showOptions()}>
     <div className='currency-options-active'>
      {currencySymbol(this.props.currency)}
     </div>
     <div className='currency-options-arrow'>
      {this.state.isClicked ? (
       <div>
        <img alt='' src={UpArrow} />
       </div>
      ) : (
       <div>
        <img alt='' src={DownArrow} />
       </div>
      )}
     </div>
    </div>

    {this.state.isClicked && (
     <div className='currency-options-items'>
      <div
       data-value='USD'
       className='option'
       onClick={(e) => this.handleCurrency(e)}>
       $ USD
      </div>
      <div
       data-value='GBP'
       className='option'
       onClick={(e) => this.handleCurrency(e)}>
       £ GBP
      </div>
      <div
       data-value='AUD'
       className='option'
       onClick={(e) => this.handleCurrency(e)}>
       $ AUD
      </div>
      <div
       data-value='JPY'
       className='option'
       onClick={(e) => this.handleCurrency(e)}>
       ¥ JPY
      </div>
      <div
       data-value='RUB'
       className='option'
       onClick={(e) => this.handleCurrency(e)}>
       ₽ RUB
      </div>
     </div>
    )}
   </div>
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
       <div className='basket-wrapper' onClick={() => this.showCartOverlay()}>
        <img src={Basket} alt='' className='basket' />
        {this.renderBasketCount()}
       </div>
      </div>
     </div>
    </div>
    {this.props.isOverlay && (
     <>
      <div
       className='cartoverlay-backdrop'
       onClick={() => this.showCartOverlay()}></div>
      <CartOverlay />
     </>
    )}
   </>
  )
 }
}

const mapStateToProps = (state) => ({
 currency: state.currency.currency,
 items: state.items.items,
 isOverlay: state.isOverlay.isOverlay,
})

const mapDispatchToProps = { changeCurrency, showCartOverlay }
export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

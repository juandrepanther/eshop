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
  this.state = {
   all: '#5ECE7B',
   clothes: 'transparent',
   tech: 'transparent',
   allText: 'black',
   clothesText: 'black',
   techText: 'black',
  }
  this.handleCurrency = this.handleCurrency.bind(this)
  this.showCartOverlay = this.showCartOverlay.bind(this)
  this.closeCartOverlay = this.closeCartOverlay.bind(this)
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

 closeCartOverlay(navlink) {
  this.props.showPdp(false)
  if (navlink === 'clothes')
   return this.setState({
    clothes: '#5ECE7B',
    tech: 'transparent',
    all: 'transparent',
    clothesText: '#5ECE7B',
    techText: 'black',
    allText: 'black',
   })
  if (navlink === 'tech')
   return this.setState({
    clothes: 'transparent',
    tech: '#5ECE7B',
    all: 'transparent',
    clothesText: 'black',
    techText: '#5ECE7B',
    allText: 'black',
   })
  if (navlink === 'all')
   return this.setState({
    clothes: 'transparent',
    tech: 'transparent',
    all: '#5ECE7B',
    clothesText: 'black',
    techText: 'black',
    allText: '#5ECE7B',
   })
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
     <NavLink to='/'>
      <li
       className='nav-item'
       value='all'
       style={{
        borderBottom: `2px solid ${this.state.all}`,
        color: `${this.state.allText}`,
       }}
       onClick={() => this.closeCartOverlay('all')}>
       ALL
      </li>
     </NavLink>
     <NavLink to='/clothes'>
      <li
       className='nav-item'
       value='clothes'
       style={{
        borderBottom: `2px solid ${this.state.clothes}`,
        color: `${this.state.clothesText}`,
       }}
       onClick={() => this.closeCartOverlay('clothes')}>
       CLOTHES
      </li>
     </NavLink>
     <NavLink to='/tech'>
      <li
       className='nav-item'
       value='tech'
       style={{
        borderBottom: `2px solid ${this.state.tech}`,
        color: `${this.state.techText}`,
       }}
       onClick={() => this.closeCartOverlay('tech')}>
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
         onMouseEnter={() => this.showCartOverlay()}
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

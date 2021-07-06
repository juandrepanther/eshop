import { PureComponent } from 'react'
import { connect } from 'react-redux'

import { changeCurrency } from '../redux/currencyReducer'

//needed for multiple default export at the end of component

import '../styles/NavBar.css'
import Logo from '../media/Logo.png'
import Basket from '../media/Basket.png'

import { NavLink } from 'react-router-dom'

class NavBar extends PureComponent {
  constructor(props) {
    super(props)

    this.handleCurrency = this.handleCurrency.bind(this)
  }

  handleCurrency = (e) => {
    const { changeCurrency } = this.props
    changeCurrency(e.target.value)
  }

  render() {
    return (
      <>
        <div className="navbar-container">
          <div className="navbar-wrapper">
            <div className="navbar-container-one">
              <ul className="nav-menu">
                <NavLink to="/clothes">
                  <li className="nav-item" value="clothes">
                    CLOTHES
                  </li>
                </NavLink>
                <NavLink to="/tech">
                  <li className="nav-item" value="tech">
                    TECH
                  </li>
                </NavLink>
              </ul>
            </div>
            <div className="navbar-container-two">
              <img src={Logo} alt="" className="logo" />
            </div>
            <div className="navbar-container-three">
              <select
                className="currency"
                value={this.props.currency}
                onChange={this.handleCurrency}
              >
                <option value="icon" className="option">
                  icon
                </option>
                <option value="USD" className="option">
                  USD
                </option>
                <option value="GBP" className="option">
                  GBP
                </option>
                <option value="AUD" className="option">
                  AUD
                </option>
                <option value="JPY" className="option">
                  JPY
                </option>
                <option value="RUB" className="option">
                  RUB
                </option>
              </select>
              <img src={Basket} alt="" className="basket" />
            </div>
          </div>
        </div>
      </>
    )
  }
}

//code ralted to REDUX states

const mapStateToProps = (state) => ({
  currency: state.currency.currency,
})

const mapDispatchToProps = { changeCurrency }

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)

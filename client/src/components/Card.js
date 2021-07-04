import { Fragment, PureComponent } from 'react'
import '../styles/Card.css'

export default class Card extends PureComponent {
  constructor(props) {
    super(props)
  }
  render() {
    console.log(this)

    const data = this.props.data
    console.log('Card.js Data on console', data)
    console.log(this.props)
    return <Fragment>Hello</Fragment>
  }
}

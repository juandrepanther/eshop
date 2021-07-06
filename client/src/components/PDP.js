import React, { PureComponent } from 'react'

export default class PDP extends PureComponent {
  render() {
    const data = this.props.data
    console.log(data)
    return <div>Hello</div>
  }
}

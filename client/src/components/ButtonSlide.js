//not ACTIVE, just my example Component

import React, { Component } from 'react'

export default class ButtonSlide extends Component {
  constructor() {
    super()
    this.state = { imageIndex: 0 }
    this.changeSlide = this.changeSlide.bind(this)
  }

  changeSlide(length, direction) {
    if (direction === '&#60;') {
      this.setState({
        ...this.state,
        imageIndex:
          this.state.imageIndex === 0 ? length - 1 : this.state.imageIndex - 1,
      })
    } else {
      this.setState({
        ...this.state,
        imageIndex:
          this.state.imageIndex === length - 1 ? 0 : this.state.imageIndex + 1,
      })
    }
  }

  render() {
    const direction = this.props.arrow
    const classAtribute = this.props.classAtribute
    const length = this.props.item.data.gallery.length
    console.log(this.props.item)
    return (
      <>
        <button
          className={classAtribute}
          onClick={() => this.changeSlide(length, direction)}>
          {direction}
        </button>
      </>
    )
  }
}

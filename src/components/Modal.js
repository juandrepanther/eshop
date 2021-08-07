import React, { Component } from 'react'
import { connect } from 'react-redux'
import { showOutModal } from '../redux/outStockReducer'
import { showAttrModal } from '../redux/noAttrReducer'
import { isDublicate } from '../redux/itemsReducer'
import '../styles/Modal.css'
class Modal extends Component {
 closeModal() {
  const { showOutModal, showAttrModal, isDublicate } = this.props
  showOutModal(false)
  showAttrModal(false)
  isDublicate(false)
 }
 render() {
  setTimeout(() => this.closeModal(), 3000)
  return (
   <div className="modal-container" onClick={() => this.closeModal()}>
    <div className="modal-textBox" onClick={() => this.closeModal()}>
     {this.props.children}
    </div>
   </div>
  )
 }
}

const mapDispatchToProps = { showOutModal, showAttrModal, isDublicate }
export default connect(null, mapDispatchToProps)(Modal)

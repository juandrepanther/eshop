import { PureComponent } from 'react'

class RadioButton extends PureComponent {
 render() {
  const decision = this.props.decision
  const criteria = this.props.criteria
  const isInStock = this.props.isInStock

  return (
   <label className="item-criteria-items-boxwrapper">
    <input
     name={criteria.name}
     type="radio"
     key={decision.id}
     value={decision}
     className="item-criteria-items-box"
     disabled={!isInStock}
    />
    <div
     className="radio-text"
     style={{ backgroundColor: `${decision.displayValue}` }}
     data-content={decision.displayValue}
    ></div>
   </label>
  )
 }
}

export default RadioButton

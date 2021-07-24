import { PureComponent } from 'react'

class RadioButton extends PureComponent {
 render() {
  const { decision, criteria, isInStock } = this.props

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

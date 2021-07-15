import { PureComponent } from 'react'

class RadioButton extends PureComponent {
  render() {
    const decision = this.props.decision
    const criteria = this.props.criteria

    return (
      <label className="item-criteria-items-boxwrapper">
        <input
          name={criteria.name}
          type="radio"
          key={decision.id}
          value={decision}
          className="item-criteria-items-box"
        />
        <div className="radio-text" data-content={decision.displayValue}></div>
      </label>
    )
  }
}

export default RadioButton

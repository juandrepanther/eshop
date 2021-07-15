import { PureComponent } from 'react'

class RadioButton extends PureComponent {
  render() {
    const decision = this.props.decision
    const criteria = this.props.criteria

    return (
      <div className="item-criteria-items-boxwrapper">
        <input
          name={criteria.name}
          type="radio"
          key={decision.id}
          value={decision}
          className="item-citeria-items-box"
        />
        <span>{decision.displayValue}</span>
      </div>
    )
  }
}

export default RadioButton

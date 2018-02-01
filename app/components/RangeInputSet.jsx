import React from 'react';

export default class RangeInputSet extends React.Component { 
  render() {
    const {
      min = 0,
      max = 10,
      step = 1,
      value = 5,
      label = 'range',
      onChange = ()=>{}
    } = this.props;
    const changeHandler = (e) => {
      onChange(parseFloat(e.target.value))
    }
    return <div>
      <label>{ label } { value }</label>
      <input type="range" min={ min } step={ step } max={ max } value={ value } onChange={ changeHandler } />
    </div>
  }
}

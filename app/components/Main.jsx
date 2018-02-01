import React from 'react';
import { connect } from 'react-redux';
import { setTest } from '../stores/AppStore';
import RangeInputSet from './RangeInputSet.jsx';

class Main extends React.Component  {
  render() {
    const wrapStyle = {
      position: 'absolute'
    };
    const { test } = this.props.app;

    return <div style={ wrapStyle }>
      <h2>React / Redux</h2>
      <form>
        <fieldset>
          <RangeInputSet label={ 'Island Scale' } min={ 1 } max={ 2 } step={ 0.02 } value={ test } onChange={ v => { this.props.dispatch(setTest(v)) } } />
        </fieldset>
      </form>
    </div>
  }
}

export default connect(
  state => ({ app: state.App })
)(Main)
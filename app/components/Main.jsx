import React from 'react';
import { connect } from 'react-redux';
import { setTest, setDirIten } from '../stores/AppStore';
import RangeInputSet from './RangeInputSet.jsx';

class Main extends React.Component  {
  render() {
    const wrapStyle = {
      position: 'absolute',
      padding: 20
    };
    const { test, dirinten } = this.props.app;

    return <div style={ wrapStyle }>
      <h2>Three Seed</h2>
      <p>With React and Redux</p>
      <form>
        <fieldset>
          <RangeInputSet label={ 'Island Scale' } min={ 1 } max={ 2 } step={ 0.02 } value={ test } onChange={ v => { this.props.dispatch(setTest(v)) } } />
          <RangeInputSet label={ 'Directional Light Intensity' } min={ 0 } max={ 3 } step={ 0.2 } value={ dirinten } onChange={ v => { this.props.dispatch(setDirIten(v)) } } />
        </fieldset>
      </form>
    </div>
  }
}

export default connect(
  state => ({ app: state.App })
)(Main)
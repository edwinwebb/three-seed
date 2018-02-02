import React from 'react';
import { connect } from 'react-redux';
import { setIslandScale , setDirIten } from '../stores/AppStore';
import RangeInputSet from './RangeInputSet.jsx';

class Main extends React.Component  {
  render() {
    const wrapStyle = {
      position: 'absolute',
      padding: 20
    };
    const { islandScale, dirinten } = this.props.app;

    return <div style={ wrapStyle }>
      <h2>Three Seed</h2>
      <p>With React and Redux</p>
      <form>
        <fieldset>
          <RangeInputSet label={ 'Island Scale' } min={ 1 } max={ 2 } step={ 0.05 } value={ islandScale } onChange={ v => { this.props.dispatch(setIslandScale(v)) } } />
          <RangeInputSet label={ 'Light' } min={ 0 } max={ 3 } step={ 0.05 } value={ dirinten } onChange={ v => { this.props.dispatch(setDirIten(v)) } } />
        </fieldset>
      </form>
    </div>
  }
}

export default connect(
  state => ({ app: state.App })
)(Main)
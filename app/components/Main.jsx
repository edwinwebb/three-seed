import React from 'react';
import { connect } from 'react-redux';
import { setIslandScale , setDirIten, setLightColor } from '../stores/AppStore';
import RangeInputSet from './RangeInputSet.jsx';

class Main extends React.Component  {
  render() {
    const wrapStyle = {
      position: 'absolute',
      padding: 20
    };
    const { islandScale, dirinten, lightcolor } = this.props.app;

    return <div style={ wrapStyle }>
      <h2>Three Seed</h2>
      <p>Three.js project biolerplate with ES6 and React/Redux controls. Design Goal: to get projects up and running fast. Get the code on <a href="https://github.com/edwinwebb/three-seed/">GitHub</a></p>
      <form>
        <fieldset>
          <RangeInputSet label={ 'Island Scale' } min={ 0.4 } max={ 2 } step={ 0.05 } value={ islandScale } onChange={ v => { this.props.dispatch(setIslandScale(v)) } } />
          <RangeInputSet label={ 'Light Intensity' } min={ 0 } max={ 3 } step={ 0.05 } value={ dirinten } onChange={ v => { this.props.dispatch(setDirIten(v)) } } />
          <label>Light Color</label>
          <input type="color" value={ lightcolor } onChange={ e => { this.props.dispatch(setLightColor(e.target.value)) } } />
        </fieldset>
      </form>
    </div>
  }
}

export default connect(
  state => ({ app: state.App })
)(Main)
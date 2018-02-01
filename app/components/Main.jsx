import React from 'react';
import { connect } from 'react-redux';
import { setMapVisible, setTreesVisible } from '../stores/AppStore';

class Main extends React.Component  {
  render() {
    const wrapStyle = {
      position: 'absolute'
    }
    return <div style={ wrapStyle }>
      <h1>Test</h1>
      <form>
        <fieldset>
          <label>Name</label>
          <input type="text" placeholder="CJ Patoilo" />
        </fieldset>
      </form>
    </div>
  }
}

export default connect(
  state => ({ app: state.App })
)(Main)
import { createStore, combineReducers } from 'redux';
import Renderer from './RendererStore';
import App from './AppStore';

const Combi = combineReducers({
  App,
  Renderer
});

// export const AnimationStore = createStore(Animation);

export default createStore(Combi);
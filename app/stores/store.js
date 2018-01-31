import { createStore, combineReducers } from 'redux';
import Animation from './AnimationStore';
import Renderer from './RendererStore';
import App from './AppStore';

const Combi = combineReducers({
  App
});

// export const AnimationStore = createStore(Animation);

export default createStore(Combi);
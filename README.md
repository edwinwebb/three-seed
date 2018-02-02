# Three Seed

A boilerplate for building Three.js apps with ES6. 

[demo](http://edwinwebb.github.io/three-seed/)

## Features
* Easy to work with and understand Webpack and ES6.
* Built in Renderer with resizes and optional GLSL, fire and forget.
* Redux for dependable state management
* React for easy HTML controls
* Use async/await for easy asset loading
* GLSL example with .shader files

## TODO
* Still needs some testing and tightening up
* Make it easy to remove React/Redux/Builtins
* Documentation
* React componenents for Vector modification
* Auto Lint
* Reactman Updates

## npm scripts

* `npm start` - Build and start the app in development mode at http://localhost:8080
* `npm run build` - Run a production build, outputs to ./build/
* `npm run lint` - Lint your code

## Static assets

`import` asset files from within your JavaScript component files:

```javascript
import textureURL from './texture.png';
```

Then load them with the matching loader from /Loaders/Loader.js with [async/await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

```javascript
import { loadTexture } from '/loaders/loader.js';
import textureURL from './texture.png';

const myTexture = await loadTexture(textureURL);
```

## CC Attributes
Floating island : https://poly.google.com/view/eEz9hdknXOi
Flower: https://poly.google.com/view/eydI4__jXpi

## License

Copyright (c) 2018 Edwin Webb

MIT (http://opensource.org/licenses/MIT)

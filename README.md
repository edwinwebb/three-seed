# Three Seed

Three.js project biolerplate with ES6 and React/Redux controls. Design Goal: to get projects up and running fast.

[demo](http://edwinwebb.github.io/three-seed/)

## Features
* Easy to work with and understand Webpack and ES6.
* Built in Renderer with resizes and optional GLSL, fire and forget.
* Redux for dependable state management
* React for easy HTML controls
* Use async/await for easy asset loading
* GLSL example with .shader files
* Tweening with GSAP

## TODO
If you can help with this project, please do!
* HotLoading
* Update Tweens to PopMotion
* Make it easy to remove React/Redux/Builtins
* Documentation
* React componenents for Vector modification
* Auto Lint
* Reactman Updates - add React component

## Running the Project

Clone the project, remove the git repository and install to get going:

```bash
git clone --depth=1 https://github.com/edwinwebb/three-seed.git my-project
cd my-project
rm -rf .git
npm install
npm start
```

Then visit http://localhost:8080

### Editing the code
There are two entry files which are called from the project init code in the entry file `app.js`.

* Three.js : `app/objects/Scene.js`
* React : `app/components/Main.jsx`

Data is managed in Redux stores, I've included one for the renderer and the app it's self. There are examples in the codebase and online : https://redux.js.org/docs/basics/

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

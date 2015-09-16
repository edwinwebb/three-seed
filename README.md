# Pixi Seed

This seeds to deigned to bootstrap your PIXI.js development with modern tooling and technology and project organisation.

Webpack with ES6 provides a more modular approach to PIXI.js development and  allow you to include assets within your JS. Reactman allows you to quickly add assets to your project and optional Flux architecture allows more complex apps to be built in an organised manner.

The seed is designed to work across multiple devices with a ‘best-fit’ rendering methodology.

## Getting started

Clone the project and remove the git repository:

```
git clone --depth=1 https://github.com/edwinwebb/pixi-seed.git my-project
cd my-project
rm -rf .git
```

## npm scripts

* `npm start` - Build and start the app in dev mode at http://localhost:8080/webpack-dev-server/index.html
* `npm run webpack` - Run a production build

## webpack

`import` asset files from within your JavaScript component files:

```js
// Filename: app.jsx
import assetURL from './logo.png';
```

## License

Copyright (c) 2015 Edwin Webb

MIT (http://opensource.org/licenses/MIT)

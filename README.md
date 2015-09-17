# Pixi Seed

This seeds to deigned to bootstrap your PIXI.js development with modern tooling, technology and project organisation.

Webpack with ES6 provides a more modular approach to PIXI.js development and allows you to include assets within your JS. Reactman allows you to quickly add assets to your project and Flux architecture allows more complex apps to be built in an organised manner.

The seed is designed to work across multiple devices with a ‘best-fit’ rendering methodology.

## Getting started

Clone the project and remove the git repository:

```
git clone --depth=1 https://github.com/edwinwebb/pixi-seed.git my-project
cd my-project
rm -rf .git
```

You can configure some app settings in package.json

```
"config": {
  "buildDir": "./build",
  "stageWidth": 1920,
  "stageHeight": 1080
}
```

## npm scripts

* `npm start` - Build and start the app in development mode at http://localhost:8080
* `npm run build` - Run a production build, outputs to ./build/
* `npm run lint` - Lint your code

```
## Static assets

`import` asset files from within your JavaScript component files:

```js
// Filename: app.js
import assetURL from './logo.png';
```

## Removing the bootstrapped files
Remove the Renderer, dispatcher, actions and stores folders. Then in displayobjects
remove Bunny, BunnyGroup and Background. Finally edit App so it extends PIXI.Container
rather than ScaledObjectGroup and clear out the calls to deleted files.

## License

Copyright (c) 2015 Edwin Webb

MIT (http://opensource.org/licenses/MIT)

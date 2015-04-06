# Pixi Seed

A boilerplate for building Pixi projects with ES6 and Flux architechture.

## What you get
- ES6 via Babel
- Build with WebPack
- Pixi.js
- Flux
- Tween.js

## Getting started

Clone the project and remove the git repository:

```
git clone --depth=1 https://github.com/edwinwebb/pixi-seed.git my-project
cd my-project
rm -rf .git
```

## npm scripts

* `npm start` - Build and start the project in dev mode at http://localhost:8000


## npm scripts

* `npm start` - Build and start the app in dev mode at http://localhost:8000
* `npm run build` - Run a production build


## webpack

`import` Files from within your JavaScript component files:

```js
// Filename: app.jsx
import assetURL from './logo.png';
```

## HTML files

All required `.html` files are compiled with lodash.template and synced into the `./build` directory:

```js
// Filename: app.jsx
import './index.html';
```

* You can adjust the lodash template data in the `webpack.config.js` file.

## Releasing

Updating version:

* `npm version patch` - Bump version
* `git push && git push --tags` - Push to remote

Publishing package:

* `npm login` - Login to npm
* `npm publish` - Publish package

## Credits

This project was initially forked from https://github.com/badsyntax/react-seed

## License

Copyright (c) 2015 Edwin Webb

MIT (http://opensource.org/licenses/MIT)

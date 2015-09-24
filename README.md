# Pixi Seed

This project is designed to bootstrap your PIXI.js development with modern tooling, technology and project organisation. Use as boilerplate for your next Pixi.js project

Webpack with ES6 provides a more modular approach to PIXI.js development and allows you to include assets within your JS. Reactman allows you to quickly add assets to your project and the example Store helps organise your data.

The seed is designed to work across multiple devices with a ‘best-fit’ rendering methodology.

## Example Sprite
Here's the power of a module bundler and ES6 in relation to PIXI.js. The texture is bundled with Webpack and the new sprite is easily generated with `let bunny = new Bunny();`

```JavaScript
import { Tween } from 'tween.js';
import { Sprite, Texture } from 'pixi.js';
import BUNNY from'./bunny.png';

/**
 * A bunny which spins on it's feet when moused over
 *
 * @exports Bunny
 * @extends Sprite
 */
export default class Bunny extends Sprite {

  constructor() {
    const texture = Texture.fromImage(BUNNY);

    super(texture);

    this.tween = new Tween(this);

    this.anchor.x = .5;
    this.anchor.y = 1;

    this.pivot.x = .5;
    this.pivot.y = .5;

    this.interactive = true;
  }

  startSpin() {
    this.tween.to({rotation: Math.PI*2}, 1000);
    this.tween.start();
    this.tween.onComplete(() => this.rotation = 0);
  }

  mouseover() {
    this.startSpin();
  }

}
```

## Getting started

Clone the project and remove the git repository:

```bash
git clone --depth=1 https://github.com/edwinwebb/pixi-seed.git my-project
cd my-project
rm -rf .git
```

You can configure some app settings in package.json

```json
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

## Static assets

`import` asset files from within your JavaScript component files:

```javascript
// Filename: app.js
import assetURL from './logo.png';
```

## Removing the bootstrapped files
It's as easy as removing all the child folders in ./app/ then emptying app.js.

## License

Copyright (c) 2015 Edwin Webb

MIT (http://opensource.org/licenses/MIT)

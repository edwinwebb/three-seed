# Three Seed

This seed is designed to bootstrap your Three.js development with modern tooling, technology and project organisation.

## TODO
* Add GLSL loaders and example
* Add await, async with fileLoader examples

## npm scripts

* `npm start` - Build and start the app in development mode at http://localhost:8080
* `npm run build` - Run a production build, outputs to ./build/
* `npm run lint` - Lint your code

## Static assets

`import` asset files from within your JavaScript component files:

```javascript
import textureURL from './texture.png';
```

Then load them with the matching loader from /Loaders/Loader.js

```javascript
import { loadTexture } from '/loaders/loader.js';
import textureURL from './texture.png';

const myTexture = await loadTexture(textureURL);
```

## CC Attributes
land : https://poly.google.com/view/5qvyWhWns5f
Floating island : https://poly.google.com/view/eEz9hdknXOi
Flower: https://poly.google.com/view/eydI4__jXpi

## License

Copyright (c) 2017 Edwin Webb

MIT (http://opensource.org/licenses/MIT)

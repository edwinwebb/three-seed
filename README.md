# Three Seed

Three.js starter project boilerplate bundled with Webpack.

This project is designed to help you get started on your next three.js project. It sets up a simple scene, camera and renderer to view two imported GLTF assets.

[Online Demo](http://edwinwebb.github.io/three-seed/)

## Install
Before you begin, make sure you are comfortable with terminal commands and have [Node and NPM installed](https://www.npmjs.com/get-npm). Then either install via a download or with Git.

### Install via Download
First download the [zip of the project](https://github.com/edwinwebb/three-seed/archive/master.zip) and extract it. Then in terminal at that folder type `npm install` to set things up. To get going run: `npm start`.

### Install with Git
In terminal clone the project into a directory of your choice then delete the git folder to start fresh.

```bash
git clone --depth=1 https://github.com/edwinwebb/three-seed.git my-project
cd my-project
rm -rf .git
npm install
```

## Running the development server
To see the changes you make to the starter project go to the project folder in terminal and type...

```bash
npm start
```

This command will bundle the project code and start a development server at [http://localhost:8080/](http://localhost:8080/). Visit this in your web browser; you should see a rotating island and flower.

## Editing the code
The first file you should open is `./objects/Scene.js`. In it you will find the three objects comprising the ThreeJS scene represented in your browser. The flower, the island, and the lights illuminating them are each represented as a javascript file in the `./object/` folder. Open these, edit them and see your changes in the browser. If something goes wrong a message will displayed in the debug console of the browser.

## Importing local files
Local files, such as images and 3D models, are imported into the application as URLs then loaded asynchronously with three.js. Most common files that three.js uses are supported. For more information about this system see the [webpack site](https://webpack.js.org/).

## Importing modules from the web
If you want to add additional functionality to your project, you can search and install them from the [NPM repository](https://www.npmjs.com/). Some modules you might want to consider are...
* [three-orbit-controls](https://www.npmjs.com/package/three-orbit-controls)
* [popmotion](https://www.npmjs.com/package/popmotion)
* [Cannon.js Physics](https://www.npmjs.com/package/cannon).

Additions like these are best managed in the projects entry file: `./src/entry.js`. In it are the Scene, Camera, Renderer, the window event listeners and the animation loop.

## Using the Three.js Examples
When using this project you might bump into a few issues around using 
the examples from three.js docs. Most of the common issues have been 
solved with including NPM packages. However, for more complex examples 
with custom script includes you might find yourself having to refactor 
them. See [Issue 15](https://github.com/edwinwebb/three-seed/issues/15) 
for an example.

## About the models
Both the models are loaded by the GLTFLoader and were sourced from the Google Poly project.

"[Floating Island](https://poly.google.com/view/eEz9hdknXOi)" by [sirkitree](https://poly.google.com/user/3dVB0GT8oMI) is licensed under CC BY 2.0

"[Flower](https://poly.google.com/view/9znAp0dJiS8)" by [Poly By Google](https://poly.google.com/user/4aEd8rQgKu2) is licensed under CC BY 2.0

## Building the project for the web
Once you are happy with your project you'll be sure to want to show it off. Running `npm run build` in terminal will bundle your project into the folder `./build/`. You can upload this directory to a web server. For more complex results read [this guide](https://webpack.js.org/guides/production/).

## License
[MIT](https://github.com/edwinwebb/three-seed/blob/master/LICENSE)

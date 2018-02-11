# Three Seed

Three.js starter project biolerplate bundled with webpack.

This project will help you get started on your next three.js project and provide 
a foundation for extension. It sets up a scene, camera and renderer and gives examples of loading objects.

[demo](http://edwinwebb.github.io/three-seed/)

## Install
Before you begin, make sure your comfortable with terminal commands and have 
[Node and NPM installed](https://www.npmjs.com/get-npm). 

### Install with Git
```bash
git clone --depth=1 https://github.com/edwinwebb/three-seed.git my-project
cd my-project
rm -rf .git
npm install
```

### Install via Download
Download the [zip of the project](https://github.com/edwinwebb/three-seed/archive/master.zip), 
extract it and then in terminal type `npm install` to install dependencies.

## Running the development server
To see the changes you make to the starter project go to the project folder in 
terminal and follow the instruction

```bash
npm start
```

This command will bundle the project code and start a development server at 
(http://localhost:8080/)[http://localhost:8080/]. Visit this in your web browser, 
every time you make changes to the code, the page will refresh.

## Editing the code
The first file you should open is `./objects/Scene.js`. In it you will find the 
three objects comprising the world represented in your browser. The flower, 
the island and the lights illuminating them are each represented as a javascript 
file. Open these, edit them and see the changes reprented in the browser. If 
something goes wrong a message will displayed in the debug console of your 
browser.

## Importing local files
Local files, such as images and 3D models, are imported into the application 
as URLS then loaded asyncrously with three.js. Most common files that three.js 
uses are supported. Shader files are loaded as raw text. For more information 
about this system see the [webpack site](https://webpack.js.org/).

## Importing modules from the web
If you want to add additonal functionality to your project, you can search and 
install them from the [NPM repository](https://www.npmjs.com/). Some modules 
you might want to consider are..
 * [three-orbit-controls](https://www.npmjs.com/package/three-orbit-controls)
 * [popmostion](https://www.npmjs.com/package/popmostion)
 * [Cannon.js Physics](https://www.npmjs.com/package/cannon).

Additions like these are best managed in the projects entry file: `./src/entry.js`. 
In it are the Scene, Camera and Renderer classes, the window event listeners and 
the animation loop.

## Building the project for the web
Once you are happy with your project you'll be sure to want to show it off. 
Running `npm run build` in terminal will bundle your project into the folder 
`./build/`. You can upload this directory to a web server. For more complex results read [this guide](https://webpack.js.org/guides/production/).

## Advanced Usage
This project has a branch with a host of additional features for the advanced user. 
It contains shaders, tweens, and react with redux. See the 'advanced' branch.

## CC Attributes
Floating island : https://poly.google.com/view/eEz9hdknXOi
Flower: https://poly.google.com/view/eydI4__jXpi

## License
MIT (http://opensource.org/licenses/MIT)

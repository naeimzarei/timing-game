# Documentation

## Installation
Open up a terminal and navigate to the folder where you want to download this repository. For instance...

```bash
cd Documents/Repos
```

To clone the directory, run the following command. 

```bash
git clone https://github.com/naeimzarei/timing-game.git
```

Change your directory to timing-game.

```bash
cd Documents/Repos/timing-game
```

To install dependencies, you must first install Node.js and run the following command after navigating to the root folder.

```bash
npm install 
```

To start the server and open up the browser, run this command.

```bash
npm run start
```

## Code

The ```src``` folder contains the modules that are shown on the page.

The ```config``` folder contains a configuration file that shares constantsa across the application.

The ```util``` folder contains a helper file for playing sound and generating random numbers.

Anything that ends with ```.css``` is a stylesheets file. Each module has its own corresponding ```.css``` file. For instance, ```Game.tsx``` corresponds to ```Game.css```.

Any file that ends with ```.tsx``` is a TypeScript React file. It contains the necessary export to render the component on the page.

The entry point to the application is ```index.tsx```. It renders the top-most component, which is render under ```public/index.html``` on the part that says ```<div id="root"></div>```.

The following commands runs the start script.
```bash
npm run start
```

## Components 
The top-most container that I have created is ```Game.tsx```. All other components are attached to the top-most container. 

The Game component puts everything together into one game application. 

The Score component keeps track of the score of the game.

The Message component updates the game messages. 

The Board component contains the game board. 

## State Management 

MobX is an implementation of the observer/observable model. It updates variables on components on the view every time a variable is updated. 

The file, ```BoardStore.tsx``` contains the 'store' file that contains the necessary variables and functions to update state on the application.

One instance of BoardStore is produced in ```index.tsx``` as ```const store = new BoardStore();```. This instance is passed as a props to each child component that requires its state to be observed and updated. 

The decorator, ```@observable``` means the variable wants to be dynamically updated.

The decorator, ```@observer``` means the class is an observer of observables. That means that the class will watch for changes in the BoardStore instance and update the view when necessary. 

The decorator, ```@action``` is a function that updates the state (variables in BoardStore).
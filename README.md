Marvel Comics API render 
========================

The aplication is a Single Page Application with the list of comics. The user can search for the title 
of the magazine and the year that started. The comic books should be listed in an accordion, clicking 
on it should open with the details of the comic and an accordion list with the characters, and the 
possibility of the user filtering by a certain character name.

The application use the Marvel API to request information about Comics and Characters. Those inforamtions 
are render using a React-Redux application developed on NodeJs.

Architecture
------------

The project structure is as the following:

```text
project:
    - build/                <- Folder with a production build of this project
    - public/               <- Folder with static resources of project
        - css/              <- Folder with static styles
        - fonts/            <- Folder with fonts used by some styles
        - favicon.ico       <- The project icon
        - index.html        <- The project main file
    - src/                  <- Folder with the source code 
        - components/       <- Folder with react renderable components
            - app.js        <- The main react component, used to render the whole main page
            - comic.js      <- React component to render a comic 
            - comic-list.js     <- React component to render a list of comics
            - error.js      <- React component to render errors 
            - header.js     <- React component to render header (Page title)
            - list-pagination.js    <- React component to render a pagination buttons of a list
        - constants/        <- Constants used by system (Action, Types, Strings)
            - action-types.js   <- All constatnts is defined here
        - reducers/         <- Redux elements used to change project states
            - characters.js     <- Handle characters states
            - comics.js         <- Handle comics states
            - common.js         <- Handle main page states
        agent.js            <- An agent used to do ajax request to Marvel API
        index.js            <- The main file the project
        reducer.js          <- Configure Redux reducers
        store.js            <- Create a store to keep states
    .babelrc                <- Presets for Babel 
    .env                    <- File with environment variables used by production app mode
    local.env               <- File with environment variables used by development app mode
    .gitignore              <- File used by git to read patterns of ignored files
    package.json            <- The nodejs project configuration file
    README.md               <- This file
    server.js               <- Code used by heroku to serve the build folder 
```

Dependencies
------------

The project basically depends on the following packages:

* **react**: the main react project to allow use react classes
* **react-app-env**: used to load environment variables from `.env` files 
* **react-bootstrap**: use to create bootstrap react components 
* **react-bootstrap-maskedinput**: contain a maskedinput react component used to search by Year
* **react-dom**: other basic reat project dependency
* **react-loader**: other basic reat project dependency
* **react-redux**: library used to connect react with redux
* **redux**: library to use redux pattern
* **redux-logger**: a redux library to log
* **superagent**: a library to do ajax requests 
* **superagent-promise**: a library to add Promise in superagent

The style framework used was the Bootstrap-3.3.7. 

Operation
---------

The project starts with an input to perform the comics search. To do the search, choose what to search in the dropdown 
box next to search input. Type in the search input what you want to search for and hit enter.

On choose what to search, the project dispatch a action (`COMICS_CHANGE_FILTER`) to change the state of what to search. 
On hit enter in search input box, the project will dispatch an action (`COMICS_SEARCH`) to indicate the waiting state 
on page. 

When the state changes the project ask the agent (the ajax requester) to perform the search asynchronously. 
When the agent has the response it dispatch another action (`COMICS_RENDER`) to render all results on the page.

If something goes wrong with the agent, another action is dispatched (`COMICS_ERROR`) to rende a error message on main 
page.

If the comics list has more registers them a limit count (defined by an environment variable) a pagination is rendered
below of comics list to change the page. On click in some pagination button, an action (`COMICS_SET_PAGE`) is dispatched 
to ask the agent to request the another amount of comics related to requested page.    

Running
-------

To run the project you must have [NodeJs](https://nodejs.org) installed on your system.  

First you have to install all project dependencies. At the terminal run the following command on project folder:

```commandline 
$ npm install
``` 

Before run the project you must create the file `local.env` (`.env` for build) in the root project folder to define the 
environment variables used by project. The variables are:

```commandline
# Node project mode: development or production
NODE_ENV=development  

# The PORT to run the application
PORT=8080

# Marvel API Key
MARVEL_APIKEY=b607....

# Limit the amount of register requested from server
LIMIT_COUNT=10
```    

To run the project in `development` mode, at terminal run the following command:

```commandline 
$ npm run start
``` 

To build the project (in `production` mode), at terminal run the following command:

```commandline 
$ npm run build
``` 

Deploying
---------

The project was deployed on [Heroku](https://www.heroku.com/). The URL to access the application is 
<https://marvel-comics-react-redux.herokuapp.com>.

This deployed version is a production optimized build.

Comments
--------

All code was written in English just like everything else. On git repository the commits were made in a simple way and 
with descriptive texts of what was done.

Todo list
---------

- Translate the project
- Add cache on agent (for repeated requests)
- Better view
- Show more info about comics
- Create tests for modules using jest

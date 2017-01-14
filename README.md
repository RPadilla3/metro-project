# **Metro Project**

## The Iron Yard Final Project (FEE 2016)

This is a web application designed to be used with the Washington Metropolitan Area Transit Authority API.
This is a user application to make commuting through the DC metro system much easier. This application will provide metro rail information include where the trains are in distance from your stop, this is a live train locator that is updated every 7sec. Also this app will show users if there are any delays on the metro including station names and reason for delays. There is form for the user to fill out with their desired to and from stations to get back all relative commute information including time in minutes distance in miles and pricing depending on the time.

### View [My Site](https://metropass.herokuapp.com) LIVE (it's hosted on Heroku)

The site is continuously deployed onto Heroku on every commit to the Master Branch.

*This application is written using Angular JS*

This is a mainly node based project, so if you do not have node.js already installed on your local machine you must do so in order to use the Node Package Manager(npm) in order to install all of the apps dependencies. All necessary installs will be located at the end of the README.

To work on this code after the repo is cloned you will need to run an `npm install` in your terminal in order to download all dependencies necessary to run the build of this web app.

### Installations

You will need to install node first in order to install all other dependencies.

* [Install node.js](https://nodejs.org/en/)
* [Install mocha](https://mochajs.org/)
* [Install chai](http://chaijs.com/)
* [Install grunt](http://gruntjs.com/)

### Testing

As for testing you will need to install the mocha framework and chai library onto your machine, and for automated task running this app is using grunt, You will need to install some tasks to run onto your gruntfile in order to work on this project smoothly.
These tasks include:
* grunt-contrib-jshint
* grunt-contrib-clean
* grunt-contrib-concat
* grunt-contrib-copy
* grunt-contrib-concat
* grunt-contrib-watch
* grunt-contrib-sass
* grunt-karma

You are going to want to save those as dev-dependencies while installing so use
(example)

`npm install --save-dev grunt-contrib-jshint`

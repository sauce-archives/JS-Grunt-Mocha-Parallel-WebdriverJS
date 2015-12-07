# Description
Uses the following technologies / packages
-   mocha (https://mochajs.org/)
-   grunt-mocha-parallel (https://www.npmjs.com/package/grunt-mocha-parallel) for parallel execution of test suites
-   grunt-parallel (https://github.com/iammerrick/grunt-parallel) for parallel execution against multilevel browser / OS configurations.

# Usage

## Set Sauce Variables:
```
$ export SAUCE_USERNAME=sauce_username
$ export SAUCE_ACCESS_KEY=sauce_access_key
```

## Install Grunt
```
$ npm install -g grunt-cli # use sudo if necessary
```

## Download Node Modules:
```
$ npm install
```

## Run the tests:
```
$ grunt
```

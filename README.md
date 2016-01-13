# Description
Uses the following technologies / packages
-   [mocha](https://mochajs.org/)
-   [grunt-mocha-parallel](https://www.npmjs.com/package/grunt-mocha-parallel) for parallel execution of test suites
-   [grunt-parallel](https://github.com/iammerrick/grunt-parallel) for parallel execution against multilevel browser / OS configurations.
-   [grunt-cli](https://github.com/gruntjs/grunt-cli) for command line execution used by CI or build scripts. 

# Usage

## Set Sauce Variables:
```
$ export SAUCE_USERNAME=sauce_username
$ export SAUCE_ACCESS_KEY=sauce_access_key
```
## Set Build ID (optional):
```
$ export BUILD_TAG=sauce_automated_build_name
```
## Install Node Modules:
```
$ npm install
```
## Run the tests:
```
$ npm test
```

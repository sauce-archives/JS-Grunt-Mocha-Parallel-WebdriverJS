var test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver'),
    SauceLabs = require("saucelabs"),
    username = process.env.SAUCE_USERNAME,
    accessKey = process.env.SAUCE_ACCESS_KEY,
    saucelabs = new SauceLabs({
        username: username,
        password: accessKey
    });

function beforeEachExample() {
    var browser = process.env.BROWSER,
        version = process.env.VERSION,
        platform = process.env.PLATFORM,
        server = "http://" + username + ":" + accessKey +
        "@ondemand.saucelabs.com:80/wd/hub";

    driver = new webdriver.Builder().
    withCapabilities({
        'browserName': browser,
        'platform': platform,
        'version': version,
        'username': username,
        'accessKey': accessKey,
        'name': this.currentTest.title
    }).
    usingServer(server).
    build();

    driver.getSession().then(function(sessionid) {
        driver.sessionID = sessionid.id_;
    });
};

function afterEachExample(done) {
	var passed = (this.currentTest.state === 'passed') ? true : false;

    driver.quit();
    
    saucelabs.updateJob(driver.sessionID, {
      passed: passed
    }, done);
};

function makeSuite(desc, cb) {
    test.describe(desc, function() {
		var driver;
		
    	this.timeout(60000);

        test.beforeEach(beforeEachExample);
        cb();
        test.afterEach(afterEachExample);
    });
};

exports.makeSuite = makeSuite;

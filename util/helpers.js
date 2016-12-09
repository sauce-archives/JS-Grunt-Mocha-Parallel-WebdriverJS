var test = require('selenium-webdriver/testing'),
    webdriver = require('selenium-webdriver'),
    SauceLabs = require("saucelabs");

var username,
    accessKey,
    saucelabs,
    seRelayHost,
    seRelayPort,
    buildTag,
    sauceSeUri,
    tunnelId;

function setSauceEnv(){
    username = process.env.SAUCE_USERNAME;
    accessKey = process.env.SAUCE_ACCESS_KEY;
    buildTag = process.env.BUILD_TAG || process.env.SAUCE_BUILD_NAME;
    tunnelId = process.env.TUNNEL_IDENTIFIER;
    //making sure we have some username and access key
    if (username == undefined || accessKey == undefined){
        console.error("Sauce username and password is not defined!");
        process.exit(1);
    }

    saucelabs = new SauceLabs({
        username: username,
        password: accessKey
    });
}

function beforeEachExample() {
    var browser = process.env.BROWSER,
        version = process.env.VERSION,
        platform = process.env.PLATFORM,
        server = "http://" + username + ":" + accessKey +
        "@ondemand.saucelabs.com:80/wd/hub";

    var desiredCaps = {
        'browserName': browser,
        'platform': platform,
        'version': version,
        'username': username,
        'accessKey': accessKey,
        'name': this.currentTest.title
        };
    //check if buildTag is set if so add to desired caps.
    if (buildTag != undefined){
        desiredCaps['build'] = buildTag;
    }
    //check if there's a tunnel identifier set by CI (Plugin)
    if (tunnelId != undefined){
        desiredCaps['tunnel-identifier'] = tunnelId;
    }
    driver = new webdriver.Builder().
    withCapabilities(desiredCaps).
    usingServer(server).
    build();

    driver.getSession().then(function(sessionid) {
        driver.sessionID = sessionid.id_;
    });
};

function afterEachExample(done) {
	var passed = (this.currentTest.state === 'passed') ? true : false;

    saucelabs.updateJob(driver.sessionID, {
      passed: passed
    }, done);
    console.log("SauceOnDemandSessionID=" + driver.sessionID +" job-name=" + this.currentTest.title);
    driver.quit();
};

function makeSuite(desc, cb) {
    test.describe(desc, function() {
    	this.timeout(60000);
        setSauceEnv();
        test.beforeEach(beforeEachExample);
        cb();
        test.afterEach(afterEachExample);
    });
};

exports.makeSuite = makeSuite;

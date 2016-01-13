var assert = require('assert'),
    webdriver = require('selenium-webdriver'),
    makeSuite = require('../util/helpers').makeSuite;

makeSuite('Go to NFL.com', function() {

  it('should go to NFL.com', function() {
    driver.get('http://www.nfl.com/');
    
    driver.getTitle().then(function(title) {
      assert.equal(title,'NFL.com - Official Site of the National Football League');
    });
  });
  
});

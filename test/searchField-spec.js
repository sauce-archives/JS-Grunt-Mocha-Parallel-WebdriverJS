var assert = require('assert'),
    webdriver = require('selenium-webdriver'),
    makeSuite = require('./helpers').makeSuite;

makeSuite('Enter a value in the search field', function() {

  it('should enter a value in the search field', function() {
    driver.get('http://www.nfl.com/');

    var searchBox = driver.findElement(webdriver.By.name('query'))
    searchBox.sendKeys('Larry Fitzgerald');
    searchBox.getAttribute('value').then(function(value) {
      assert.equal(value, 'Larry Fitzgerald');
    });
  });

});

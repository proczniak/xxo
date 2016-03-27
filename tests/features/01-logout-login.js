module.exports = function () {
  'use strict';


  this.Given(/^I am on the site$/, function () {
    browser.url('http://localhost:3000/');
    if (client.isExisting('a[id="login-name-link"]')) {
      browser.click('a[id="login-name-link"]');
      browser.waitForExist('div[id="login-buttons-logout"]');
      browser.click('div[id="login-buttons-logout"]');
    }
  });

  this.When(/^I click a login\-link\-text$/, function () {
    browser.click('a[id=login-sign-in-link]');
  });

  this.When(/^I want to wait for input$/, function () {
    browser.waitForExist('input[id="login-username"]', 2000);
  });

  this.When(/^I enter "([^"]*)" in the login\-username field and "([^"]*)" in the login\-password field$/, function (arg1, arg2) {
    browser.setValue('input[id="login-username"]', arg1);
    browser.setValue('input[id="login-password"]', arg2);
  });

  this.When(/^submit the form$/, function () {
    browser.click('div[id=login-buttons-password]');
  });

  this.Then(/^I should see a dashboard$/, function () {
    browser.waitForExist('a[id="login-name-link"]');
  });
};





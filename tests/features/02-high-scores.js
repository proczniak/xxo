module.exports = function () {
  'use strict';

  this.When(/^I click high scores$/, function () {
    browser.click('div[data-target="#scores"]');
  });

  this.Then(/^I should see my score$/, function () {
    browser.waitForVisible('li[id="#myscore"]');
  });

};
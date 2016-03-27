module.exports = function() {
  'use strict';

  this.When(/^I click destroy board button$/, function () {
    // Write the automation code here
    var boardid=browser.getValue('strong[id="boardid"]')
    console.log("Board Id before button is clicked: " + boardid);
    client.click('input[value="Destroy the board"]');
  });

  this.Then(/^I should see my board id changed$/, function () {
    // Write the automation code here
    client.waitUntil(function(boardid) {
      var boardid2=browser.getValue('strong[id="boardid"]')
      console.log("Board Id after button was clicked: " + boardid2);
      if (boardid != boardid2) {
        return true
      }
      else return false
    });
  });

};

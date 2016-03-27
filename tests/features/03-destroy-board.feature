Feature: Destroy board

  As a visitor to the site,
  I want to click a button
  And see the board id change

  Background
    Given I am on the site
    And I am logged in

  @watch
  Scenario: Logged in visitor clicks a button and sees board id change
    When I click destroy board button
    Then I should see my board id changed
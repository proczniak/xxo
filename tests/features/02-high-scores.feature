Feature: High Scores

  As a visitor to the site,
  so that I can see high scores table
  I want to click a button
  And see the high scores table

  Background
    Given I am on the site
    And I am logged in

    @watch
    Scenario: Logged in visitor clicks a button and sees high scores table
      When I click high scores
      Then I should see my score
Feature: Log in

  As a visitor to the site,
  so that I can log in to the site,
  I want to click a button
  And I want to enter my username and my password
  And And submit a login form.

  Background:
	Given I am on the site

  @watch
  Scenario: Visitor logs in
    When I click a login-link-text
    And I want to wait for input
	And I enter "wiesiek" in the login-username field and "dupa.8" in the login-password field
	And submit the form
	Then I should see a dashboard

# /tests/features/create-widget.feature

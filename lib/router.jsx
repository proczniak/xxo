// console.log("User.jsx: Użytkownik: " + Meteor.user()._id);

FlowRouter.route('/', {
  name: 'Board',
  action() {
    Meteor.subscribe('boards');
    ReactLayout.render(App, {
      content: <Board name="Board" />,
      dashboard: <Dashboard />
    });
  }
});

FlowRouter.route('/Board', {
  name: 'Board',
  action() {
    Meteor.subscribe('boards');
    ReactLayout.render(App, {
      content: <Board name="Board" />,
      dashboard: <Dashboard />
    });
  }
});


FlowRouter.route('/login', {
  name: 'Login',
  action() {
    ReactLayout.render(App, {
      content: <Login name="Login" />

    });
  }
});

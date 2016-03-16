// console.log("User.jsx: Użytkownik: " + Meteor.user()._id);

FlowRouter.route('/', {
  name: 'Table',
  action() {
    Meteor.subscribe('tables');
    ReactLayout.render(App, {
      content: <Table name="Table" />,
      dashboard: <Dashboard />
    });
  }
});

FlowRouter.route('/Table', {
  name: 'Table',
  action() {
    Meteor.subscribe('tables');
    ReactLayout.render(App, {
      content: <Table name="Table" />,
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

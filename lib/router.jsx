// console.log("User.jsx: Użytkownik: " + Meteor.user()._id);

FlowRouter.route('/', {
  name: 'Board',
  subscriptions: function() {
    this.register( 'boards', Meteor.subscribe( 'boards' ) );
  },
  action() {
    ReactLayout.render(App, {
      content: <Board name="Board" />,
      dashboard: <Dashboard />
    });
  }
});

FlowRouter.route('/Board', {
  name: 'Board',
  subscriptions: function() {
    this.register( 'boards', Meteor.subscribe( 'boards' ) );
  },
  action() {
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

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

// FlowRouter.route('/', {
//   name: 'Dashboard',
//   action() {
//     ReactLayout.render(App, {
//       content: <Dashboard name="Dashboard" />,
//       nav: <Nav />
//     });
//   }
// });

FlowRouter.route('/login', {
  name: 'Login',
  action() {
    ReactLayout.render(App, {
      content: <Login name="Login" />

    });
  }
});

FlowRouter.route('/register', {
  name: 'Register',
  action(){
    ReactLayout.render(App, {
      content: <Register name="Register" />
    });
  }
});
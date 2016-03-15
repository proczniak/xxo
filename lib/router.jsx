FlowRouter.route('/', {
  name: 'Table',
  action() {
    Meteor.subscribe('tables');
    ReactLayout.render(App, {
      table: <Table />,
      dashboard: <Dashboard />
    });
  }
});

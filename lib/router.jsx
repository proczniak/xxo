FlowRouter.route('/', {
  name: 'Table',
  action() {
    ReactLayout.render(App, {
      table: <Table />,
      dashboard: <Dashboard />
    });
  }
});

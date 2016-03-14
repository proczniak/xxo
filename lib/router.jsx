FlowRouter.route('/', {
  name: 'Table',
  action() {
    ReactLayout.render(App, {
      content: <Table />,
      dashboard: <Dashboard />
    });
  }
});

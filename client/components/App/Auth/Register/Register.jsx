Register = React.createClass({
  register(e) {
    e.preventDefault();
//    var email = $('#email').val();
    var password = $('#password').val();
    Accounts.createUser({
      username: username,
      password: password
    }, function (error) {
      if (error) {
        sAlert.error(error.reason, {effect: 'genie', position: 'top'});
      } else {
        FlowRouter.go('/');
      }
    });
  },
  render(){
    return(
      <div className="col-xs-12 col-sm-6">
        <h1>Register</h1>
        <form id="register-form" onSubmit={this.register} action="#">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" className="form-control" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" id="password" name="password" className="form-control" />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Register</button>
          </div>
        </form>
      </div>
    )
  }
});
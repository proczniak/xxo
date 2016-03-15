Login = React.createClass ({
  login(e) {
    e.preventDefault();
   // var email = $('#email').val();
    var password = $('#password').val();
    Meteor.loginWithPassword(username, password, function(error){
      if (error) {
        sAlert.error(error.reason);
      } else FlowRouter.go('/');
    });
  },

  render() {
    return (
      <div className="col-xs-6">
        <h1>You must law geen to play</h1>
        <form onSubmit={this.login} id="login-form" action="#">
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" id="username" name="username" className="form-control"/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" name="password" className="form-control"/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    )
  }
});
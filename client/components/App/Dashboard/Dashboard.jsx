

Dashboard = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    //Meteor.subscribe('users', this.props.user);
    return {
      loggedIn: !!Meteor.user()
    }
  },

  render() {
    return (
      <div className="navbar">
        <div className="navbar-header">
          Dashboard
        </div>
        <div className="navbar-text">
          <User />
        </div>
      </div>
    )
  }
});
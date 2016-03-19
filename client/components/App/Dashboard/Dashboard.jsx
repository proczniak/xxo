

Dashboard = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){
    Meteor.call('assignMeToTheBoard');
    return {
      loggedIn: !!Meteor.user()
    }
  },

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Dashboard
        </div>
        <div className="panel-body">
          <User />
          <Scores />
        </div>
      </div>
    )
  }
});
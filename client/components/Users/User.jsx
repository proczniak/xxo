

//var assignedTable = assignedTable();

User = React.createClass({

  mixins: [ReactMeteorData],
  getMeteorData(){
    return {
      currentUser: Meteor.user()
    }
  },
  

  render(){
    return (
      <div>User: {this.data.currentUser._id}</div>
    )
  }
});
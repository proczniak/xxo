

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
      <div>
        Logged as:&nbsp;
        <AccountsUIWrapper />
      </div>
    )
  }

  // render(){
  //   return (
  //     <div>User: </div>
  //   )
  // }
});
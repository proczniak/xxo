App = React.createClass({

  mixins: [ReactMeteorData],
  getMeteorData(){ //assigns variables, objects (stuff) to this.props.data.property - (loggedIn)
    return {
      loggedIn: !!Meteor.user(),
      currentUser: Meteor.user()
    }
  },

  // getMeteorData(){
  //
  //   return {
  //
  //     currentUser: Meteor.user()
  //   }
  // },

  allowedLayout(){
    var allowedLayouts = ['Login'];
    var layoutAllowed = false;
    if ($.inArray(this.props.content.props.name, allowedLayouts) > -1 || this.data.loggedIn) {
      layoutAllowed = true;
    }
    // layoutAllowed = true;
    return layoutAllowed;
  },

  componentWillMount(){
    //console.log("ComponentWillMount: " + Meteor.user()._id);
  },

  componentDidMount(){
    //console.log("ComponentDidMount: " + Meteor.user()._id);
  },

  showLayout(){

    return (
      <div className="row">
        <div className="col-xs-3">
          {this.props.dashboard}
        </div>
        <div className="col-xs-9">
          {this.props.content}
        </div>
      </div>
    )
  },

  showLogin() {
    return (
      <div className="row">
        <div className="col-xs-12 text-center">
          <p>You must be logged in to do that.</p>
        </div>
        <div className="row">
          <div className="col-xs-12 col-xs-offset-3">
            <Login />
          </div>
        </div>
      </div>
    )
  },

  /*
   render()
   {
   return (
   <div className="container">
   <div className="row">
   <div className="col-xs-3">
   {this.props.dashboard}
   </div>
   <div className="col-xs-9">
   {this.props.table}
   </div>
   </div>
   </div>
   )
   }
   */

  render()
  {
    return (
      <div className="container-fluid main-container">
        <div className="row">
          {this.allowedLayout() ? this.showLayout() : this.showLogin()}
        </div>
      </div>
    )
  }


});


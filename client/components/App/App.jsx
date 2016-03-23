App = React.createClass({

    /**
     * Whole file snatched from ninjatracker. It's supposed to take care of making sure subs are ready.
     */
  mixins: [ReactMeteorData],
  getMeteorData(){
    return {
      loggedIn: !!Meteor.user()
    }
  },

  allowedLayout(){
    var allowedLayouts = ['Login'];
    var layoutAllowed = false;
    if ($.inArray(this.props.content.props.name, allowedLayouts) > -1 || this.data.loggedIn) {
      layoutAllowed = true;
    }
    return layoutAllowed;
  },

  showLayout(){
    return (
      <div>
        <div className="col-lg-3">
          {this.props.dashboard}
        </div>
        <div className="col-lg-9">
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
          <div className="col-xs-12">
            <Login />
          </div>
        </div>
      </div>
    )
  },
  
  render()
  {
    return (
      <div className="container container-fluid">
        <div className="page-header">
          <h1>xxo <small>noughts & crosses</small></h1>
        </div>
        <div className="row">
          {this.allowedLayout() ? this.showLayout() : this.showLogin()}
        </div>
      </div>
    )
  }
});
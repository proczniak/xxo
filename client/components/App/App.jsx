App = React.createClass({
  
  render() {
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
});
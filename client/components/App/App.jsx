App = React.createClass({
  render() {
    return (
      <div className="main-container">
        <div className="col-xs-4">
          {this.props.dashboard}
        </div>
        <div className="col-xs-9">
          {this.props.table}
        </div>
      </div>
    )
  }
});
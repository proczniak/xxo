BoardField = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){

    Meteor.subscribe('boards');

    myObj = Boards.find({}, {fields: {[this.props.fieldId]: 1}}).fetch();
    fields = Object.keys(myObj).map(function(k) { return myObj[k] });
    field = fields[0];
    var fields2 = Object.keys(field).map(function(k) { return field[k] });

    if (!!fields2[1]) var field2 = fields2[0]
    else var field2 = "brak"


    return {
    //fieldContent: Boards.find({}, {fields: {"A1": 1}}).fetch()
    //  fieldContent: Boards.findOne().A1
      fieldContent: field2
    }
  },

  getInitialState: function () {
    return {
      checked: false,
      player: "dupa"
    };

  },

  handleClick: function (event) {
    //this.setState({checked: !this.state.checked});
    Meteor.call('playerMove', this.props.fieldId);
    // this.setState({
    //   player: Boards.findOne().A1
    // });

  },

  render()
  {
   var text = this.data.fieldContent;
    //var text = this.props.fieldId;
    return (
      <div onClick={this.handleClick}>

        {text}

      </div>
    )
  }
});

//<div className="xo glyphicon glyphicon-remove">
BoardField = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){


    //console.log("BoardField. getMeteorData invoked. this.props.fieldId: " + this.props.fieldId);
    var myObj = Boards.find(
      {},
      {
        fields: {[this.props.fieldId]: 1}
      }
    ).fetch()

    var fields = Object.keys(myObj).map(function (k) {
      return myObj[k]
    })
    var field = fields[0];

    //console.log("Obiekt myObj: " + myObj + ", Obiekt field: " + field);
    if (!!field) {
      var fields2 = Object.keys(field).map(function (k) {
        return field[k]
      });
      //console.log("if (!!field). field - " + field +", fields2[0]: " + fields2[0] + ", fields2[1]: " +fields2[1] )
    }

    if (!!fields2[1]) {

      //console.log("if (!!fields2[1]). fields2[0]: " + fields2[0] + ", fields2[1]: " +fields2[1]);
      var field2 = fields2[0];

    }
    else var field2 = "empty"

    //console.log("BoardField. getMeteorData. zaraz przed return. field2: " + field2 + ", fieldId: " + this.props.fieldId);

    return {
      fieldContent: field2
    }


  },

  handleClick: function (event) {
    Meteor.call('playerMove', this.props.fieldId);
  },

  render()
  {

    if (this.data.fieldContent === Meteor.user().username) var fieldClass = "cross"
    else if (this.data.fieldContent === "empty") var fieldClass = "empty"
    else var fieldClass = "nought"


    return (
      <div onClick={this.handleClick} className={fieldClass}>


      </div>
    )
  }
});

//<div className="xo glyphicon glyphicon-remove">
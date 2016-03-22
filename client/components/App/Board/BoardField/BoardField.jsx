BoardField = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){

    var fieldIdObj = Boards.find(
      {},
      {fields: {[this.props.fieldId]: 1}}
    ).fetch()

    /** Ugly blob from stackoverflow needed to extract field ID from object property name */
    var fields = Object.keys(fieldIdObj).map(function (k) {
      return fieldIdObj[k]
    })
    /** ************************************************************************************/

    var field = fields[0];
    if (!!field) {
      var fields2 = Object.keys(field).map(function (k) {
        return field[k]
      });

      if (!!fields2[1]) {
        bD = Boards.findOne();
        var field2 = fields2[0];

        if (bD.player1 == Meteor.userId()) {
          if (field2 == Meteor.user().username) {
            if (bD.cross == true) var xO = "cross"
            else xO = "nought"
          }
          else if (field2 != Meteor.user().username) {
            if (bD.cross == true) xO = "nought"
            else xO = "cross"
          }
        } else {
          if (field2 == Meteor.user().username) {
            if (bD.cross == true) var xO = "nought"
            else xO = "cross"
          }
          else if (field2 != Meteor.user().username) {
            if (bD.cross == true) xO = "cross"
            else xO = "nought"
          }
        }
      }
      else var xO = "empty";
    }

    if (field2 == Meteor.userId()) var myXo = xO;

    return {
      fieldContent: field2,
      xO: xO,
      myXo: myXo
    }
  },

  handleClick: function (event) {
    Meteor.call('playerMove', this.props.fieldId, function (error, result) {
      if (error) {
      }
      if (result) {
      }
    });
  },

  render()
  {
    return (
      <div onClick={this.handleClick} className={this.data.xO}>
      </div>
    )
  }
});
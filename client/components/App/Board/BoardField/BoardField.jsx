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

  // componentWillMount: function () {
  //   console.log("cWillMnt, fieldId: " + this.props.fieldId + ", mUsrNm: " + Meteor.user().username + ", tDfielCnt: " +
  //     this.data.fieldContent)// + ", this.state.value: " + this.state.value );
  // },

  // getInitialState: function () {
  //
  //   var fieldIdObj = Boards.find(
  //     {},
  //     {fields: {[this.props.fieldId]: 1}}
  //   ).fetch()
  //
  //   /** Ugly blob from stackoverflow needed to extract field ID from object property name */
  //   var fields = Object.keys(fieldIdObj).map(function (k) {
  //     return fieldIdObj[k]
  //   })
  //   var field = fields[0];
  //   if (!!field) {
  //     var fields2 = Object.keys(field).map(function (k) {
  //       return field[k]
  //     });
  //     if (!!fields2[1]) {
  //       var fieldContent = fields2[0];
  //
  //     }
  //     else var fieldContent = "empty"
  //   }
  //   else fieldContent = "empty"
  //
  //   return (
  //     {value: fieldContent}
  //   )
  //
  // },

  handleClick: function (event) {
    // this.setState({
    //   value: Meteor.user().username
    // });
    Meteor.call('playerMove', this.props.fieldId, function (error, result) {
      if (error) {
      }
      if (result) {
      }
    });
  },

  // shouldComponentUpdate: function () {
  //
  //
  //   return false;
  //
  //   // if (this.state.xfieldShouldUpdate === true) return true
  //   // else return false
  //   /**
  //    * This weird thing is never supposed to be true, as I have never set it to true...
  //    * somehow though...
  //    * NO IDEA WHY IT WORKS!!!???
  //    * Need it though to filter move alerts (so opponent sees our move notify, and vice versa).
  //    *
  //    * Well, out of nowhere (of course, not. I changed logic behind drawing noughts and crosses)
  //    * it stopped to work like supposed.
  //    */
  // },
  //
  // componentWillUpdate: function () {
  //
  //   //oldValue = Boards.findOne
  //   console.log("cWillUpd, fieldId: " + this.props.fieldId + ", mUsrNm: " + Meteor.user().username + ", tDfielCnt: " +
  //     this.data.fieldContent + ", this.state.value: " + this.state.value);
  //
  // },
  // componentDidUpdate: function () {
  //   console.log("cDid_Upd, fieldId: " + this.props.fieldId + ", mUsrNm: " + Meteor.user().username +", tDfielCnt: " +
  //     this.data.fieldContent + ", this.state.value: " + this.state.value );
  //
  //
  //   if (this.data.fieldContent) {
  //     if (Meteor.user().username != this.data.fieldContent) {
  //       sAlert.info("Player " + this.data.fieldContent + " made his move", {effect: 'genie'});
  //     }
  //   }
  // },

  render()
  {

    // if (this.data.fieldContent === Meteor.user().username) var fieldClass = "cross"
    // else if (!this.data.fieldContent) var fieldClass = "empty"
    // else var fieldClass = "nought"


    return (
      <div onClick={this.handleClick} className={this.data.xO}>
        {this.props.fieldId}
        <br />
        {this.data.fieldContent}
      </div>
    )
  }
});
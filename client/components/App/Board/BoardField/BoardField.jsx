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

      return {
        fieldContent: field2
      }

  },
  getInitialState: function() {
    return {xfieldShouldUpdate: false};
  },

  handleClick: function (event) {
    Meteor.call('playerMove', this.props.fieldId, function(error, result){
      if (error){}
      if(result) {}
    });
  },

  shouldComponentUpdate: function(){
    if (this.state.xfieldShouldUpdate === true) return true
    else return false
    /**
     * This weird thing is never supposed to be true, as I have never set it to true...
     * somehow though...
     * NO IDEA WHY IT WORKS!!!???
     */
  },

  componentDidUpdate: function(){
    //console.log(Meteor.user().username +" "+ this.data.fieldContent);
    if (this.data.fieldContent) {
      if (Meteor.user().username != this.data.fieldContent) {
        sAlert.info("Gracz " + this.data.fieldContent + " wykonał ruch", {effect: 'genie'});
      }
    }
  },

  render()
  {

    if (this.data.fieldContent === Meteor.user().username) var fieldClass = "cross"
    else if (!this.data.fieldContent) var fieldClass = "empty"
    else var fieldClass = "nought"


    return (
      <div onClick={this.handleClick} className={fieldClass}>


      </div>
    )
  }
});
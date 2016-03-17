//Meteor.subscribe('boards');
Board = React.createClass({

  mixins: [ReactMeteorData],
  getMeteorData(){
    Meteor.subscribe('boards');
    // var boardIdTmp = Boards.findOne({
    //   $or: [
    //     {player1: this.userId},
    //     {player2: this.userId}
    //   ]
    // });

    var boardIdTmp = Boards.findOne();

    if (!!boardIdTmp) {
      return {
        boardId: boardIdTmp._id
      }
    }
    else {
      return{
        boardId: "none"
      }
    }
  },



  componentWillMount(){
    console.log("componentWillMount, użytkownik: " + Meteor.user().username + " o _id: " + Meteor.userId());
    Meteor.call('assignMeToTheBoard');

  },

  render() {
    return (
      <div className="row">
        <h2>boardId: {this.data.boardId}</h2>
        <h3>userId: {Meteor.userId()}</h3>
        <h4>Board: {Meteor.user().username}, competitor2</h4>
        <table className="tab-content">
          <tbody>
          <tr>
            <td id="A1">A1</td>
            <td id="A2">A2</td>
            <td id="A3">A3</td>
          </tr>
          <tr>
            <td id="B1">B1</td>
            <td id="B2">B2</td>
            <td id="B3">B3</td>
          </tr>
          <tr>
            <td id="C1">C1</td>
            <td id="C2">C2</td>
            <td id="C3">C3</td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
});

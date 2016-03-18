Board = React.createClass({

  mixins: [ReactMeteorData],
  getMeteorData(){
    Meteor.subscribe('boards');
    // var boardData = Boards.findOne({
    //   $or: [
    //     {player1: this.userId},
    //     {player2: this.userId}
    //   ]
    // });

    var boardData = Boards.findOne();

    if (!!boardData) {
      return {
        boardId: boardData._id,
        opponent: this.getOpponentName(boardData)
      }
    }
    else {
      return {
        boardId: "none"
      }
    }
  },

  // makeMove: function (field) {
  //   console.log("Użytkownik: " + Meteor.user().username + " kliknął w pole: " + this.field);
  //   Meteor.call('playerMove', this.field);
  // },
  
  getOpponentName: function (boardData) {
    console.log('getOpponenName invoked, this.userId: ' + Meteor.userId());
    if (boardData.player1 === Meteor.userId()) return boardData.p2Name
    else return boardData.p1Name
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
        <h4>Players: {Meteor.user().username}, {this.data.opponent}</h4>
        <h3>Grasz z użytkownikiem: {this.data.opponent}</h3>
        <table className="tab-content">
          <tbody>
          <tr>
            <td id="A1">
              <BoardField fieldId="A1" />
            </td>
            <td id="A2">
              <BoardField fieldId="A2" />
            </td>
            <td id="A3">
              <BoardField fieldId="A3" />
            </td>
          </tr>
          <tr>
            <td id="B1">
              <BoardField fieldId="B1" />
            </td>
            <td id="B2">
              <BoardField fieldId="B2" />
            </td>
            <td id="B3">
              <BoardField fieldId="B3" />
            </td>
          </tr>
          <tr>
            <td id="C1">
              <BoardField fieldId="C1" />
            </td>
            <td id="C2">
              <BoardField fieldId="C2" />
            </td>
            <td id="C3">
              <BoardField fieldId="C3" />
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    )
  }
});

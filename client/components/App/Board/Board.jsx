Board = React.createClass({

  mixins: [ReactMeteorData],
  getMeteorData(){

    var bD = Boards.findOne(); /** bD stands for boardData */

    if (!!bD) {
      return {
        boardId: bD._id,
        opponent: this.getOpponentName(bD),
        moveToken: bD.moveToken
      }
    }
    else {
      return {
        boardId: "none",
        opponent: "none yet"
      }
    }
  },

  getOpponentName: function (boardData) {
    if (boardData.player1 === Meteor.userId()) return boardData.p2Name
    else return boardData.p1Name
  },

  handleClearBoardClick: function (event) {
    Meteor.call('clearBoard');
  },

  render() {

    if (this.data.moveToken === Meteor.userId()) var moveTokenMsg = "Twój ruch"
    else var moveTokenMsg = "Ruch przeciwnika"

    if (this.data.boardId != "none") {
      /** Ugly hack but without it component renders
       * without necessary data and fails at mapping parameters needed to retrieve the content of
       * game fields.
       * Spent way too much time to isolate the problem and have no time to solve
       * it pretty way.
       */

      return (
        <div className="row">
          <h2>boardId: {this.data.boardId}</h2>
          <h3>userId: {Meteor.userId()}</h3>
          <h4>Players: {Meteor.user().username}, {this.data.opponent}</h4>
          <h3>Grasz z użytkownikiem: {this.data.opponent}</h3>
          <h3>{moveTokenMsg}</h3>
          <input type="button" className="btn-wipe-board" onClick={this.handleClearBoardClick} value="Wipe the board"></input>
          <br />
          <br />
          <table className="tab-content">
            <tbody>
            <tr>
              <td id="A1">
                <BoardField fieldId="A1"/>
              </td>
              <td id="A2">
                <BoardField fieldId="A2"/>
              </td>
              <td id="A3">
                <BoardField fieldId="A3"/>
              </td>
            </tr>
            <tr>
              <td id="B1">
                <BoardField fieldId="B1"/>
              </td>
              <td id="B2">
                <BoardField fieldId="B2"/>
              </td>
              <td id="B3">
                <BoardField fieldId="B3"/>
              </td>
            </tr>
            <tr>
              <td id="C1">
                <BoardField fieldId="C1"/>
              </td>
              <td id="C2">
                <BoardField fieldId="C2"/>
              </td>
              <td id="C3">
                <BoardField fieldId="C3"/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      )
    }

    else {
      console.log('Board.jsx, Brak this.data.boardId');
      return (<div>Just a minute...</div>)
    }
  }
});

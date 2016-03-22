Board = React.createClass({

  mixins: [ReactMeteorData],
  getMeteorData(){


    var bD = Boards.findOne();
    /** bD stands for boardData */

    if (!!bD) {
      return {
        boardId: bD._id,
        opponent: this.getOpponentName(bD),
        moveToken: bD.moveToken

      }
    }
    else {
      Meteor.call('assignMeToTheBoard');
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

  handleDestroyBoardClick: function (event) {
    // if (window.confirm('Are you sure? You WILL break the matrix!'))
    Meteor.call('destroyBoard');
    //FlowRouter.go('Lobby');
  },

  render() {

    if (this.data.boardId != "none") {
      /** Ugly hack but without it component renders
       * without necessary data and fails at mapping parameters needed to retrieve the content of
       * game fields.
       * Results of this problem tend to vary as the application develops. :D
       * Luckily, this condition solves the problem providing humorous feedback to the user as a bonus.
       */
    }

    else {
      return (<div>Someone must have picked the matrix. Please refresh to get back onboard.</div>)
    }
    return (
      <div className="row">

        <div className="panel panel-default">
          <div className="panel-heading">
            boardId: <strong>{this.data.boardId}</strong>,
            userId: <strong>{Meteor.userId()}</strong>
          </div>
          <div className="panel-body center-block">

            <h4><MoveTokenMsg /></h4>
            <h4><GameResult /></h4>
            <div className="center-block">
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
            <input type="button" className="btn-wipe-board center-block" onClick={this.handleClearBoardClick}
                   value="Wipe the board"></input>
            <input type="button" className="btn-wipe-board center-block" onClick={this.handleDestroyBoardClick}
                   value="Do not click this button."></input>
          </div>
        </div>
      </div>
    )
  }
});
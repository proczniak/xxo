Board = React.createClass({

  mixins: [ReactMeteorData],
  getMeteorData(){


    var bD = Boards.findOne();
    /** bD stands for boardData */


    if (!!bD) {
      if (!!bD.cross == true) {
        if (bD.player1 == Meteor.userId()) var myXo = "cross"
        else var myXo = "nought"
      } else {
        if (bD.player1 == Meteor.userId()) var myXo = "nought"
        else var myXo = "cross"
      }


      return {
        boardId: bD._id,
        opponent: this.getOpponentName(bD),
        moveToken: bD.moveToken,
        myXo: myXo

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

  componentDidUpdate: function() {
  console.log('Board Did Update');
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
      <div>

        <div className="panel panel-default panel-primary">
          <div className="panel-heading">
            boardId: <strong id="boardid" value={this.data.boardId}>{this.data.boardId}</strong>,
            userId: <strong>{Meteor.userId()}</strong>
          </div>
          <div className="panel-body text-center">
            <div className="text-center">
              <div className="panel-info"><GameResult /></div>
              <div className="row text-center">
                <div className="col-sm-5 text-center">
                  <table className="center-table">
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
                <div className="col-sm-2"></div>
                <div className="col-sm-5 centered">
                  <input type="button" className="btn btn-primary btn-info btn-block"
                         onClick={this.handleClearBoardClick}
                         value="Wipe the board"></input>
                  <input type="button" className="btn btn-primary btn-warning btn-block"
                         onClick={this.handleDestroyBoardClick}
                         value="Destroy the board"></input>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
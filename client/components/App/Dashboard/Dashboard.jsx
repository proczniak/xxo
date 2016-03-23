Dashboard = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){

    // Meteor.call('assignMeToTheBoard');
    var bD = Boards.findOne();
    /** bD stands for boardData */

    if (!!bD) {
      return {
        loggedIn: !!Meteor.user(),
        boardId: bD._id,
        opponentName: this.getOpponentData(bD).username,
        opponentId: this.getOpponentData(bD).id
      }
    }
    else {
      return {
        loggedIn: !!Meteor.user(),
        boardId: "none",
        opponent: "none yet"
      }
    }
  },

  getOpponentData: function (boardData) {
    if (boardData.player1 === Meteor.userId())
      opponent = {
        username: boardData.p2Name,
        id: boardData.player2
      }

    else opponent = {
      username: boardData.p1Name,
      id: boardData.player1
    }
    return opponent
  },

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-heading">
          Dashboard
        </div>
        <div className="panel-body">
          <User />
          <Score />
          <Opponent opponentName={this.data.opponentName} opponentId={this.data.opponentId}/>
        </div>
      </div>
    )
  }
});
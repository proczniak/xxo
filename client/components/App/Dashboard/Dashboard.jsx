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
        opponent: this.getOpponentName(bD)
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

  getOpponentName: function (boardData) {
    if (boardData.player1 === Meteor.userId()) return boardData.p2Name
    else return boardData.p1Name
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
        </div>
        <div className="panel-body">
          rozgrywka z: {this.data.opponent}
        </div>
      </div>
    )
  }
});
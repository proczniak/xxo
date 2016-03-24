Dashboard = React.createClass({
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
    }
    if (!!bD) {
      return {
        myXo: myXo,
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
      <div className="panel panel-default panel-primary">
        <div className="panel-heading">
          Dashboard
        </div>
        <div className="panel-body text-center">
          <User />
          <Scores />
          <Opponent opponentName={this.data.opponentName} opponentId={this.data.opponentId}/>

          <div className="panel panel-info">
          <div className="panel-heading">Your pawn:</div>
          <div className="panel-body">
            <img src={"images/xxo." + this.data.myXo + ".png"}></img>
          </div>
        </div>

      </div>
  </div>
  )
  }
});
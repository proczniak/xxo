GameResult = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){

    bD = Boards.findOne();
    if (bD.player1 == Meteor.userId()) var opponent = bD.player2
    else var opponent = bD.player1

    return {
      gameResult: bD.gameResult,
      opponent: opponent

    }
  },
  componentDidUpdate: function() {
    if (this.data.gameResult === Meteor.userId()) sAlert.success("You WIN!", {effect: 'genie'});
    else if (this.data.gameResult === this.data.opponent) sAlert.error("You lose.", {effect: 'genie'});
  },

  render() {
    if (this.data.gameResult === Meteor.userId()) resultMsg = "won"
    else if (!this.data.gameResult) {resultMsg = "pending"}
    else resultMsg = "lost"
    return (
      <div>Game status: {resultMsg}</div>
    );
  }
});

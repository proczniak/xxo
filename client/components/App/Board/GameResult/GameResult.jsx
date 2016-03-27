GameResult = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){

    bD = Boards.findOne();
    if (bD.player1 == Meteor.userId()) var opponent = bD.player2
    else var opponent = bD.player1

    return {
      moveToken: bD.moveToken,
      gameResult: bD.gameResult,
      opponent: opponent

    }
  },

  componentDidUpdate: function () {
    console.log('GameResult Did Update');
    if (this.data.gameResult === Meteor.userId()) sAlert.success("You WIN!", {effect: 'genie'});
    else if (this.data.gameResult === this.data.opponent) sAlert.error("You lose.", {effect: 'genie'});
    else if (this.data.gameResult === "draw") sAlert.success("The was a draw.", {effect: 'genie'});
    else if ((!this.data.gameResult & this.data.moveToken == Meteor.userId()) & (
        !!bD.A1 | !!bD.A2 | !!bD.A3 | !!bD.B1 | !!bD.B2 | !!bD.B3 | !!bD.C1 | !!bD.C2 | !!bD.C3
      ))
      sAlert.info("Opponent made his move.", {effect: 'genie'});
  },

  render() {
    if (this.data.gameResult === Meteor.userId()) resultMsg = "won"
    else if (this.data.gameResult === "draw") resultMsg = "draw"
    else if (!this.data.gameResult & this.data.moveToken === Meteor.userId()) {
      resultMsg = "Your move."
    }
    else if (!this.data.gameResult & this.data.moveToken !== Meteor.userId()) {
      resultMsg = "Opponent's move."
    }


    else resultMsg = "lost"
    return (
      <div>Game status: {resultMsg}</div>
    );
  }
});

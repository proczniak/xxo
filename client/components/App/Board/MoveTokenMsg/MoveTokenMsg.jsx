MoveTokenMsg = React.createClass({
  mixins: [ReactMeteorData],
  getMeteorData(){

    bD = Boards.findOne();
    if (bD.player1 == Meteor.userId()) var opponent = bD.player2
    else var opponent = bD.player1

    return {
      moveToken: bD.moveToken,
      opponent: opponent

    }
  },
  componentDidUpdate: function() {
    if (this.data.moveToken == Meteor.userId() & (
        !!bD.A1 |!!bD.A2 |!!bD.A3 |!!bD.B1 |!!bD.B2 |!!bD.B3 |!!bD.C1 |!!bD.C2 |!!bD.C3
      ))
    sAlert.info("Opponent made his move.", {effect: 'genie'});
  },

  render() {
    if (this.data.moveToken === Meteor.userId()) moveTokenMsg = "Your move."
    else moveTokenMsg = "Opponent's move."
    return (
      <div>{moveTokenMsg}</div>
    );
  }
});

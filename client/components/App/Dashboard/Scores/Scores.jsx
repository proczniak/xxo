Scores = React.createClass({

  mixins: [ReactMeteorData],
  getMeteorData(){
    var playerScore = PlayerScores.findOne().score;
    return ({
      playerScore: playerScore
    })
  },

  render() {
    return (
      <div className="panel-group">
        <div className="panel-body">
          Score: {this.data.playerScore}
        </div>
      </div>
    )
  }
});
Opponent = React.createClass({

  mixins: [ReactMeteorData],
  getMeteorData(){
    if (PlayerScores.findOne({_id: this.props.opponentId}))
      var opponentscore = PlayerScores.findOne({_id: this.props.opponentId}).score;
    else opponentscore = 0;

    return ({
      opponentScore: opponentscore
    })
  },

  render() {
    return (
      <div className="panel-group">
        <div className="panel-body">
          <button className="btn btn-default btn-block" data-toggle="collapse" data-target="#opponent">
            Opponent: {this.props.opponentName}
          </button>
          <div id="opponent" className="collapse">
            Opponent's score: {this.data.opponentScore}
          </div>
        </div>
      </div>
    )
  }
});
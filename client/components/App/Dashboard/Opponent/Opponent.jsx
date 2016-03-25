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
      <div className="panel-body">
        <div className="row">
          <div className="panel panel-default">
            <div className="btn btn-block panel panel-heading" data-toggle="collapse" data-target="#opponent">
              Opponent: {this.props.opponentName}
            </div>
            <div id="opponent" className="panel panel-body collapse">
              <div className="panel panel-body">
                Opponent's score: {this.data.opponentScore}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
Score = React.createClass({

  mixins: [ReactMeteorData],
  getMeteorData(){
    if (PlayerScores.findOne({_id: Meteor.userId()}))
      var playerScore = PlayerScores.findOne({_id: Meteor.userId()}).score;
    else playerScore = 0;

    topTen = PlayerScores.find({}, {
      limit: 5,
      sort: {score: -1}
    }).fetch();

    return ({
      playerScore: playerScore,
      topTenPlayers: topTen
    })
  },

  getInitialState: function () {
    return {
      data: {
        topTenPlayers: []
      }
    };
  },

  render() {
    return (
      <div className="panel-group">
        <div className="panel-body">
          <button className="btn btn-default btn-block" data-toggle="collapse" data-target="#scores">
            Score: {this.data.playerScore}
          </button>
          <div className="row">
            <div id="scores" className="collapse">
              <div className="panel panel-default">
                <div className="panel panel-heading">High schores</div>
                <div className="panel panel-body">
                  <ol>
                    {
                      this.data.topTenPlayers.map(function (player) {
                        return <li key={player.username}>{player.username} {player.score}</li>
                      })
                    }
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
});
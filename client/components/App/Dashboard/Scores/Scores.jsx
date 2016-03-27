Scores = React.createClass({

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
        <div className="panel-body">
          <div className="row">
            <div className="panel panel-default">
              <div className="btn btn-block panel panel-heading" data-toggle="collapse" data-target="#scores">
                 High scores
              </div>
              <div id="scores" className="collapse">
                <div className="panel panel-body text-left text-uppercase">
                  <ol className="list-group">
                    <li className="list-group-item list-group-item-info" id="#myscore">
                      MyScore: <span className="badge">{this.data.playerScore}</span>
                      </li>
                    {
                      this.data.topTenPlayers.map(function (player) {
                        return <li className="list-group-item" key={player.username}>{player.username}
                          <span className="badge ">{player.score}</span></li>
                      })
                    }
                  </ol>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
  }
});